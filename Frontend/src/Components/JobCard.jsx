import React from "react";
import { Bookmark, Banknote, Calendar, ExternalLink } from "lucide-react";

export default function JobCard({ job, onSave, isSaved }) {
  
  const getTagStyles = () => {
    const tag = (job.tag || job.jobType || "Actively Hiring").toUpperCase();
    if (tag.includes("HIRING")) return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
    if (tag.includes("EXPIRING")) return "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
    if (tag.includes("TOP")) return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    if (tag.includes("HIGH")) return "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
  };

  const formatRupees = (val) => {
    if (!val) return "₹ Not Disclosed";
    return val.toString().replace(/\$/g, "₹");
  };

  return (
    <div className="
      group bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 p-8 
      shadow-sm dark:shadow-none relative flex flex-col h-full font-['Inter']
      /* HOVER LIFT EFFECT */
      transition-all duration-300 ease-out 
      hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-100 dark:hover:border-indigo-500
    ">
      <div className="flex justify-between items-start mb-6">
        <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-2.5 overflow-hidden transition-colors">
          {job.logo ? (
            <img src={job.logo} alt="" className="w-full h-full object-contain" />
          ) : (
            <div className="text-xl font-black text-indigo-200 dark:text-indigo-800 uppercase transition-colors">{job.company?.charAt(0)}</div>
          )}
        </div>
        <button 
           onClick={() => onSave(job)}
           className={`size-10 flex items-center justify-center rounded-xl transition-all shadow-sm
             ${isSaved 
               ? "bg-red-500 text-white" 
               : "bg-[#f0edff] dark:bg-indigo-900/30 text-[#6344f9] dark:text-indigo-400 hover:bg-red-500 hover:text-white"
             }`}
        >
          <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="grow">
        <div className="mb-4">
          <span className={`
            text-[10px] font-semibold px-3 py-1.5 rounded-lg tracking-widest uppercase transition-all duration-300 
            ${getTagStyles()} 
            group-hover:bg-linear-to-r group-hover:from-[#1A0B3B] group-hover:to-indigo-900 dark:group-hover:from-indigo-600 dark:group-hover:to-blue-700 group-hover:text-white
          `}>
            {job.tag || job.jobType || "Actively Hiring"}
          </span>
        </div>
        
        <h3 className="text-[22px] font-semibold text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-[#6344f9] dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {job.title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 font-bold mt-1 mb-6 transition-colors">
          {job.company} • {job.location}
        </p>
        <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-6 group-hover:bg-[#6344f9]/10 transition-colors"></div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center text-slate-800 dark:text-slate-200 text-[16px] font-light transition-colors">
            <Banknote size={20} className="mr-3 text-slate-300 dark:text-slate-600 group-hover:text-[#46388b] dark:group-hover:text-indigo-400 transition-colors" />
            <span>{formatRupees(job.salary)}</span>
          </div>
          <div className="flex items-center text-slate-400 dark:text-slate-500 text-[14px] font-semibold tracking-tight transition-colors">
            <Calendar size={20} className="mr-3 text-slate-300 dark:text-slate-700" />
            <span>{job.savedAt || "2 days ago"}</span>
          </div>
        </div>
      </div>
      <a 
        href={job.applyLink} target="_blank" rel="noreferrer"
        className="
          w-full bg-[#483991] dark:bg-indigo-600 text-white py-4 rounded-2xl font-medium 
          flex items-center justify-center gap-2 transition-all 
          hover:bg-linear-to-r hover:from-[#1A0B3B] hover:to-indigo-900 dark:hover:from-indigo-700 dark:hover:to-blue-800 
          shadow-lg shadow-indigo-100 dark:shadow-none active:scale-95 text-center
        "
      >
        Apply Now <ExternalLink size={18} />
      </a>
    </div>
  );
}