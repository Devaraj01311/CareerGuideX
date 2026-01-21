const path = require("path");
const express = require('express');
const passport = require('passport');
const { uploadProfile, uploadResumes } = require("../middleware/cloudinarymiddleware");

const { register, login, updateProfile, getProfile, verifyEmail, resendOtp,oauthCallback, uploadResume, deleteResume, getResume,
  sendMessageToAdmin, getMyMessages, markMessageRead, getBasicUser, forgotPassword, resetPassword
 } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.put(
  "/profile",
  auth,
  uploadProfile.single("profileImage"),
  updateProfile
);

router.post(
  "/resume/upload",
  auth,
  uploadResumes.single("resume"),
  uploadResume
);


router.post("/verify-email", verifyEmail);
router.get('/profile', auth, getProfile);
router.post('/resend-otp', resendOtp);

router.get("/resume", auth, getResume);
router.delete("/resume/delete", auth, deleteResume);

router.post("/messages/send", auth, sendMessageToAdmin);
router.get("/messages/my", auth, getMyMessages);
router.post("/messages/read", auth, markMessageRead);


/* ================= GOOGLE OAUTH ================= */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  oauthCallback
);

/* ================= GITHUB OAUTH ================= */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  oauthCallback
);

router.get("/basic/:userId", getBasicUser);



module.exports = router;
