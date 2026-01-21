import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function Topbar({ onNotifClick, userCount }) {
  return (
    <header className="h-16 border-b border-[#3A3A3A] bg-[#1a1a1a]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#008a77]" size={18} />
          <input 
            type="text" 
            placeholder="Search notifications, users, or logs..." 
            className="w-full bg-[#2c2c2c] border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:ring-1 focus:ring-[#008a77] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#008a77]/10 border border-[#008a77]/20 rounded-full">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{userCount} Users Online</span>
        </div>

        <button 
          onClick={onNotifClick}
          className="relative p-2 rounded-lg bg-[#2c2c2c] text-slate-300 hover:text-white border border-[#3A3A3A] transition-colors"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]"></span>
        </button>
        
        <button className="p-2 rounded-lg bg-[#2c2c2c] text-slate-300 hover:text-white border border-[#3A3A3A]">
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
}