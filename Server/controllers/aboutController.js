import About from "../models/About.js";

// Get About content
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update or create About content (Admin only)
export const updateAbout = async (req, res) => {
  try {
    const { content } = req.body;
    let about = await About.findOne();

    if (!about) {
      about = await About.create({ content });
    } else {
      about.content = content;
      await about.save();
    }

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
