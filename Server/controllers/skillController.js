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

// Add new skill (with logo upload)
export const addSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;
    const logo = req.file?.path; // Cloudinary URL

    const skill = await Skill.create({
      name,
      category,
      level,
      logo
    });

    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update skill (with optional logo update)
export const updateSkill = async (req, res) => {
  try {
    const { name, category, level } = req.body;
    const logo = req.file?.path;

    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    skill.name = name || skill.name;
    skill.category = category || skill.category;
    skill.level = level || skill.level;
    if (logo) skill.logo = logo;

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    await skill.deleteOne();
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
