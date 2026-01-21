const User = require("../models/user");

exports.addSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Skills must be an array" });
    }

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Merge new skills with old ones, avoiding duplicates (case-insensitive)
    const existingSkillsLower = user.skills.map(s => s.toLowerCase());
    skills.forEach(skill => {
      if (!existingSkillsLower.includes(skill.toLowerCase())) {
        user.skills.push(skill);
      }
    });

    await user.save();

    res.json({
      message: "Skills added successfully",
      skills: user.skills
    });

  } catch (error) {
    console.error("Add Skills Error:", error);
    res.status(500).json({ message: "Failed to add skills" });
  }
};



// UPDATE a single skill
exports.updateSkill = async (req, res) => {
  try {
    const { oldSkill, newSkill } = req.body;

    if (!oldSkill || !newSkill) {
      return res.status(400).json({ message: "Both oldSkill and newSkill are required" });
    }

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.skills.findIndex(s => s.toLowerCase() === oldSkill.toLowerCase());
    if (index === -1) return res.status(404).json({ message: "Skill not found" });

    user.skills[index] = newSkill;
    await user.save();

    res.json({ message: "Skill updated successfully", skills: user.skills });
  } catch (error) {
    console.error("Update Skill Error:", error);
    res.status(500).json({ message: "Failed to update skill" });
  }
};

// DELETE a skill
exports.deleteSkill = async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newSkills = user.skills.filter(s => s.toLowerCase() !== skill.toLowerCase());
    if (newSkills.length === user.skills.length) {
      return res.status(404).json({ message: "Skill not found" });
    }

    user.skills = newSkills;
    await user.save();

    res.json({ message: "Skill deleted successfully", skills: user.skills });
  } catch (error) {
    console.error("Delete Skill Error:", error);
    res.status(500).json({ message: "Failed to delete skill" });
  }
};
