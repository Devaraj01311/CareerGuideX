const { Server } = require("socket.io");
const Message = require("../models/Message");
const User = require("../models/user");

let io;
const onlineUsers = new Map(); 

const allowedOrigins = process.env.CORS_ORIGINS.split(",");



const initSocket = (server) => {
 
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
  },
    transports: ["polling", "websocket"],
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.join(userId);

      io.emit("online-users", Array.from(onlineUsers.keys()));
      console.log(`👤 ${userId} online`);
    });
   socket.on("send-message", async (data) => {
  try {
    const { senderId, receiverId, message, senderRole } = data;

    if (!senderId || !receiverId || !message) return;

    const msg = await Message.create({
      senderId,
      receiverId,
      message,
      senderRole: senderRole || "user", 
    });

    io.to(receiverId).emit("receive-message", msg);
    io.to(senderId).emit("receive-message", msg);

  } catch (err) {
    console.error("Socket send-message error:", err);
  }
});
    socket.on("mark-read", async ({ senderId, receiverId }) => {
      await Message.updateMany(
        { senderId, receiverId, isRead: false },
        { isRead: true }
      );
      io.to(senderId).emit("seen-update", { receiverId });
    });

    // ================= TYPING =================
    socket.on("typing", ({ senderId, receiverId }) => {
      io.to(receiverId).emit("typing", { senderId });
    });

    // ================= DISCONNECT =================
    socket.on("disconnect", () => {
      for (const [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) onlineUsers.delete(userId);
      }
      io.emit("online-users", Array.from(onlineUsers.keys()));
      console.log("Socket disconnected:", socket.id);
    });
  });
};

module.exports = { initSocket };
