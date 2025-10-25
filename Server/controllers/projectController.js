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

// Add a new project (with optional image upload)
export const addProject = async (req, res) => {
  try {
    // Handle skills: accept array or comma-separated string
    let skillsUsed = [];
    if (req.body.skillsUsed) {
      if (typeof req.body.skillsUsed === "string") {
        // Try parsing JSON array, fallback to comma split
        try {
          skillsUsed = JSON.parse(req.body.skillsUsed);
        } catch {
          skillsUsed = req.body.skillsUsed.split(",").map(s => s.trim());
        }
      } else if (Array.isArray(req.body.skillsUsed)) {
        skillsUsed = req.body.skillsUsed;
      }
    }

    const image = req.file?.path || req.body.image;

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      image,
      skillsUsed,
      githubLink: req.body.githubLink || "",
      liveDemo: req.body.liveDemo || "",
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a project (with optional image update)
export const updateProject = async (req, res) => {
  try {
    const { title, description, skillsUsed, githubLink, liveDemo } = req.body;
    const image = req.file?.path;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.title = title || project.title;
    project.description = description || project.description;

    if (skillsUsed) {
      if (typeof skillsUsed === "string") {
        try {
          project.skillsUsed = JSON.parse(skillsUsed);
        } catch {
          project.skillsUsed = skillsUsed.split(",").map(s => s.trim());
        }
      } else if (Array.isArray(skillsUsed)) {
        project.skillsUsed = skillsUsed;
      }
    }

    project.githubLink = githubLink || project.githubLink;
    project.liveDemo = liveDemo || project.liveDemo;
    if (image) project.image = image;

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

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
