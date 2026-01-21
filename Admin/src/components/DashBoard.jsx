import React from 'react';
import { TrendingUp, Users, Zap, Shield, Activity } from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-[#2c2c2c] p-6 rounded-xl border border-[#3A3A3A] flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
      <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={18} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4">
      <p className="text-3xl font-black font-mono text-white">{value}</p>
      <p className="text-emerald-500 text-[10px] font-bold flex items-center gap-1 mt-1">
        <TrendingUp size={12} /> {trend} vs last month
      </p>
    </div>
  </div>
);

export default function DashboardOverview({ users, chatSummary, onViewUser }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={users.length} trend="+12%" icon={Users} color="bg-[#008a77]" />
        <StatCard title="Active Chats" value={chatSummary.length} trend="+5%" icon={Zap} color="bg-blue-500" />
        <StatCard title="System Health" value="99.9%" trend="Stable" icon={Shield} color="bg-emerald-500" />
        <StatCard title="Avg Latency" value="42ms" trend="-2ms" icon={Activity} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Summary List */}
        <div className="lg:col-span-2 bg-[#2c2c2c] rounded-xl border border-[#3A3A3A] flex flex-col">
          <div className="p-6 border-b border-[#3A3A3A]">
            <h3 className="font-bold text-lg font-mono text-white uppercase tracking-tight">Recent Conversations</h3>
            <p className="text-xs text-slate-500">Real-time message summary from all users</p>
          </div>
         <div className="divide-y divide-[#3A3A3A]">
  {chatSummary.map((chat, i) => (
    <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
        {/* Safely get the first letter of the name */}
        <div className="size-10 rounded-full bg-[#3A3A3A] flex items-center justify-center font-bold text-[#008a77]">
          {chat?.name ? chat.name[0] : "?"}
        </div>
        <div>
          {/* FIX: Access name directly from chat object */}
          <p className="text-sm font-bold text-white">{chat?.name || "Unknown User"}</p>
          <p className="text-xs text-slate-500 truncate max-w-50">{chat?.lastMessage}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {chat?.unread > 0 && (
          <span className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 rounded-full">
            {chat.unread} NEW
          </span>
        )}
        <button 
          onClick={() => onViewUser(chat)} // Pass the whole chat object
          className="px-3 py-1 bg-[#008a77]/10 text-[#008a77] text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-[#008a77]/20"
        >
          Open Chat
        </button>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* System Activity Feed */}
        <div className="bg-[#2c2c2c] rounded-xl border border-[#3A3A3A] p-6">
          <h3 className="font-bold text-sm font-mono text-white uppercase tracking-widest mb-6">System Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-4 relative before:absolute before:left-1 before:top-6 before:-bottom-5 before:w-px before:bg-[#3A3A3A] last:before:hidden">
                <div className="size-2 rounded-full bg-[#008a77] mt-1.5 shrink-0 shadow-[0_0_8px_#008a77]"></div>
                <div>
                  <p className="text-xs font-bold text-white">Database Backup Completed</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-tighter">14 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}