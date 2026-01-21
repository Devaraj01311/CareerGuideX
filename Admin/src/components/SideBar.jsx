import React from 'react';
import { LayoutDashboard, Users, Terminal, Settings, LogOut, ShieldCheck } from 'lucide-react';
import socket from '../socket/socket'
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminId")

    socket.disconnect();

    navigate('/admin/login')

  }
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'logs', label: 'System Logs', icon: Terminal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-[#3A3A3A] bg-[#1a1a1a] flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-[#008a77] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#008a77]/20">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="text-white text-sm font-black tracking-tighter uppercase">CareerGuideX Admin</h1>
          <p className="text-[#008a77] text-[10px] font-bold uppercase tracking-widest">System Control</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-[#008a77]/10 text-[#008a77] border border-[#008a77]/20 font-bold' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[#3A3A3A]">
        <div className="bg-[#2c2c2c] rounded-xl p-4 border border-[#3A3A3A]">
          <div className="flex items-center gap-3 mb-3">
            <div className="size-8 rounded-full bg-[#008a77] flex items-center justify-center font-bold text-xs">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Admin</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">CareerGuideX Admin</p>
            </div>
          </div>
          <button
          onClick={handleAdminLogin} 
          className="w-full flex items-center justify-center gap-2 text-[11px] font-bold py-2 bg-[#1a1a1a] border border-[#3A3A3A] rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}