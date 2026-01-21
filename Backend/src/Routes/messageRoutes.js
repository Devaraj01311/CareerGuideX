const router = require("express").Router();
const Message = require("../models/Message");
const Admin = require("../models/admin");
const User = require("../models/user");

const getAdminId = async () => {
  const admin = await Admin.findOne({});
  if (!admin) throw new Error("Admin not found");
  return admin._id.toString();
};

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = await getAdminId();

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: adminId },
        { senderId: adminId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });
    await Message.updateMany(
      { senderId: adminId, receiverId: userId, isRead: false },
      { isRead: true }
    );

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

router.get("/admin/basic", async (req, res) => {
  try {
    const admin = await Admin.findOne({}).select("_id name email");
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    console.error("Failed to fetch admin:", err);
    res.status(500).json({ error: "Failed to fetch admin" });
  }
});

router.get("/unread/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = await getAdminId();

    const count = await Message.countDocuments({
      receiverId: userId,
      senderId: adminId,
      isRead: false,
    });

    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch unread count" });
  }
});

router.get("/admin/messages", async (req, res) => {
  try {
    const adminId = await getAdminId();

    const summary = await Message.aggregate([
      { $match: { $or: [{ senderId: adminId }, { receiverId: adminId }] } },
      {
        $group: {
          _id: { $cond: [{ $eq: ["$senderId", adminId] }, "$receiverId", "$senderId"] },
          lastMessage: { $last: "$message" },
          unread: { $sum: { $cond: [{ $eq: ["$isRead", false] }, 1, 0] } },
          updatedAt: { $last: "$createdAt" },
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    for (let i = 0; i < summary.length; i++) {
      const user = await User.findById(summary[i]._id).select("name email");
      summary[i].name = user ? user.name : "Unknown User";
      summary[i].email = user ? user.email : "";
    }

    res.json(summary);
  } catch (err) {
    console.error("Failed to fetch admin messages:", err);
    res.status(500).json({ error: "Failed to fetch admin messages" });
  }
});

module.exports = router;
