const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { fetchSuggestedJobs,saveJob,getSavedJobs,deleteSavedJob } = require("../controllers/jobController");

router.get("/suggested", auth, fetchSuggestedJobs);

router.post("/save", auth, saveJob);
router.get("/saved", auth, getSavedJobs);
router.delete("/delete", auth, deleteSavedJob);

module.exports = router;
