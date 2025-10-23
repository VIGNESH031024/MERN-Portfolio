import Project from "../models/Project.js";

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { title, description, image, skillsUsed, githubLink, liveDemo } = req.body;
    const project = await Project.create({ title, description, image, skillsUsed, githubLink, liveDemo });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { title, description, image, skillsUsed, githubLink, liveDemo } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title;
    project.description = description;
    project.image = image;
    project.skillsUsed = skillsUsed;
    project.githubLink = githubLink;
    project.liveDemo = liveDemo;
    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne(); // ✅ Fixed
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

