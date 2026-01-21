module.exports = function mapRoles(skills) {
  const roles = new Set();

  // Convert all skills to lowercase for comparison
  const s = skills.map(skill => skill.toLowerCase());

  /** ================== TECH / IT ================== **/
  // Full Stack Developer
  if (
    (s.includes("react") || s.includes("angular") || s.includes("vue") || s.includes("svelte") || s.includes("next.js") || s.includes("nuxt.js")) &&
    (s.includes("node.js") || s.includes("express") || s.includes("spring boot") || s.includes(".net") || s.includes("django") || s.includes("flask")) &&
    (s.includes("mongodb") || s.includes("mysql") || s.includes("postgresql") || s.includes("oracle db"))
  ) {
    roles.add("Full Stack Developer");
  }

  // Frontend Developer
  if (s.includes("react") || s.includes("angular") || s.includes("vue") || s.includes("html") || s.includes("css") || s.includes("tailwind") || s.includes("bootstrap") || s.includes("material ui")) {
    roles.add("Frontend Developer");
  }

  // Backend Developer
  if (s.includes("node.js") || s.includes("express") || s.includes("spring boot") || s.includes("java") || s.includes("python") || s.includes(".net") || s.includes("php") || s.includes("django") || s.includes("flask")) {
    roles.add("Backend Developer");
  }

  // Java Developer
  if (s.includes("java") && s.includes("spring boot")) {
    roles.add("Java Developer");
  }

  // Python Developer
  if (s.includes("python") && !s.includes("sql") && !s.includes("pandas")) {
    roles.add("Python Developer");
  }

  // Data Analyst / Data Scientist
  if (
    (s.includes("python") || s.includes("r")) &&
    (s.includes("sql") || s.includes("excel") || s.includes("pandas") || s.includes("numpy") || s.includes("matplotlib") || s.includes("tableau") || s.includes("power bi"))
  ) {
    roles.add("Data Analyst");
    roles.add("Data Scientist");
  }

  // Machine Learning / AI
  if (
    s.includes("tensorflow") || s.includes("pytorch") || s.includes("scikit-learn") || s.includes("nlp") || s.includes("computer vision") || s.includes("ml") || s.includes("ai")
  ) {
    roles.add("Machine Learning Engineer");
    roles.add("AI Engineer");
  }

  // DevOps Engineer
  if (s.includes("docker") || s.includes("kubernetes") || s.includes("jenkins") || s.includes("ci/cd")) {
    roles.add("DevOps Engineer");
  }

  // Cloud Engineer
  if (s.includes("aws") || s.includes("azure") || s.includes("gcp")) {
    roles.add("Cloud Engineer");
  }

  // Cybersecurity
  if (s.includes("ethical hacking") || s.includes("network security") || s.includes("penetration testing") || s.includes("ccna")) {
    roles.add("Cybersecurity Engineer");
  }

  // Software Engineer (generic)
  if (s.includes("java") || s.includes("python") || s.includes("c++") || s.includes("c") || s.includes("javascript") || s.includes("php") || s.includes("ruby")) {
    roles.add("Software Engineer");
  }

  /** ================== MANAGEMENT / COMMERCE ================== **/
  if (s.includes("financial analysis") || s.includes("accounting") || s.includes("gst") || s.includes("tally") || s.includes("audit") || s.includes("quickbooks")) {
    roles.add("Accountant");
    roles.add("Finance Analyst");
  }

  if (s.includes("project management") || s.includes("agile") || s.includes("scrum") || s.includes("kanban") || s.includes("pmp")) {
    roles.add("Project Manager");
  }

  if (s.includes("marketing") || s.includes("digital marketing") || s.includes("seo") || s.includes("sem") || s.includes("social media marketing") || s.includes("google ads")) {
    roles.add("Marketing Executive");
    roles.add("Digital Marketing Specialist");
  }

  if (s.includes("sales") || s.includes("crm") || s.includes("customer relationship management") || s.includes("market research")) {
    roles.add("Sales Executive");
    roles.add("Business Analyst");
  }

  if (s.includes("hr") || s.includes("talent acquisition") || s.includes("payroll") || s.includes("performance management")) {
    roles.add("HR Executive");
  }

  /** ================== ENGINEERING / CORE ================== **/
  if (s.includes("cad") || s.includes("solidworks") || s.includes("autocad") || s.includes("catia") || s.includes("creo")) {
    roles.add("Design Engineer");
  }

  if (s.includes("matlab") || s.includes("simulink") || s.includes("plc") || s.includes("embedded systems") || s.includes("iot") || s.includes("robotics")) {
    roles.add("Embedded / Robotics Engineer");
    roles.add("IoT Engineer");
  }

  if (s.includes("thermodynamics") || s.includes("fluid mechanics") || s.includes("structural analysis") || s.includes("construction management")) {
    roles.add("Mechanical / Civil Engineer");
  }

  if (s.includes("power systems") || s.includes("control systems") || s.includes("circuit design") || s.includes("electrical engineering")) {
    roles.add("Electrical Engineer");
  }

  /** ================== CREATIVE / DESIGN / CONTENT ================== **/
  if (s.includes("photoshop") || s.includes("illustrator") || s.includes("figma") || s.includes("canva")) {
    roles.add("Graphic Designer");
    roles.add("UI/UX Designer");
  }

  if (s.includes("video editing") || s.includes("premiere pro") || s.includes("after effects") || s.includes("final cut pro")) {
    roles.add("Video Editor");
    roles.add("Content Creator");
  }

  if (s.includes("content writing") || s.includes("copywriting") || s.includes("blogging") || s.includes("seo writing")) {
    roles.add("Content Writer");
    roles.add("Copywriter");
  }

  /** ================== GENERAL / SOFT SKILLS ================== **/
  if (s.includes("communication") || s.includes("public speaking") || s.includes("soft skills")) {
    roles.add("Customer Support");
    roles.add("Business Analyst");
  }

  /** ================== MEDICAL / HEALTHCARE ================== **/

// Doctors / Medical Practitioners
if (s.includes("mbbs") || s.includes("physician") || s.includes("general medicine") || s.includes("surgery") || s.includes("cardiology") || s.includes("pediatrics")) {
    roles.add("Doctor / Medical Practitioner");
}

// Dentists
if (s.includes("bds") || s.includes("dentistry") || s.includes("oral surgery") || s.includes("orthodontics")) {
    roles.add("Dentist");
}

// Nurses
if (s.includes("nursing") || s.includes("rn") || s.includes("patient care") || s.includes("icu") || s.includes("pediatric nursing")) {
    roles.add("Nurse");
}

// Pharmacists
if (s.includes("pharmacy") || s.includes("pharmacology") || s.includes("dispensing") || s.includes("clinical pharmacy") || s.includes("drug safety")) {
    roles.add("Pharmacist");
}

// Physiotherapists / Rehab
if (s.includes("physiotherapy") || s.includes("rehabilitation") || s.includes("occupational therapy") || s.includes("sports therapy")) {
    roles.add("Physiotherapist / Rehab Specialist");
}

// Medical Laboratory / Diagnostics
if (s.includes("biotechnology") || s.includes("biochemistry") || s.includes("microbiology") || s.includes("pathology") || s.includes("lab technician") || s.includes("clinical research")) {
    roles.add("Medical Lab Technician");
    roles.add("Clinical Researcher");
}

// Public Health / Healthcare Management
if (s.includes("public health") || s.includes("epidemiology") || s.includes("healthcare management") || s.includes("hospital administration")) {
    roles.add("Public Health Specialist");
    roles.add("Healthcare Administrator");
}

// Diet / Nutrition
if (s.includes("nutrition") || s.includes("dietician") || s.includes("food science") || s.includes("clinical nutrition")) {
    roles.add("Dietitian / Nutritionist");
}

// Medical Assistants / Technicians
if (s.includes("medical assistant") || s.includes("radiology technician") || s.includes("x-ray") || s.includes("ultrasound") || s.includes("lab technician")) {
    roles.add("Medical Assistant / Technician");
}

// Mental Health / Therapy
if (s.includes("psychology") || s.includes("counseling") || s.includes("mental health") || s.includes("clinical psychology") || s.includes("psychiatry")) {
    roles.add("Psychologist / Therapist");
}

// Nursing Assistants / Caregivers
if (s.includes("caregiver") || s.includes("home care") || s.includes("elderly care")) {
    roles.add("Caregiver / Nursing Assistant");
}


  return Array.from(roles);
};
