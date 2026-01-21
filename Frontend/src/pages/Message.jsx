import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import socket from "../socket/socket";
import api from "../server/api";
import { Send, Shield, User, Info, ArrowLeft } from "lucide-react"; 
import PageLoader from "../Components/PageLoad";

export default function UserChat() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); 
  const [admin, setAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [pageLoad, setPageLoad] = useState()
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    api.get("/messages/admin/basic").then(res => {
      setAdmin(res.data);
    }
  );

    api.get(`/messages/${userId}`).then(res => {
      setMessages(res.data || []);
    });

    const handleReceive = (msg) => {
      if (msg.senderId === userId || msg.receiverId === userId) {
        setMessages(prev => [...prev, msg]);
      }
    };

    socket.on("receive-message", handleReceive);
    return () => socket.off("receive-message");
  }, [userId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !admin) return;

    const msgData = {
      senderId: userId,
      receiverId: admin._id,
      message: text,
      senderRole: "user"
    };

    socket.emit("send-message", msgData);
    setMessages(prev => [...prev, { ...msgData, createdAt: new Date() }]);
    setText("");
  };

  if (!userId) {
    return (
      <div className="h-screen bg-[#1a1a1a] flex items-center justify-center text-slate-500">
        Please log in to access support.
      </div>
    );
  }

  return (
    
    <div className="h-screen bg-[#1a1a1a] flex items-center justify-center p-4 sm:p-8 font-sans">
      {pageLoad && <PageLoader />}
      <div className="w-full max-w-4xl h-full max-h-200 bg-[#2c2c2c] rounded-2xl border border-[#3A3A3A] shadow-2xl overflow-hidden flex flex-col">
        
        <div className="p-6 border-b border-[#3A3A3A] bg-[#ffffff02] flex items-center justify-between">
          <div className="flex items-center gap-4">
           
            <button 
              onClick={() => navigate("/")} 
              className="mr-2 p-2 rounded-lg bg-[#3A3A3A] text-slate-400 hover:text-white hover:bg-[#444] transition-all"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="size-12 rounded-xl bg-violet-700 flex items-center justify-center text-white shadow-lg shadow-[#008a77]/20">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">System Support</h1>
              <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Agent: {admin?.name || "Admin"}
              </div>
            </div>
          </div>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <Info size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#1a1a1a]">
          <div className="text-center py-4">
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">End-to-End Encrypted Session</span>
          </div>

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.senderRole === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 px-4 rounded-2xl text-sm shadow-sm transition-all ${
                  m.senderRole === "user"
                    ? "bg-violet-700 text-white rounded-tr-none"
                    : "bg-[#2c2c2c] text-slate-200 border border-[#3A3A3A] rounded-tl-none"
                }`}
              >
                {m.message}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 bg-[#2c2c2c] border-t border-[#3A3A3A]">
          <div className="flex gap-3 relative items-center">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message for support..."
              className="flex-1 bg-[#1a1a1a] border border-[#3A3A3A] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-1 focus:ring-violet-700 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="p-3 bg-violet-700 text-white rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#008a77]/10"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-600 mt-4 font-medium uppercase tracking-tighter">
            CarrerGuideX Distribution Framework v9.42
          </p>
        </div>
      </div>
    </div>
  );
}