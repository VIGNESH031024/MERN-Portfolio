import Profile from "../models/Profile.js";

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update/Create Profile (Admin only)
export const updateProfile = async (req, res) => {
  try {
    const { name, role, description, profileImage } = req.body;
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({ name, role, description, profileImage });
    } else {
      profile.name = name;
      profile.role = role;
      profile.description = description;
      profile.profileImage = profileImage;
      await profile.save();
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
