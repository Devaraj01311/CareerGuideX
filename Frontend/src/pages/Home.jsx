import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SlidingBanner from "../Components/SlidingBanner";
import NavBar from "../Components/NavBar";
import Footer from "./Footer";

import personImg from "../assets/person.png";
import jobs from "../assets/jobs.png";
import robotic from "../assets/robotic.png";
import jobhanding from "../assets/robohand.png";

import { 
  Upload, Sparkles, LayoutGrid, CheckCircle2, 
  BarChart3, ArrowRight, Lock 
} from "lucide-react";

const slides = [
  {
    title: "Find Your Dream Job With Your Skills",
    description: "CareerGuideX intelligently analyzes your skills and interests to recommend jobs that truly match your profile.",
    image: personImg,
  },
  {
    title: "AI-Powered Skill Matching Engine",
    description: "Our AI engine maps your skills with thousands of live job listings from trusted platforms in real time.",
    image: robotic,
  },
  {
    title: "One Profile. Multiple Platforms.",
    description: "Connect seamlessly with LinkedIn, Adzuna, and Remotive so you never miss an opportunity.",
    image: jobs,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SlidingBanner slides={slides} />
        </motion.div>

        <section className="py-12 md:py-24">
          <motion.div {...fadeInUp} className="text-center mb-10 md:mb-16">
            <span className="bg-blue-50 dark:bg-blue-900/30 text-[#2D46B9] dark:text-blue-400 px-4 py-1 rounded-full font-bold tracking-widest text-[10px] uppercase">
              How it works
            </span>
            <h2 className="text-3xl md:text-6xl font-black mt-4 text-slate-900 dark:text-white leading-tight">
              Master career in <span className="text-cyan-500">three phases</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { id: '01', icon: <Upload />, title: "Upload & Analyze", desc: "AI scans your profile to quantify achievements you might have overlooked." },
              { id: '02', icon: <Sparkles />, title: "Match & Refine", desc: "Smart filters find high-probability job matches tailored to you in seconds." },
              { id: '03', icon: <LayoutGrid />, title: "Apply & Track", desc: "Integrated dashboard for managing applications with automatic status updates." },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              
                className="group p-8 md:p-10 rounded-[30px] md:rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all relative overflow-hidden cursor-default"
              >
                <span className="absolute right-6 top-4 text-6xl md:text-8xl font-black text-slate-50 dark:text-slate-800 group-hover:text-blue-50 dark:group-hover:text-blue-900/20 transition-colors pointer-events-none">
                  {step.id}
                </span>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#2D46B9] text-white flex items-center justify-center mb-6 md:mb-8 relative z-10 shadow-lg shadow-blue-200 dark:shadow-none">
                  {step.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 relative z-10 text-slate-900 dark:text-white">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-24">
           <motion.div {...fadeInUp} className="mb-8 md:mb-12 text-center md:text-left">
              <span className="text-[#2D46B9] dark:text-blue-400 font-black tracking-widest text-[10px] uppercase">The Advantage</span>
              <h2 className="text-3xl md:text-4xl font-black mt-2 text-slate-900 dark:text-white">Why Choose CareerGuideX?</h2>
           </motion.div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
              <motion.div 
                {...fadeInUp}
                whileHover={{ scale: 1.01 }}
                className="bg-slate-50/50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[30px] md:rounded-[50px] border border-slate-100 dark:border-slate-800 flex flex-col justify-between group transition-all duration-500"
              >
                <div>
                  <div className="flex items-center gap-2 text-cyan-500 font-bold text-[10px] uppercase mb-4 md:mb-6">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> Core Tech
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight text-slate-900 dark:text-white">The AI Match Engine<br className="hidden md:block"/> that learns your ambition</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-6 md:mb-8 leading-relaxed">We analyze sentiment and career trajectory to find the roles you actually want.</p>
                  <button className="text-[#2D46B9] dark:text-blue-400 font-bold flex items-center gap-2 group text-sm">
                    Learn about engine <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mt-8 md:mt-12 h-48 md:h-64 bg-linear-to-br from-[#2D46B9] to-cyan-400 rounded-2xl md:rounded-3xl relative overflow-hidden shadow-2xl"
                >
                   <img src={jobhanding} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" alt="" />
                </motion.div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              
                 <motion.div 
                  {...fadeInUp}
                  whileHover={{ x: 10 }}
                  className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[30px] md:rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm sm:col-span-2 lg:col-span-1 transition-all"
                 >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">Market Insights</h3>
                      <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/40 text-[#2D46B9] dark:text-blue-400 rounded-xl md:rounded-2xl group-hover:rotate-12 transition-transform">
                        <BarChart3 size={20}/>
                      </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mb-6 md:mb-8">Real-time salary benchmarks for every role in your industry.</p>
                    <div className="flex gap-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-1.5 bg-[#2D46B9] rounded-full" 
                      />
                      <div className="h-1.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                    </div>
                 </motion.div>

                 <motion.div 
                  {...fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[30px] md:rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm text-center group transition-all"
                 >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D46B9] text-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform"><CheckCircle2 size={20}/></div>
                    <p className="font-bold text-sm md:text-base mb-2 text-slate-900 dark:text-white">Priority Access</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Direct-to-recruiter pipelines.</p>
                 </motion.div>

                 <motion.div 
                  {...fadeInUp}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[30px] md:rounded-[50px] border border-slate-100 dark:border-slate-800 shadow-sm text-center group transition-all"
                 >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#2D46B9] text-white rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform"><Lock size={20}/></div>
                    <p className="font-bold text-sm md:text-base mb-2 text-slate-900 dark:text-white">Privacy First</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Encrypted data protection.</p>
                 </motion.div>
              </div>
           </div>
        </section>

        <section className="py-12 md:py-20">
          <motion.div 
            {...fadeInUp}
            className="bg-[#2D46B9] rounded-[40px] md:rounded-[60px] p-8 sm:p-16 md:p-24 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-400 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-10 -mr-32 -mt-32" />
            
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 relative z-10 leading-tight">
              Ready to outsmart the<br className="hidden sm:block" /> traditional job hunt?
            </h2>
            <p className="text-blue-100/80 mb-8 md:mb-12 text-sm md:text-lg max-w-xl mx-auto relative z-10">
              Join 50,000+ professionals using AI to build meaningful careers.
            </p>
            
            <div className="relative z-10">
              <Link to="/skills">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white dark:bg-slate-100 text-[#2D46B9] px-12 py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-2xl hover:bg-slate-50 dark:hover:bg-white transition-colors"
                >
                  Add Skills to Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}