import Skill from "../models/Skill.js";

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new skill
export const addSkill = async (req, res) => {
  try {
    const { name, category, level, logo } = req.body; // include logo
    const skill = await Skill.create({ name, category, level, logo });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { name, category, level, logo } = req.body; // include logo
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    skill.name = name;
    skill.category = category;
    skill.level = level;
    skill.logo = logo; // update logo
    await skill.save();

    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
