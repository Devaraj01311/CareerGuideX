
import { Link } from "react-router-dom";
import { useSearch } from "./SearchContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, FileText, Briefcase, ChevronRight } from "lucide-react";

const PLACEHOLDERS = ["Find your dream job...", "Master a new skill...", "Explore job roles..."];

function AnimatedPlaceholder({ index }) {
  return (
    <div className="absolute left-11 top-1/2 -translate-y-1/2 h-5 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="text-sm text-slate-400 dark:text-slate-500 font-medium tracking-wide"
        >
          {PLACEHOLDERS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function DesktopSearch() {
  const { search, setSearch } = useSearch();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (search) return;
    const interval = setInterval(() => setIndex((p) => (p + 1) % PLACEHOLDERS.length), 3500);
    return () => clearInterval(interval);
  }, [search]);

  return (
    <div className="hidden md:flex relative items-center group flex-1 max-w-lg">
      <div className="absolute left-4 z-20 transition-transform group-focus-within:scale-110 duration-300">
        <Search size={18} className="text-slate-400 group-focus-within:text-violet-500" />
      </div>
      
      {!search && <AnimatedPlaceholder index={index} />}
      
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-2.5 bg-slate-100/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 
                   rounded-2xl outline-none text-sm transition-all duration-500
                   focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/50"
      />
    </div>
  );
}

export function DesktopNavLinks() {
  return (
    <div className="hidden md:flex items-center gap-1">
      {["Resume", "Jobs"].map((item) => (
        <Link
          key={item}
          to={`/${item.toLowerCase()}`}
          className="relative px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 
                     hover:text-violet-600 dark:hover:text-white transition-colors group"
        >
          {item}
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-1/2 group-hover:left-4" />
        </Link>
      ))}
      <Link
        to="/skills"
        className="ml-4 px-5 py-2.5 text-sm font-bold bg-linear-to-r from-violet-600 to-indigo-600 
                   text-white rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 
                   hover:-translate-y-0.5 active:scale-95 transition-all"
      >
        Add Skills
      </Link>
    </div>
  );
}

export function MobileSearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: -10 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="md:hidden px-4 pb-4"
    >
      <div className="relative group overflow-hidden bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl shadow-black/5">

        <div className="absolute inset-0 bg-linear-to-r from-violet-500/5 to-indigo-500/5 pointer-events-none" />
        
        <div className="relative flex items-center px-4 py-3.5">
          <Search size={18} className="text-slate-400 group-focus-within:text-violet-500 transition-colors mr-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search everything..."
            className="bg-transparent outline-none text-sm w-full dark:text-white font-medium placeholder:text-slate-400"
          />
        </div>
      </div>
    </motion.div>
  );
}


export function MobileMenuLinks() {
  const links = [
    { to: "/skills", label: "Add Skills", icon: <Plus size={18} />, primary: true },
    { to: "/resume", label: "Resume", icon: <FileText size={18} /> },
    { to: "/jobs", label: "Jobs", icon: <Briefcase size={18} /> }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="md:hidden px-4 pb-6"
    >
      <div className="bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-2 shadow-2xl shadow-black/10">
        
        <div className="px-4 py-3 mb-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Navigation</p>
        </div>

        <div className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${
                link.primary 
                ? "bg-violet-600/5 dark:bg-violet-500/10 border border-violet-500/20" 
                : "hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${link.primary ? "text-violet-600 dark:text-violet-400" : "text-slate-400 group-hover:text-violet-500"} transition-colors`}>
                  {link.icon}
                </span>
                <span className={`text-sm font-bold ${link.primary ? "text-violet-700 dark:text-violet-300" : "text-slate-600 dark:text-slate-200"}`}>
                  {link.label}
                </span>
              </div>
              <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        <div className="mt-4 px-4 py-3 bg-slate-50/50 dark:bg-white/5 rounded-xl flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">CareerGuideX Pro</span>
            <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            </div>
        </div>
      </div>
    </motion.div>
  );
}