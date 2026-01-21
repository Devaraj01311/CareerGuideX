import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import NavbarActions from "./NavbarActions";
import UserMenu from "./UserMenu";
import {
  DesktopSearch,
  DesktopNavLinks,
  MobileSearchBar,
  MobileMenuLinks
} from "../context/ResponsiveBar.jsx";

export default function NavbarLoggedIn({ onProfileOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const user = { name: "Devaraj I", email: "id8397169@gmail.com", avatar: "D" };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-400 mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
         <div className="flex items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>
          <span className="font-medium text-xl tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
            CareerGuideX
          </span>
        </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <DesktopSearch />
        <div className="flex items-center gap-2 lg:gap-4">
          <button
            className="md:hidden p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search size={20} />
          </button>

          <DesktopNavLinks />
          <div className="h-full w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block" />
          <NavbarActions />
          <UserMenu onProfileOpen={onProfileOpen} />
        </div>
      </div>
      <AnimatePresence>
        {searchOpen && <MobileSearchBar />}
        {menuOpen && <MobileMenuLinks />}
      </AnimatePresence>
    </motion.nav>
  );
}
