import { Briefcase, Terminal, Code2, Cpu, Globe, Layers } from "lucide-react";

export default function JobsSidebar({
  roles = [],
  skills = [],
  activeRole,
  setActiveRole,
}) {

  const getRoleIcon = (role) => {
    const r = role.toLowerCase();
    if (r.includes('front')) return <Code2 size={18} />;
    if (r.includes('back') || r.includes('data')) return <Terminal size={18} />;
    if (r.includes('lead') || r.includes('manager')) return <Layers size={18} />;
    if (r.includes('full')) return <Globe size={18} />;
    return <Briefcase size={18} />;
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Filter Roles
          </h3>
          <button 
            onClick={() => setActiveRole("")}
            className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 tracking-wider transition-colors"
          >
            RESET
          </button>
        </div>

        <div className="space-y-2">
          {roles.map((role) => {
            const isActive = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => setActiveRole(isActive ? "" : role)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 translate-x-1"
                    : "text-slate-500 hover:bg-white hover:text-indigo-600 hover:shadow-sm border border-transparent"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-indigo-500"}`}>
                  {getRoleIcon(role)}
                </span>
                <span className="truncate">{role}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 px-1">
          Technical Skills
        </h4>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[11px] font-bold shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-default select-none whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-4 border-t border-slate-200/60">
        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 px-1">
          Experience Level
        </h4>
        <div className="space-y-3 px-1">
          {['Entry Level', 'Mid-Level', 'Senior'].map((level) => (
            <label key={level} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-indigo-600 checked:border-indigo-600 transition-all" />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              </div>
              <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{level}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}