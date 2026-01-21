import React, { useState } from "react";
import { 
  MoreHorizontal, Search, Filter, Download, UserPlus, 
  X, ShieldCheck, ShieldAlert, Clock, Database, Mail, 
  Fingerprint, Calendar, Tag 
} from "lucide-react";

export default function UserManagement({ users, onViewUser }) {
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black font-mono tracking-tight text-white">User Management</h1>
          <p className="text-slate-500 text-sm">Review and manage your system users.</p>
        </div>
        <button className="h-10 px-4 bg-[#008a77] hover:bg-[#007a67] text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-[#008a77]/10">
          <UserPlus size={18} /> Create User
        </button>
      </div>

      <div className="bg-[#2c2c2c] rounded-xl border border-[#3A3A3A] overflow-hidden">
        <div className="p-5 border-b border-[#3A3A3A] flex items-center justify-between bg-[#ffffff05]">
          <div className="flex gap-4">
            <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#3A3A3A] rounded-lg text-xs font-bold flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Filter size={14} /> Filters
            </button>
            <button className="px-3 py-1.5 bg-[#1a1a1a] border border-[#3A3A3A] rounded-lg text-xs font-bold flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-[#ffffff02] border-b border-[#3A3A3A]">
            <tr className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <th className="py-4 px-6">User</th>
              <th className="py-4 px-6">Provider</th>
              <th className="py-4 px-6">Skills</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3A3A3A]">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-[#ffffff02] transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#008a77] flex items-center justify-center font-bold text-white uppercase">
                      {user.name?.[0] || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded uppercase border border-blue-500/20">
                    {user.provider || "local"}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Tag size={12} className="text-slate-600" />
                    {user.skills?.length || 0} items
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewUser(user)}
                      className="px-4 py-1.5 bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setSelectedUserDetails(user)}
                      className="px-4 py-1.5 bg-[#008a77]/10 text-[#008a77] border border-[#008a77]/20 hover:bg-[#008a77] hover:text-white rounded-lg text-xs font-bold transition-all"
                    >
                      Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUserDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl border border-[#3A3A3A] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-[#3A3A3A] flex justify-between items-center bg-[#ffffff02]">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-[#008a77] flex items-center justify-center text-xl font-black text-white">
                  {selectedUserDetails.name?.[0]}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-tight">{selectedUserDetails.name}</h2>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-tight">{selectedUserDetails._id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUserDetails(null)}
                className="p-2 hover:bg-[#3A3A3A] rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <DetailItem 
                  icon={<Mail size={16} />} 
                  label="Email Address" 
                  value={selectedUserDetails.email} 
                />
                <DetailItem 
                  icon={<Database size={16} />} 
                  label="Auth Provider" 
                  value={selectedUserDetails.provider} 
                  badge={true}
                />
                <DetailItem 
                  icon={<Fingerprint size={16} />} 
                  label="Provider ID" 
                  value={selectedUserDetails.providerId || "N/A"} 
                  isMono={true}
                />
              </div>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#008a77]" /> Verification
                  </span>
                  <div className={`text-xs font-bold flex items-center gap-2 ${selectedUserDetails.isVerified ? 'text-green-400' : 'text-amber-400'}`}>
                    {selectedUserDetails.isVerified ? 'VERIFIED ACCOUNT' : 'UNVERIFIED'}
                  </div>
                </div>

                <DetailItem 
                  icon={<Calendar size={16} />} 
                  label="Created At" 
                  value={new Date(selectedUserDetails.createdAt).toLocaleString()} 
                />
                <DetailItem 
                  icon={<Clock size={16} />} 
                  label="Last Updated" 
                  value={new Date(selectedUserDetails.updatedAt).toLocaleString()} 
                />
              </div>
              <div className="col-span-2 pt-4 border-t border-[#3A3A3A]">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Skills & Attributes</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUserDetails.skills?.length > 0 ? (
                    selectedUserDetails.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-[#2c2c2c] border border-[#3A3A3A] rounded-md text-xs text-white">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-600 italic">No skills listed</span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 bg-[#ffffff02] border-t border-[#3A3A3A] flex justify-end gap-3">
              <button 
                onClick={() => setSelectedUserDetails(null)}
                className="px-6 py-2 bg-[#3A3A3A] hover:bg-[#4A4A4A] text-white rounded-lg text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for modal layout
function DetailItem({ icon, label, value, badge = false, isMono = false }) {
  return (
    <div className="space-y-1.5">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
      </span>
      {badge ? (
        <span className="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded border border-blue-500/20 uppercase">
          {value}
        </span>
      ) : (
        <p className={`text-sm text-white ${isMono ? 'font-mono text-xs text-slate-400' : 'font-semibold'}`}>
          {value}
        </p>
      )}
    </div>
  );
}