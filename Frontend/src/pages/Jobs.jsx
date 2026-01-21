import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../server/api";
import JobsSidebar from "../Components/JobSidebar";
import JobCard from "../Components/JobCard";
import NavBar from "../Components/NavBar";
import toast from "react-hot-toast";
import { useSearch } from "../context/SearchContext";
import { 
  SlidersHorizontal, 
  X, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  ArrowLeft 
} from "lucide-react";
import PageLoader from "../Components/PageLoad";

export default function Jobs() {
  const { search } = useSearch();
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeRole, setActiveRole] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  useEffect(() => {
    setVisibleCount(15);
  }, [search, activeRole]);

  const fetchJobs = async () => {
    try {
      setPageLoad(true);
      const res = await api.get("/jobs/suggested");
      setSkills(res.data.skills || []);
      setRoles(res.data.suggestedRoles || []);
      setJobs(res.data.jobs || []);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setPageLoad(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const res = await api.get("/jobs/saved");
      setSavedJobs(res.data || []);
    } catch {
      toast.error("Failed to load saved jobs");
    }
  };

  const saveJob = async (job) => {
    const exists = savedJobs.some(j => j.applyLink === job.applyLink);
    try {
      if (exists) {
        await api.delete("/jobs/delete", { data: { applyLink: job.applyLink } });
        setSavedJobs(prev => prev.filter(j => j.applyLink !== job.applyLink));
        toast.error("Job removed");
      } else {
        await api.post("/jobs/save", job);
        setSavedJobs(prev => [...prev, job]);
        toast.success("Job saved");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesRole = activeRole
      ? job.title.toLowerCase().includes(activeRole.toLowerCase())
      : true;
    const matchesSearch = search
      ? job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      : true;
    return matchesRole && matchesSearch;
  });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 15);
  };

  return (
    <>
      <NavBar />
      {pageLoad && <PageLoader />}
      <div className="bg-blue-50 dark:bg-slate-950 min-h-screen font-['Inter'] transition-colors duration-300">
        <div className="mx-auto max-w-360 px-6 py-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-4">
              <button 
                onClick={() => navigate("/")} 
                className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-indigo-200 dark:group-hover:border-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-all">
                    <ArrowLeft size={16} />
                </div>
                Back to Home
              </button>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1 transition-colors">
                  {activeRole || "Software Engineer"} Roles
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold transition-colors">
                  Showing {Math.min(visibleCount, filteredJobs.length)} of {filteredJobs.length} matching results
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm shadow-sm dark:text-slate-200 transition-all"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
              
              <div className="hidden sm:flex p-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-indigo-600 dark:text-indigo-400 shadow-inner">
                  <LayoutGrid size={20} />
                </button>
                <button className="p-2 text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:gap-10">
            <aside className="hidden lg:block w-60 shrink-0 sticky top-24 h-fit">
              <JobsSidebar
                skills={skills}
                roles={roles}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
              />
            </aside>

            <main className="flex-1">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredJobs.slice(0, visibleCount).map((job, i) => (
                  <JobCard
                    key={i}
                    job={job}
                    onSave={saveJob}
                    isSaved={savedJobs.some(j => j.applyLink === job.applyLink)}
                  />
                ))}
              </div>

              {filteredJobs.length > visibleCount && (
                <button 
                  onClick={handleLoadMore}
                  className="w-full mt-10 py-5 border-2 border-dashed bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl text-slate-800 dark:text-slate-200 font-bold hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center justify-center gap-3 group shadow-sm dark:shadow-none"
                >
                  <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                  Show More Opportunities
                </button>
              )}

              {filteredJobs.length === 0 && !pageLoad && (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 mt-6 transition-colors">
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No jobs matching your filters were found.</p>
                </div>
              )}
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
            </main>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR DRAWER Updated for Dark Mode */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          />
          <div className="fixed top-0 left-0 h-full w-75 bg-slate-50 dark:bg-slate-900 z-50 shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-xl tracking-tight text-slate-900 dark:text-white transition-colors">Filters</h3>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all">
                <X size={24} className="text-slate-900 dark:text-white transition-colors"/>
              </button>
            </div>
            <JobsSidebar
              skills={skills}
              roles={roles}
              activeRole={activeRole}
              setActiveRole={setActiveRole}
            />
          </div>
        </>
      )}
    </>
  );
}