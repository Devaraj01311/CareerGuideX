import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Pencil, Plus, User, Mail, Info, ShieldCheck } from 'lucide-react';
import api from "../server/api";
import toast from "react-hot-toast";

export default function ProfileDrawer({ open, onClose }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (open) fetchProfile();
  }, [open]);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUser(res.data);
      setName(res.data.name || "");
      setSkills(res.data.skills || []);
      setBio(res.data.bio || "");
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim() || skills.includes(skillInput.trim())) return;
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("skills", skills.join(","));
      if (image) formData.append("profileImage", image);

      await api.put("/user/profile", formData);
      toast.success("Profile updated successfully");
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end font-sans">
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="
          relative h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col
          w-full sm:max-w-md border-l border-slate-100 dark:border-slate-800
          animate-in slide-in-from-right duration-300 transition-colors
        "
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Profile Settings</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Manage your public identity</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 space-y-8">
          {user ? (
            <>
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#2D46B9] rounded-full blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
                  <img
                   src={
                    previewUrl ||
                     user.profileImage ||
                      `https://ui-avatars.com/api/?name=${user.name}&background=2D46B9&color=fff`
                     }
                       className="relative w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl"
                  />

                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-[#2D46B9] text-white p-2.5 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    <Pencil size={14} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mt-4 text-center">
                   <h3 className="font-black text-slate-900 dark:text-white text-lg leading-tight">{user.name}</h3>
                   <div className="flex items-center gap-1.5 justify-center mt-1">
                      <ShieldCheck size={12} className="text-[#b38f1f]" />
                      <span className="text-[10px] font-black text-[#b38f1f] uppercase tracking-widest">{user.role || "Professional"}</span>
                   </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-[#2D46B9]/5 focus:border-[#2D46B9] outline-none transition-all placeholder:text-slate-400"
                      placeholder="Full Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                    <input
                      value={user.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 dark:text-slate-500 cursor-not-allowed italic text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Professional Bio</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-[#2D46B9]/5 focus:border-[#2D46B9] outline-none transition-all resize-none text-sm leading-relaxed"
                    placeholder="Professional bio"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Skills & Stack</label>
                  <div className="flex gap-2">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill(e)}
                      placeholder="Add skill"
                      className="flex-1 bg-transparent border-b border-slate-200 dark:border-slate-700 px-1 py-1 text-sm outline-none focus:border-[#2D46B9] dark:text-white transition-colors"
                    />
                    <button
                      onClick={addSkill}
                      className="text-[#2D46B9] dark:text-blue-400 font-bold text-xs uppercase tracking-widest px-3 py-1 hover:bg-[#2D46B9]/5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.length ? (
                      skills.map(skill => (
                        <motion.div
                          layout
                          key={skill}
                          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 group hover:border-[#2D46B9] transition-all"
                        >
                          {skill}
                          <button 
                            onClick={() => removeSkill(skill)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 py-2 italic text-xs">
                        <Info size={14} /> No skills added
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
               <div className="w-10 h-10 border-4 border-slate-200 border-t-[#2D46B9] rounded-full animate-spin" />
               <p className="text-sm font-bold tracking-widest uppercase">Fetching Data</p>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
          <button
            disabled={loading || !user}
            onClick={updateProfile}
            className="w-full bg-[#2D46B9] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#2D46B9]/20 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Syncing..." : "Save Profile"}
          </button>
          <button
            onClick={onClose}
            className="w-full border border-slate-200 dark:border-slate-800 dark:text-slate-400 py-4 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}