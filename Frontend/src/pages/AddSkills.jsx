import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../server/api";
import NavBar from "../Components/NavBar";
import SkillDropdown from "../Components/SkillsDropdown";
import toast from "react-hot-toast";
import { 
  Plus, 
  RefreshCw, 
  Trash2, 
  LayoutGrid, 
  Zap, 
  LineChart, 
  ShieldCheck, 
  X,
  ChevronRight,
  ArrowLeft
} from "lucide-react";

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [skillInput, setSkillInput] = useState("");
  const [oldSkillInput, setOldSkillInput] = useState("");
  const [proficiency, setProficiency] = useState("BEGINNER");
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data.skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAction = async () => {
    if (!skillInput && activeTab !== "update") return toast.error("Please enter a skill");
    
    try {
      const token = localStorage.getItem("token");
      let res;
      
      if (activeTab === "add") {
        res = await api.post("/skills/add", { skills: [skillInput], level: proficiency }, { headers: { Authorization: `Bearer ${token}` } });
      } else if (activeTab === "update") {
        if (!oldSkillInput) return toast.error("Select existing skill");
        res = await api.put("/skills/update", { oldSkill: oldSkillInput, newSkill: skillInput }, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        res = await api.delete("/skills/delete", { headers: { Authorization: `Bearer ${token}` }, data: { skill: skillInput } });
      }

      toast.success(res.data.message);
      setSkillInput("");
      setOldSkillInput("");
      setSkills(res.data.skills);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-['Inter'] selection:bg-indigo-100 dark:selection:bg-indigo-900/30 transition-colors duration-300">
     
      <NavBar />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-8xl mx-auto py-6 md:py-10 px-4 sm:px-6"
      >
          <button 
                onClick={() => navigate("/")}   
                className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition-colors mb-4"
              >
                <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-indigo-200 dark:group-hover:border-indigo-500 transition-all">
                    <ArrowLeft size={16} />
                </div>
                Back to Home
              </button>

        <div className="flex flex-col lg:flex-row bg-white dark:bg-slate-900 rounded-3xl md:rounded-4xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 transition-colors duration-300">
           
          <div className="w-full lg:w-80 xl:w-96 bg-[#1A0B3B] dark:bg-slate-950 p-6 sm:p-8 lg:p-10 flex flex-col relative overflow-hidden border-r dark:border-slate-800">
            <div className="hidden sm:block absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="hidden sm:block absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex-1">
              <p className="text-indigo-100 text-[10px] font-black tracking-[0.25em] mb-4 lg:mb-6 uppercase">Skill Actions</p>
              <h2 className="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-8 lg:mb-12">
                Elevate your <br className="hidden lg:block" /> <span className="text-indigo-300">Expertise.</span>
              </h2>

              <nav className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-4 lg:gap-3">
                {[
                  { id: 'add', label: 'Add New', icon: <Plus size={20} /> },
                  { id: 'update', label: 'Update', icon: <RefreshCw size={19} /> },
                  { id: 'delete', label: 'Remove', icon: <Trash2 size={19} /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`group relative flex items-center gap-3 lg:gap-4 w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 font-bold text-sm
                      ${activeTab === item.id ? "text-[#1A0B3B]" : "text-white/70 hover:text-white"}`}
                  >
                    {activeTab === item.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white dark:bg-indigo-600 rounded-xl lg:rounded-2xl shadow-xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    <span className={`relative z-10 ${activeTab === item.id ? "dark:text-white" : ""}`}>{item.icon}</span>
                    <span className={`relative z-10 tracking-wide ${activeTab === item.id ? "dark:text-white" : ""}`}>{item.label}</span>
                    <div className={`ml-auto relative z-10 hidden lg:block ${activeTab === item.id ? "dark:text-white" : ""}`}>
                       {activeTab === item.id && <ChevronRight size={16} />}
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            <div className="relative z-10 mt-8 p-4 rounded-xl bg-white/10 dark:bg-black/20 border border-white/10 backdrop-blur-md hidden lg:block">
              <p className="text-indigo-50 text-xs italic leading-relaxed opacity-90">
                "Skills define your career trajectory. Keep them updated to stay relevant."
              </p>
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-10 lg:p-16">
            <div className="max-w-3xl mx-auto">
              <header className="mb-8 lg:mb-12">
                <motion.h1 
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-linear-to-r from-[#1A0B3B] to-indigo-900 dark:from-indigo-300 dark:to-white bg-clip-text text-transparent mb-3 tracking-tight"
                >
                  {activeTab === 'add' ? 'Manage Your Skills' : activeTab === 'update' ? 'Update Competency' : 'Refine Your Stack'}
                </motion.h1>
                <p className="text-slate-500 dark:text-slate-400 text-base lg:text-lg">
                  {activeTab === 'add' 
                    ? "Add new proficiencies to your profile to match with the perfect career opportunities."
                    : "Keep your professional stack accurate by modifying or removing skills."}
                </p>
              </header>

              <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl lg:rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 mb-10 lg:mb-16">
                <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
                  {['TECH', 'DESIGN', 'SOFT SKILLS', 'MARKETING'].map((cat) => (
                    <span key={cat} className="whitespace-nowrap flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase">
                      <div className={`w-1.5 h-1.5 rounded-full ${cat === 'TECH' ? 'bg-blue-500' : cat === 'DESIGN' ? 'bg-purple-500' : cat === 'MARKETING' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="space-y-6 lg:space-y-8">
                  {activeTab === "update" && (
                    <div className="animate-in fade-in slide-in-from-top-1">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-2 block">Current Skill</label>
                      <SkillDropdown value={oldSkillInput} onChange={setOldSkillInput} />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-2 block">
                      {activeTab === "delete" ? "Select to Remove" : "Skill Name"}
                    </label>
                    <SkillDropdown 
                      value={skillInput} 
                      onChange={setSkillInput} 
                      placeholder="e.g. Java, Python..." 
                    />
                  </div>

                  {activeTab === "add" && (
                    <div className="animate-in fade-in slide-in-from-top-1">
                      <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-2 block">Expertise Level</label>
                      <div className="grid grid-cols-3 gap-2 p-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl lg:rounded-2xl transition-colors duration-300">
                        {["BEGINNER", "INTERMEDIATE", "EXPERT"].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setProficiency(lvl)}
                            className={`py-2.5 lg:py-3 rounded-lg lg:rounded-xl text-[9px] font-black tracking-widest transition-all
                              ${proficiency === lvl 
                                ? "bg-[#1A0B3B] dark:bg-indigo-600 text-white shadow-md scale-[1.02]" 
                                : "text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"}`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAction}
                    className="w-full bg-linear-to-r from-[#1A0B3B] to-indigo-900 dark:from-indigo-600 dark:to-blue-700 text-white font-bold py-4 lg:py-5 rounded-xl lg:rounded-2xl shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 lg:gap-3 text-sm"
                  >
                    <Zap size={18} className="fill-white" />
                    {activeTab === "add" ? "Add to Stack" : activeTab === "update" ? "Apply Changes" : "Remove Skill"}
                  </motion.button>
                </div>
              </div>

              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-3 transition-colors">
                    <LayoutGrid size={20} className="text-indigo-500" />
                    Your Professional Stack
                  </h3>
                  <div className="w-fit px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 text-[10px] font-black transition-colors">
                    {skills.length} TOTAL SKILLS
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <AnimatePresence mode="popLayout">
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm hover:border-indigo-200 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-default"
                      >
                        <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors">{skill}</span>
                        <button 
                          onClick={() => setSkillInput(skill)}
                          className="p-1 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-10 lg:mt-12">
          {[
            { title: "Market Insights", text: "Demand for 'Cloud Architecture' has risen 12%.", icon: <LineChart />, color: "emerald" },
            { title: "Career Pathways", text: "3 skills away from qualifying for Lead roles.", icon: <LayoutGrid />, color: "blue" },
            { title: "Skill Verification", text: "Earn trust badges via assessments.", icon: <ShieldCheck />, color: "indigo" },
          ].map((card, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className={`bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none transition-all ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4 lg:mb-6 bg-slate-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 transition-colors`}>
                {card.icon}
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors">{card.title}</h4>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.main>
      
      <footer className="py-8 md:py-12 border-t border-slate-100 dark:border-slate-800 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-[10px] md:text-sm transition-colors duration-300">
         <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  CareerGuide<span className="text-violet-600 dark:text-violet-400">X</span>
                </h2>
         <div className="flex gap-4 md:gap-8 font-medium text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Contact</a>
         </div>
      </footer>
    </div>
  );
}