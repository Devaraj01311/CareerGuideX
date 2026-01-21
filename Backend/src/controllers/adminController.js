const User = require("../models/user");
const Admin = require("../models/admin"); // your separate Admin model
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const { getIO } = require("../socket/socket");

// ------------------- Admin Login -------------------
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Admin login failed", error: err.message });
  }
};

// ------------------- Fetch all users -------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// ------------------- Send notification -------------------
exports.sendNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.notifications.push({ message });
    await user.save();

    const io = getIO();
    io.to(userId).emit("new-notification", { message, createdAt: new Date() });

    res.json({ message: "Notification sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send notification", error: err.message });
  }
};

// ------------------- Mark notification read -------------------
exports.markNotificationRead = async (req, res) => {
  try {
    const { userId, notificationId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const notification = user.notifications.id(notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    notification.read = true;
    await user.save();

    res.json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark notification", error: err.message });
  }
};

// ------------------- Get chat summary -------------------
exports.getAllMessages = async (req, res) => {
  try {
    const admin = await Admin.findOne(); // fetch your admin id
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const chats = await Message.aggregate([
      { $match: { $or: [{ senderId: admin._id }, { receiverId: admin._id }] } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", admin._id] },
              "$receiverId",
              "$senderId",
            ],
          },
          lastMessage: { $last: "$message" },
          unread: {
            $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] },
          },
          updatedAt: { $last: "$createdAt" },
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);

    // populate user info
    const result = await User.populate(chats, { path: "_id", select: "name email" });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

// ------------------- Reply to user -------------------
exports.replyToUserMessage = async (req, res) => {
  try {
    const { messageId, reply } = req.body;
    if (!reply) return res.status(400).json({ message: "Reply is required" });

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ message: "Message not found" });

    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    message.adminReply = reply;
    message.status = "replied";
    message.isRead = false; // mark unread for user
    await message.save();

    const io = getIO();
    io.to(message.senderId.toString() === admin._id.toString() ? message.receiverId.toString() : message.senderId.toString()).emit("receive-message", {
      senderId: admin._id.toString(),
      receiverId: message.senderId.toString() === admin._id.toString() ? message.receiverId.toString() : message.senderId.toString(),
      message: reply,
      messageId: message._id,
    });

    res.json({ message: "Reply sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reply failed", error: err.message });
  }
};
