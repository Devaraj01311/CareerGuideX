const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true },  
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    senderRole: { type: String, enum: ["user", "admin"], required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
