import { useEffect, useState, useRef } from "react";
import api from "../server/api";
import toast from "react-hot-toast"; 
import NavBar from "../Components/NavBar";
import PageLoader from "../Components/PageLoad";
import { 
  FileText, 
  Settings, 
  BarChart3, 
  CloudUpload, 
  Trash2, 
  Edit3, 
  History, 
  Search, 
  Download, 
  Lightbulb,
  ChevronLeft,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export default function ResumePage() {
const [resume, setResume] = useState(null);
const [resumeName, setResumeName] = useState(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageLoad, setPageLoad] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

const getFileName = (path, originalName) => originalName || path?.split("/").pop() || "Resume_Document.pdf";


const fetchResume = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/user/resume", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setResume(res.data.resume);
    setResumeName(res.data.originalName);
  } catch {
    setResume(null);
    setResumeName(null);
  } finally {
    setPageLoad(false);
  }
};





  useEffect(() => {
    fetchResume();
  }, []);

const handleUpload = async (selectedFile) => {
  const fileToUpload = selectedFile || file;
  if (!fileToUpload) return toast.error("Select a resume file");
  if (fileToUpload.size > 5 * 1024 * 1024)
    return toast.error("File size must be less than 5MB");

  const formData = new FormData();
  formData.append("resume", fileToUpload);

  try {
    setUploading(true);
    setProgress(0);
    const token = localStorage.getItem("token");

    const res = await api.post("/user/resume/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        setProgress(Math.round((e.loaded * 100) / e.total));
      },
    });

    toast.success("Resume uploaded successfully");

 setResume(res.data.resume);
setResumeName(res.data.originalName);



    setFile(null);
  } catch {
    toast.error("Upload failed");
  } finally {
    setUploading(false);
  }
};


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to remove this resume?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete("/user/resume/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Resume removed");
      setResume(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      handleUpload(selected);
    }
  };

  return (
    // Updated: Background color for dark mode
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-['Inter'] transition-colors duration-300">
      {pageLoad && <PageLoader />}
      <NavBar />

      <div className="flex max-w-400 mx-auto">
        
        {/* ================= MOBILE OVERLAY ================= */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* ================= SIDEBAR ================= */}
        <aside className={`
          fixed inset-y-0 left-0 w-72 bg-[#1A0B3B] dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)]
        `}>
          <div className="p-6 flex items-center justify-between lg:hidden">
             <span className="font-black text-white text-xl tracking-tight">Menu</span>
             <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-white/60 hover:text-white rounded-full">
               <X size={24} />
             </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-6">
            <NavItem icon={<CloudUpload size={18} />} label="Resume Manager" active />
            <NavItem icon={<FileText size={18} />} label="My Documents" />
            <NavItem icon={<BarChart3 size={18} />} label="AI Insights" />
            <NavItem icon={<Settings size={18} />} label="Profile Settings" />
          </nav>

          <div className="p-6">
            <div className="bg-indigo-50/10 dark:bg-indigo-950/30 rounded-2xl p-5 border border-indigo-100/20">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={16} className="text-indigo-400" />
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Pro Status</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">Unlock unlimited resume versions and AI checks today.</p>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="w-full mt-6 py-3 rounded-xl text-white/60 bg-white/5 hover:bg-white/10 flex items-center justify-center gap-2 text-sm font-medium transition"
            >
              <ChevronLeft size={16} /> Back to Home
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0">
          
          {/* MOBILE TOGGLE */}
          <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center transition-colors">
             <h1 className="font-bold text-slate-900 dark:text-white">Resume Management</h1>
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
               <Menu size={20} />
             </button>
          </div>

          <div className="p-6 sm:p-8 lg:p-12">
            <header className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Resume Management</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                  Upload, analyze, and optimize your professional document.
                </p>
              </div>
              <button className="flex items-center gap-2 bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition active:scale-95">
                <History size={18} className="text-indigo-600 dark:text-indigo-400" /> View Version History
              </button>
            </header>

            <div className="grid grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="col-span-12 lg:col-span-5 space-y-8">
                
                {/* Upload Area Updated */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="bg-white dark:bg-slate-900 border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 rounded-4xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all group"
                >
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept=".pdf,.docx" />
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                    <CloudUpload size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Drag & Drop Resume</h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500 font-medium mt-1 mb-8">PDF or DOCX (Max 5MB)</p>
                  
                  <button className="bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl text-sm font-black hover:bg-indigo-700 dark:hover:bg-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95">
                    {uploading ? `Uploading ${progress}%...` : "Browse Local Files"}
                  </button>
                </div>

                {/* Active Document Details Updated */}
                {resume && (
                  <div className="bg-white dark:bg-slate-900 rounded-4xl p-8 shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all hover:shadow-md">
                    <div className="absolute top-0 right-0 p-5">
                      <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                    </div>
                    
                    <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Current Document</span>
                    <h4 className="text-xl font-black">
  {resumeName || "Resume.pdf"}
</h4>


                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <StatItem label="ATS Score" value="88%" />
                      <StatItem label="Keywords" value="14" />
                      <StatItem label="Readability" value="High" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300 transition-all">
                        <Edit3 size={16} /> Edit Details
                      </button>
                      <button 
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 border border-rose-100 dark:border-rose-900/30 text-rose-500 dark:text-rose-400 py-3 rounded-2xl text-sm font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                      >
                        <Trash2 size={16} /> Remove File
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Tips Section Updated */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 flex gap-4 shadow-sm dark:shadow-none">
                  <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 rounded-xl flex items-center justify-center shrink-0">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <span className="font-black text-slate-900 dark:text-white text-sm">AI Recommendation</span>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed font-medium">
                      Mentioning <span className="font-bold text-indigo-600 dark:text-indigo-400">quantifiable achievements</span> like "increased efficiency by 30%" can boost your profile visibility by 2x.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Document Preview Updated */}
              <div className="col-span-12 lg:col-span-7">
                <div className="flex justify-between items-center mb-6">
                  <h5 className="font-black text-slate-900 dark:text-white tracking-tight">Real-time Preview</h5>
                  <div className="flex bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-1">
                    <ToolBtn icon={<Search size={16} />} />
                    <ToolBtn icon={<Download size={16} />} />
                  </div>
                </div>

                <div className="bg-slate-200 dark:bg-slate-800 rounded-4xl p-6 lg:p-10 aspect-3/4 flex justify-center overflow-hidden border border-slate-300/50 dark:border-slate-700/50 shadow-inner">
                  {!resume ? (
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 transition-colors">
                       <div className="w-20 h-20 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 opacity-50">
                         <FileText size={40} />
                       </div>
                       <p className="font-bold">No document found</p>
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-white w-full h-full rounded-xl shadow-2xl overflow-hidden relative border border-white">
                  <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(resume)}&embedded=true`}
                 className="w-full h-full border-none"
                  title="Resume Preview"
                 />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
                <footer className="py-8 md:py-12 border-t border-slate-100 dark:border-slate-800 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-[10px] md:text-sm mt-12 transition-colors">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
                  CareerGuide<span className="text-violet-600 dark:text-violet-400">X</span>
                </h2>
                <div className="flex gap-4 md:gap-8 font-medium">
                  <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Privacy</a>
                  <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Terms</a>
                  <a href="#" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Contact</a>
                </div>
              </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
function NavItem({ icon, label, active = false }) {
  return (
    <div className={`
      flex items-center gap-4 px-4 py-3 lg:py-4 rounded-xl lg:rounded-2xl cursor-pointer transition-all
      ${active 
        ? 'bg-white dark:bg-indigo-600 text-[#6338F1] dark:text-white font-bold' 
        : 'text-white/60 dark:text-slate-400 hover:text-white hover:bg-white/5 dark:hover:bg-slate-800'}
    `}>
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="border-r border-gray-100 dark:border-slate-800 last:border-none pr-1 sm:pr-4">
      <div className="text-lg sm:text-2xl font-black text-[#1A0B3B] dark:text-white leading-none mb-1">{value}</div>
      <div className="text-[8px] sm:text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider">{label}</div>
    </div>
  );
}

function ToolBtn({ icon }) {
  return (
    <button className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 dark:text-slate-400 transition-colors">
      {icon}
    </button>
  );
}