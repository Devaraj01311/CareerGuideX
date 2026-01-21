export function normalizeLinkedInJob(job) {
  const employmentTypes = Array.isArray(job.jobType || job.employment_type)
    ? (job.jobType || job.employment_type)
    : [];

  const title = job.title || job.job_title || "Unknown Role";

  const isInternship =
    title.toLowerCase().includes("intern") ||
    employmentTypes.includes("INTERN");

  return {
    title,

    company:
      job.company ||
      job.company_name ||
      job.organization ||
      "Company Not Disclosed",

    location:
      job.location ||
      job.job_location ||
      job.candidate_required_location ||
      "Remote / Not Specified",

    jobType: isInternship
      ? "Internship"
      : employmentTypes.includes("CONTRACTOR")
      ? "Contract"
      : employmentTypes.includes("PART_TIME")
      ? "Part-Time"
      : "Full-Time",

    applyLink:
      job.applyLink ||
      job.apply_url ||
      job.job_apply_link ||
      "https://www.linkedin.com/jobs",

    source: "LinkedIn"
  };
}
