import React from 'react';

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full hidden dark:block animate-pulse" />
          <div className="h-full w-full border-[3px] border-slate-100 dark:border-slate-800 border-t-[#2D46B9] dark:border-t-blue-500 rounded-full animate-spin shadow-sm" />
        </div>
        <div className="flex flex-col items-center animate-pulse">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              CareerGuide<span className="text-violet-600 dark:text-violet-400">X</span>
           </h2>
           <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-1">
              Loading...
           </p>
        </div>
      </div>
    </div>
  );
}