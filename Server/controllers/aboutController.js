import About from "../models/About.js";

// Get About content
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) return res.status(404).json({ message: "About section not found" });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update or create About content (Admin only)
export const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file?.path || req.body.image; // Cloudinary URL if file uploaded

    let about = await About.findOne();

    if (!about) {
      // Create new About
      about = await About.create({ content, image });
    } else {
      // Update existing About
      about.content = content || about.content;
      about.image = image || about.image;
      await about.save();
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
