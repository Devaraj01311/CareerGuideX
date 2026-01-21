import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ArrowUp, 
  Send, 
  Facebook,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';


const FooterPage = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-700 dark:text-slate-300 transition-colors duration-300 selection:bg-teal-100 dark:selection:bg-violet-900/30">
      
      <section className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D46B9] dark:text-blue-500 tracking-tight mb-6">
          Your Future Starts Here.
        </h1>
        <p className="text-slate-400 dark:text-slate-500 text-lg max-w-lg leading-relaxed mb-8">
          Scroll down to explore the interactive CareerGuideX workspace footer.
        </p>
        <div className="animate-bounce text-violet-800 dark:text-violet-400 mt-4">
          <ChevronDown size={40} strokeWidth={2.5} />
        </div>
      </section>

      <footer className="relative w-full border-t border-slate-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 pt-20 transition-colors duration-300">

        <div className="absolute -top-6 right-10 md:right-20">
          <button 
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 dark:bg-violet-500 text-white shadow-lg hover:bg-violet-800 dark:hover:bg-violet-600 transition-all"
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
            
            <div className="md:col-span-4 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  CareerGuide<span className="text-violet-600 dark:text-violet-400">X</span>
                </h2>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                  Empowering the next generation of professionals with data-driven career paths and interactive tools.
                </p>
              </div>
              
              <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors w-fit">Terms & Conditions</a>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors w-fit">Privacy Policy</a>
                <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors w-fit">Cookie Policy</a>
              </nav>
            </div>
            <div className="md:col-span-4 flex md:justify-center">
              <div className="space-y-6 w-full max-w-50">
                <h3 className="text-[16px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-[0.2em]">
                  Quick Actions
                </h3>
                <nav className="flex flex-col gap-4 text-sm font-bold text-slate-800 dark:text-slate-200">
                  <a href="/skills" className="flex items-center gap-3 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group">
                    <span className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 group-hover:bg-teal-50 dark:group-hover:bg-violet-900/40"><ArrowUp size={15} /></span> 
                    Add Skills
                  </a>
                  <a href="/resume" className="flex items-center gap-3 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group">
                    <span className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 group-hover:bg-teal-50 dark:group-hover:bg-violet-900/40"><ArrowUp size={15} /></span> 
                    Resume 
                  </a>
                  <a href="/jobs" className="flex items-center gap-3 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group">
                    <span className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 group-hover:bg-teal-50 dark:group-hover:bg-violet-900/40"><ArrowUp size={15} /></span> 
                    Jobs
                  </a>
                </nav>
              </div>
            </div>

            <div className="md:col-span-4 space-y-10 md:text-right flex flex-col md:items-end">
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                  Connect with us
                </h3>
                <div className="flex gap-3 justify-end">
                  {[
                    { icon: <Facebook size={18} />, url: "https://facebook.com" },
                    { icon: <Linkedin size={18} />, url: "https://linkedin.com" },
                    { icon: <Twitter size={18} />, url: "https://twitter.com" },
                    { icon: <Instagram size={18} />, url: "https://instagram.com" }
                  ].map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noreferrer">
                      <button className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-teal-50 dark:hover:bg-violet-900/40 transition-all">
                        {social.icon}
                      </button>
                    </a>
                  ))}
                </div>
              </div>

              <div className="w-full max-w-70">
                <div className="relative group">
                  <input 
                    type="email" 
                    placeholder="Join our newsletter" 
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-violet-400 dark:border-violet-500/50 focus:border-teal-200 dark:focus:border-violet-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-teal-50 dark:focus:ring-violet-900/20 outline-none text-sm text-slate-900 dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  <Link
                   to="/messages"
                   className="absolute right-2 top-2 h-9 w-10 bg-violet-600 dark:bg-violet-500 text-white rounded-lg flex items-center justify-center hover:bg-violet-800 dark:hover:bg-violet-600 transition-colors">
                    <Send size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-20 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              © 2026 CareerGuideX. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-xs text-slate-400 dark:text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 shadow-[0_0_8px_rgba(124,58,237,0.5)]"></span>
                Platform Status: Operational
              </div>
              <button className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">English (US)</button>
            </div>
          </div>
        </div>

        <div className="mt-8 h-1.5 w-full bg-violet-600 dark:bg-violet-500"></div>
      </footer>
    </div>
  );
};

export default FooterPage;