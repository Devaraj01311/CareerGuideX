import React, { useState, useEffect, useRef } from "react";
import api from "../server/api";
import socket from "../socket/socket";
import { Send, X, User, Mail, Shield } from "lucide-react";

export default function UserChatDrawer({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef();
  const adminId = import.meta.env.VITE_ADMIN_ID;

  useEffect(() => {
    if (!user?._id) return;
    
    // 1. Fetch History (Matches messageRoutes: router.get("/:userId"))
    api.get(`/messages/${user._id}`)
      .then(res => setMessages(res.data || []))
      .catch(err => console.error("History fetch error", err));

    // 2. Real-time Listener
    const handleReceive = (msg) => {
      if (msg.senderId === user._id || msg.receiverId === user._id) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message");
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // components/UserChatDrawer.jsx

const onSend = () => {
  if (!text.trim() || !user) return;

  const adminId = import.meta.env.VITE_ADMIN_ID; // Ensure this is 100% correct

  const msgData = {
    senderId: adminId,
    receiverId: user._id, // The user's MongoDB _id
    message: text,
    senderRole: "admin" // This tells the backend/user who sent it
  };

  // Emit to socket
  socket.emit("send-message", msgData);
  
  // Clear input
  setText("");
};
  if (!user) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-[#1a1a1a] border-l border-[#3A3A3A] shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* User Info Header */}
      <div className="p-6 bg-[#2c2c2c] border-b border-[#3A3A3A]">
         <div className="flex justify-between items-start mb-6">
            <div className="size-14 rounded-2xl bg-[#008a77] flex items-center justify-center text-2xl font-black text-white shadow-lg">
                {user.name?.[0]}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500"><X /></button>
         </div>
         <h2 className="text-xl font-bold text-white">{user.name}</h2>
         <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
            <Mail size={12}/> {user.email}
         </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#141414]">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.senderRole === 'admin' 
                ? 'bg-[#008a77] text-white rounded-tr-none shadow-md' 
                : 'bg-[#2c2c2c] text-slate-200 border border-[#3A3A3A] rounded-tl-none'
            }`}>
              {m.message}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Message Input */}
      <div className="p-6 bg-[#2c2c2c] border-t border-[#3A3A3A]">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Type a reply..."
            className="flex-1 bg-[#1a1a1a] border border-[#3A3A3A] rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-[#008a77] outline-none"
          />
          <button 
            onClick={onSend}
            className="p-3 bg-[#008a77] text-white rounded-xl hover:bg-[#007a67] transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}