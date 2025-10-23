import Experience from "../models/Experience.js";

// Get all experiences
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new experience
export const addExperience = async (req, res) => {
  try {
    const { company, role, duration, description } = req.body;
    const experience = await Experience.create({ company, role, duration, description });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update an experience
export const updateExperience = async (req, res) => {
  try {
    const { company, role, duration, description } = req.body;
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    experience.company = company;
    experience.role = role;
    experience.duration = duration;
    experience.description = description;
    await experience.save();

    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    await experience.deleteOne(); // ✅ Fixed
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

