import React, { useEffect, useState } from "react";
import api from "../server/api";
import JobCard from "../Components/JobCard";
import NavBar from "../Components/NavBar"; 
import toast from "react-hot-toast";
import { useSearch } from "../context/SearchContext";
import PageLoader from "../Components/PageLoad";
import { Trash2, Compass, ChevronDown, Clock, Banknote, MapPin } from "lucide-react";

export default function SavedJobs() {
  const { search } = useSearch();
  const [savedJobs, setSavedJobs] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeSort, setActiveSort] = useState("Date Added");

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setPageLoad(true);
      const res = await api.get("/jobs/saved");
      setSavedJobs(res.data);
    } catch {
      toast.error("Failed to load saved jobs");
    } finally {
      setPageLoad(false);
    }
  };

  const filteredJobs = savedJobs
    .filter(job => 
      !search || 
      job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (activeSort === "Salary: High to Low") {
        const getNum = (s) => parseInt(s?.replace(/[^0-9]/g, "")) || 0;
        return getNum(b.salary) - getNum(a.salary);
      }
      return 0; 
    });

  const jobsToShow = filteredJobs.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-['Inter'] text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />
      {pageLoad && <PageLoader />}

      <main className="max-w-7xl mx-auto px-6 py-10">
   
        <nav className="flex text-sm text-slate-400 dark:text-slate-500 mb-8 items-center gap-2 font-medium">
          <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</span> 
          <span className="text-[10px]">›</span> 
          <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Jobs</span> 
          <span className="text-[10px]">›</span>
          <span className="text-slate-900 dark:text-slate-200 font-semibold tracking-tight">Saved Jobs</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2 leading-tight">Saved Jobs</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              You have {filteredJobs.length} opportunities pinned to your shortlist.
            </p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <Trash2 size={18} className="text-slate-400 dark:text-slate-500" /> Clear All
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#1A0B3B] to-indigo-900 dark:from-indigo-600 dark:to-blue-700 text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-indigo-100 dark:shadow-none">
              <Compass size={18} /> Browse More
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 mb-10 py-6 border-y border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mr-2">SORT BY:</span>
          
          {["Date Added", "Closing Soon", "Salary: High to Low", "Remote Only"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveSort(filter)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeSort === filter 
                ? "bg-[#f0edff] dark:bg-indigo-900/40 text-[#6344f9] dark:text-indigo-400" 
                : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {filter} 
              {filter === "Date Added" && <ChevronDown size={14} />}
              {filter === "Closing Soon" && <Clock size={16} className="text-slate-400 dark:text-slate-500" />}
              {filter === "Salary: High to Low" && <Banknote size={16} className="text-slate-400 dark:text-slate-500" />}
              {filter === "Remote Only" && <MapPin size={16} className="text-slate-400 dark:text-slate-500" />}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {jobsToShow.map((job, idx) => (
            <JobCard key={idx} job={job} onSave={() => {}} isSaved={true} />
          ))}
        </div>

        {visibleCount < filteredJobs.length && (
          <div className="flex flex-col items-center gap-4 py-8">
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="px-12 py-4 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl text-slate-900 dark:text-white font-extralight text-lg hover:border-[#6344f9] dark:hover:border-indigo-500 hover:text-[#6344f9] dark:hover:text-indigo-400 transition-all shadow-sm"
            >
              Load More Saved Jobs
            </button>
            <p className="text-slate-400 dark:text-slate-500 text-sm italic font-medium">
              Showing {jobsToShow.length} of {filteredJobs.length} jobs
            </p>
          </div>
        )}
      </main>

      <footer className="py-8 md:py-12 border-t border-slate-100 dark:border-slate-800 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-[10px] md:text-sm transition-colors">
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