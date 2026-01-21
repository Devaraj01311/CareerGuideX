import { useState, useContext } from "react";
import { Sun, Moon, Settings, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContex.jsx";

export default function UserMenu({ onProfileOpen }) {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!user) return null;

  const isDark = theme === "dark";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          group flex items-center gap-2 p-1 pr-3 rounded-full
          bg-slate-100 dark:bg-white/5
          border border-slate-200 dark:border-white/10
          hover:border-violet-500/50 transition-all
        "
      >
        <div className="relative">
          <div className="absolute inset-0 bg-violet-600 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
          <div className="relative w-8 h-8 rounded-full bg-linear-to-tr from-violet-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-inner">
            {user.name?.[0]?.toUpperCase()}
          </div>
        </div>

        <span className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {user.name.split(" ")[0]}
        </span>

        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="
                fixed top-16 right-4 z-9999 w-64 overflow-hidden
                bg-white/90 dark:bg-[#0c0c0e]/90
                backdrop-blur-xl
                border border-slate-200 dark:border-white/10
                rounded-2xl
                shadow-2xl shadow-black/20
              "
            >
              <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.email}
                </p>
              </div>
              <div className="p-2">
                <MenuButton
                  icon={<Settings size={18} />}
                  label="Account Settings"
                  onClick={() => {
                    onProfileOpen();
                    setOpen(false);
                  }}
                />

                <MenuButton
                  icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
                  label={isDark ? "Light Mode" : "Dark Mode"}
                  onClick={toggleTheme}
                />

                <div className="my-1 border-t border-slate-100 dark:border-white/5" />

                <button
                  onClick={handleLogout}
                  className="
                    w-full px-4 py-3 flex items-center gap-3
                    text-red-500 hover:bg-red-50
                    dark:hover:bg-red-500/10
                    rounded-xl transition-colors
                    font-semibold text-sm
                  "
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        w-full px-4 py-3 flex items-center gap-3
        text-slate-600 dark:text-slate-300
        hover:bg-slate-100 dark:hover:bg-white/5
        rounded-xl transition-all
        text-sm font-medium
      "
    >
      <span className="text-slate-400">{icon}</span>
      {label}
    </button>
  );
}
