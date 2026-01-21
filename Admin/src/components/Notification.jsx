import React, { useState, useEffect } from 'react';
import socket from "../socket/socket";
import { X, MessageSquare, BellOff } from 'lucide-react';

export default function NotificationPanel({ open, onClose, onClickNotification }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      setNotifications((prev) => [{ 
        id: Date.now(), 
        ...data,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }, ...prev]);
    };

    socket.on("receive-message", handleNewMessage);
    return () => socket.off("receive-message", handleNewMessage);
  }, []);

  if (!open) return null;

  return (
    <div className="absolute right-8 top-20 w-80 bg-[#2c2c2c] border border-[#3A3A3A] rounded-xl shadow-2xl z-100 animate-in fade-in zoom-in-95 duration-200">
      <div className="p-4 border-b border-[#3A3A3A] flex justify-between items-center bg-[#ffffff05]">
        <h3 className="text-xs font-black uppercase tracking-widest text-white">Notifications</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white"><X size={16} /></button>
      </div>

      <div className="max-h-96 overflow-y-auto p-2 space-y-2">
        {notifications.length === 0 ? (
          <div className="py-10 flex flex-col items-center gap-2 opacity-30">
            <BellOff size={32} />
            <p className="text-xs font-bold uppercase">No Alerts</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onClickNotification(n.senderId)}
              className="p-3 bg-[#1a1a1a] hover:bg-[#008a77]/10 rounded-lg cursor-pointer transition-all border border-transparent hover:border-[#008a77]/30 group"
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-[#008a77]" />
                  <span className="text-xs font-bold text-white">{n.senderName || "User"}</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500">{n.time}</span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <button 
          onClick={() => setNotifications([])}
          className="w-full py-3 text-[10px] font-black text-slate-500 hover:text-rose-500 uppercase tracking-widest border-t border-[#3A3A3A]"
        >
          Clear All
        </button>
      )}
    </div>
  );
}