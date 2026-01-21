const axios = require("axios");
const User = require("../models/user");
const mapRoles = require("../utils/roleMapper");
const Job = require("../models/job");

/* ================= ADZUNA ================= */
const fetchAdzunaJobs = async (role) => {
  try {
    const res = await axios.get(
      "https://api.adzuna.com/v1/api/jobs/in/search/1",
      {
        params: {
          app_id: process.env.ADZUNA_APP_ID,
          app_key: process.env.ADZUNA_API_KEY,
          what: role,
          results_per_page: 20,
        },
      }
    );

    const jobs = res.data.results || [];
    console.log(`✅ Adzuna returned ${jobs.length} jobs for ${role}`);

    return jobs.map((job) => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      jobType: job.title.toLowerCase().includes("intern") ? "Internship" : "Full-Time",
      applyLink: job.redirect_url,
      companyLogo: job.company?.logo_url || null,
      source: "Adzuna",
    }));
  } catch (err) {
    console.warn(`Adzuna failed for: ${role}`, err.message);
    return [];
  }
};

/* ================= REMOTIVE ================= */
const fetchRemotiveJobs = async (role) => {
  try {
    const res = await axios.get(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(role)}`
    );

    const jobs = res.data.jobs || [];
    console.log(`✅ Remotive returned ${jobs.length} jobs for ${role}`);

    return jobs.map((job) => ({
      title: job.title,
      company: job.company_name,
      location: job.candidate_required_location,
      jobType: job.job_type.toLowerCase().includes("intern") ? "Internship" : "Full-Time",
      applyLink: job.url,
      companyLogo: job.company_logo || null,
      source: "Remotive",
    }));
  } catch (err) {
    console.warn(`Remotive failed for: ${role}`, err.message);
    return [];
  }
};

/* ================= CONTROLLER ================= */
exports.fetchSuggestedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const roles = mapRoles(user.skills);
    let jobResults = [];
    const seen = new Set();

    console.log("User Skills:", user.skills);
    console.log("Suggested Roles:", roles, "\n");

    for (const role of roles) {
      console.log(`🔹 Fetching jobs for role: ${role}`);

      // LinkedIn
      try {
        const response = await axios.get(
          "https://linkedin-job-search-api.p.rapidapi.com/active-jb-24h",
          {
            params: { title_filter: role, limit: 10 },
            headers: {
              "x-rapidapi-key": process.env.LINKEDIN_API_KEY,
              "x-rapidapi-host": "linkedin-job-search-api.p.rapidapi.com",
            },
          }
        );

        if (response.data?.length) {
          response.data.forEach((job) => {
            const key = `${job.job_title}-${job.company_name}`;
            if (!seen.has(key)) {
              jobResults.push({
                title: job.job_title,
                company: job.company_name || "N/A",
                location: job.job_location || "N/A",
                jobType: job.job_type?.includes("INTERNSHIP") ? "Internship" : "Full-Time",
                applyLink: job.job_apply_link,
                companyLogo: job.company_logo || null, // LinkedIn company logo
                source: "LinkedIn",
              });
              seen.add(key);
            }
          });
        }
      } catch (err) {
        console.log("LinkedIn skipped (quota/limit)");
      }

      // Adzuna
      const adzunaJobs = await fetchAdzunaJobs(role);
      adzunaJobs.forEach((job) => {
        const key = `${job.title}-${job.company}`;
        if (!seen.has(key)) {
          jobResults.push(job);
          seen.add(key);
        }
      });

      // Remotive
      const remotiveJobs = await fetchRemotiveJobs(role);
      remotiveJobs.forEach((job) => {
        const key = `${job.title}-${job.company}`;
        if (!seen.has(key)) {
          jobResults.push(job);
          seen.add(key);
        }
      });

      console.log(`Total jobs so far: ${jobResults.length}\n`);
    }

    console.log("Total jobs fetched:", jobResults.length);
    res.json({
      skills: user.skills,
      suggestedRoles: roles,
      jobs: jobResults,
    });
  } catch (err) {
    console.error("Job Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};




/**
 * SAVE JOB
 * POST /jobs/save
 */
exports.saveJob = async (req, res) => {
  try {
    const { applyLink } = req.body;

    // prevent duplicate save
    const existingJob = await Job.findOne({ applyLink });

    if (existingJob) {
      return res.status(200).json({
        message: "Job already saved"
      });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

/**
 * GET SAVED JOBS
 * GET /jobs/saved
 */
exports.getSavedJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

/**
 * DELETE SAVED JOB
 * DELETE /jobs/save
 */
exports.deleteSavedJob = async (req, res) => {
  try {
    const { applyLink } = req.body;

    await Job.findOneAndDelete({ applyLink });

    res.status(200).json({
      message: "Job removed from saved"
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};
