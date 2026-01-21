import React from "react";
import { MessageSquare, MoreHorizontal } from "lucide-react";

export default function UserGrid({ users, onView }) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {users.map((user) => (
        <div key={user._id} className="bg-[#1a1a1a] p-5 rounded-xl border border-white/5 hover:border-[#008a77]/50 transition-all group relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#008a77] to-emerald-400 flex items-center justify-center font-black text-white text-lg">
              {user.name?.[0] || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-white truncate">{user.name}</h4>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <button className="p-1 text-slate-600 hover:text-white transition-colors"><MoreHorizontal size={18}/></button>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.provider || "Local"}</span>
            <span className="px-2 py-1 rounded bg-emerald-500/10 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active</span>
          </div>

          <button 
            onClick={() => onView(user)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-[#008a77]/10 hover:bg-[#008a77] text-[#008a77] hover:text-white rounded-lg text-xs font-bold transition-all"
          >
            <MessageSquare size={14} /> Open Chat
          </button>
        </div>
      ))}
    </div>
  );
}