const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/admin");
const {
  getAllUsers,
  sendNotification,
  markNotificationRead,
  adminLogin,
  getAllMessages,
  replyToUserMessage
} = require("../controllers/adminController");

router.post("/login", adminLogin);

router.use(adminAuth); 
router.get("/users", adminAuth, getAllUsers);
router.post("/notify", adminAuth, sendNotification);
router.post("/notifications/read", adminAuth, markNotificationRead);
router.get("/messages", adminAuth, getAllMessages);
router.post("/messages/reply", adminAuth, replyToUserMessage);


module.exports = router;
