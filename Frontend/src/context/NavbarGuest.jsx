import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarGuest() {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        
         <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  CareerGuide<span className="text-violet-600">X</span>
                </h2>
        <div className="hidden lg:flex flex-1 max-w-md relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
          <input
            placeholder="Search skills or jobs..."
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-transparent focus:border-violet-500/30 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-violet-600 transition-colors">
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-white/5"
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
}