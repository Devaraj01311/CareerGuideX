import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SlidingBanner({ slides = [] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  return (
    <div className="relative overflow-hidden rounded-[30px] md:rounded-[40px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 min-h-137.5 md:h-150 px-6 py-12 md:p-16 shadow-sm dark:shadow-none mb-8 md:mb-12 transition-colors duration-300">
    
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-200 dark:bg-cyan-500 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-10 -mr-20 -mt-20 md:-mr-32 md:-mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-200 dark:bg-blue-500 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-10 -ml-20 -mb-20 md:-ml-32 md:-mb-32" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col md:flex-row h-full w-full items-center justify-center md:justify-between relative z-10 gap-8 md:gap-12"
        >
          <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left items-center md:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-[#2D46B9] dark:text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 w-fit">
              <Sparkles size={12} /> AI-Powered Career Engine
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black leading-[1.1] mb-4 md:mb-6 tracking-tight text-slate-900 dark:text-white">
              {slides[index].title.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-cyan-500">
                {slides[index].title.split(" ").slice(-2).join(" ")}
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">
              {slides[index].description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/skills" className="w-full sm:w-auto">
                <button className="w-full bg-[#2D46B9] dark:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 dark:shadow-none">
                  Add Skills <ArrowRight size={18} />
                </button>
              </Link>
              <button className="text-slate-500 dark:text-slate-400 font-bold text-sm hover:text-slate-900 dark:hover:text-white transition-colors">
                How it works →
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center relative">
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="relative group"
            >
               <img
                src={slides[index].image}
                alt={slides[index].title}
                className="h-62.5 sm:h-75 md:h-112.5 w-auto object-contain relative z-10 drop-shadow-2xl"
              />
         
              <div className="absolute -bottom-4 -left-4 md:-left-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-2xl border border-white/50 dark:border-slate-700/50 z-20 flex items-center gap-3">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg md:text-xl italic">99%</div>
                 <div className="hidden sm:block">
                    <p className="text-[8px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Accuracy</p>
                    <p className="text-[10px] md:text-xs font-bold text-slate-800 dark:text-slate-100">Precision Match</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 md:bottom-10 left-1/2 md:left-10 -translate-x-1/2 md:translate-x-0 flex gap-2 md:gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === index ? "w-8 md:w-12 bg-[#2D46B9] dark:bg-blue-500" : "w-2 md:w-3 bg-slate-200 dark:bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}