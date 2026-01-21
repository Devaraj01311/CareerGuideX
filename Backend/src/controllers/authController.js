require("dotenv").config();
const cloudinary = require("../config/cloudinary");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const { getIO } = require("../socket/socket");
const nodemailer = require("nodemailer")



const generateCode = require("../utils/generateVerificationCode");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const { error } = require("console");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateCode();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationCode: code,
      verificationExpires: Date.now() + 10 * 60 * 1000 // 10 mins
    });

    await user.save();

try {
  await sendVerificationEmail(email, code);
} catch (err) {
  console.error("Verification email failed:", err.message);
}
    res.status(201).json({
      message: "Registered successfully. Verify your email."
    });

  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};


// =================== LOGIN ===================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before login" });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Send response
    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image || null,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// =================== LOGOUT ===================
exports.logout = async (req, res) => {
  // For JWT, logout is handled client-side by deleting the token
  res.json({ message: "Logout successful. Please remove token from client." });
};

// =================== GET PROFILE ===================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// =================== UPDATE PROFILE ===================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user; // from auth middleware
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, skills } = req.body;

    if (name) user.name = name;
    if (skills) user.skills = Array.isArray(skills) ? skills : skills.split(",");

  
   if (req.file) {
  if (user.profileImagePublicId) {
    await cloudinary.uploader.destroy(user.profileImagePublicId);
  }

  user.profileImage = req.file.path;      
  user.profileImagePublicId = req.file.filename; 
}


    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};

//verifyemail
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.json({ message: "Email already verified" });

    if (
      user.verificationCode !== code ||
      user.verificationExpires < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};

// =================== RESEND VERIFICATION OTP ===================
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ message: "Email already verified" });
    }

    // Generate new OTP
    const code = generateCode();

    user.verificationCode = code;
    user.verificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send email again
    await sendVerificationEmail(email, code);

    res.json({ message: "Verification code resent successfully" });

  } catch (err) {
    console.error("Resend OTP error:", err);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};



exports.oauthCallback = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};

exports.uploadResume = async (req, res) => {
  try {
    const userId = req.user.id || req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // delete old resume
    if (user.resumePublicId) {
      await cloudinary.uploader.destroy(user.resumePublicId, {
        resource_type: "raw",
      });
    }

    // ✅ TRUST STORAGE — NO FOLDER PREFIX HERE
    const publicId = req.file.public_id || req.file.filename;

    user.resume = req.file.path;
    user.resumePublicId = publicId;
    user.resumeOriginalName = req.file.originalname;

    await user.save();

    const resumeUrl = cloudinary.url(publicId, {
      resource_type: "raw",
      flags: "attachment:false",
    });

    res.json({
      message: "Resume uploaded successfully",
      resume: resumeUrl,
      originalName: user.resumeOriginalName,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};








exports.getResume = async (req, res) => {
  console.log("GET RESUME HIT", req.user);
  try {
    const userId = req.user.id || req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resumePublicId?.startsWith("v")) {
      user.resumePublicId = user.resumePublicId.replace(/^v\d+\//, "");
      await user.save();
    }

    // AUTO-FIX FOR OLD USERS
    if (!user.resumePublicId && user.resume) {
      const extractedPublicId = user.resume
        .split("/upload/")[1]
        ?.replace(/\.[^/.]+$/, "");

      if (extractedPublicId) {
        user.resumePublicId = extractedPublicId;
        await user.save();
        console.log("AUTO-FIXED resumePublicId:", extractedPublicId);
      }
    }

    if (!user.resumePublicId) {
      return res.json({ resume: null });
    }

    const resumeUrl = cloudinary.url(user.resumePublicId, {
      resource_type: "raw",
      secure: true,
      attachment: false, // inline preview
    });

    // ✅ USE resumeUrl HERE
    res.json({
      resume: resumeUrl,
      originalName: user.resumeOriginalName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resume" });
  }
};










// ================= DELETE RESUME =================
exports.deleteResume = async (req, res) => {
  try {
    const userId = req.user.id || req.user;
    const user = await User.findById(userId);

    console.log("UserId:", req.user);
    console.log("ResumePublicId:", user?.resumePublicId);

    if (!user || !user.resumePublicId) {
      return res.status(400).json({ message: "No resume found" });
    }

    await cloudinary.uploader.destroy(user.resumePublicId, {
      resource_type: "raw",
    });

    user.resume = null;
    user.resumePublicId = null;
    user.resumeOriginalName = null;

    await user.save();

    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};







exports.sendMessageToAdmin = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message is required" });

    const newMessage = await Message.create({
      user: req.user,  // user sending message
      userMessage: message,
    });

    // Send to admin room
    const io = getIO();
    const adminId = process.env.ADMIN_ID;
    io.to(adminId).emit("receive-message", {
      senderId: req.user,
      receiverId: adminId,
      message,
      messageId: newMessage._id,
    });

    res.status(201).json({ message: "Message sent to admin", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message" });
  }
};

// ================= GET MY MESSAGES =================
exports.getMyMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user })
      .sort({ createdAt: -1 });

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// ================= MARK ADMIN REPLY AS READ =================
exports.markMessageRead = async (req, res) => {
  try {
    const { messageId } = req.body;

    const message = await Message.findOne({
      _id: messageId,
      user: req.user,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.readByUser = true;
    await message.save();

    res.json({ message: "Message marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update message" });
  }
};


// GET basic user info for chat
exports.getBasicUser = async (req, res) => {
  try {
    let user;
    if (req.params.userId === "admin") {
      user = await User.findOne({ role: "admin" }).select("_id name email");
    } else {
      user = await User.findById(req.params.userId).select("_id name email");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    // ✅ Store HASHED token
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ✅ FIXED FIELD NAME
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CareerGuideX Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset.\n\nClick here:\n${resetUrl}\n\nThis link will expire in 10 minutes.`,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // ✅ HASH PASSWORD
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

    
 