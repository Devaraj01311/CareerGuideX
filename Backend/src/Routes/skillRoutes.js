const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { addSkills,updateSkill,deleteSkill } = require("../controllers/skillController");

router.post("/add", auth, addSkills);
router.put("/update", auth, updateSkill);
router.delete("/delete", auth, deleteSkill);

module.exports = router;
