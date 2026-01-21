import { useState, useRef, useEffect } from "react";
import { ALL_SKILLS } from "../hook/DataSkills";

export default function SkillDropdown({ value, onChange, placeholder = "Select skill..." }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredSkills = ALL_SKILLS.filter(skill =>
    skill.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClick = (e) => wrapperRef.current && !wrapperRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-4.5 rounded-2xl text-[15px] font-semibold
                   focus:outline-none focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/20 focus:border-indigo-400 dark:focus:border-indigo-500
                   placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all text-slate-700 dark:text-slate-200 shadow-sm"
      />

      {open && (
        <ul className="absolute z-50 mt-3 w-full max-h-72 overflow-y-auto
                       bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-none
                       p-2 scrollbar-thin transition-colors duration-300">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill, index) => (
              <li
                key={index}
                onClick={() => { onChange(skill); setOpen(false); }}
                className="px-5 py-3.5 cursor-pointer text-sm font-bold text-slate-600 dark:text-slate-400
                           hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-xl transition-all"
              >
                {skill}
              </li>
            ))
          ) : (
            <li className="px-5 py-6 text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest text-center">
              No Results
            </li>
          )}
        </ul>
      )}
    </div>
  );
}