
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    company: {
      type: String,
      required: true
    },

    location: {
      type: String
    },

    jobType: {
      type: String, 
      default: "Internship"
    },

    applyLink: {
      type: String,
      required: true
    },

    source: {
      type: String, 
      default: "LinkedIn"
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Job", jobSchema);
