import Profile from "../models/Profile.js";

// Get profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add or update profile with Cloudinary image
export const updateProfile = async (req, res) => {
  try {
    const { name, role, description, linkedin, github } = req.body;

    // Use uploaded file if exists, else fallback to URL from body
    const profileImage = req.file?.path || req.body.profileImage;

    let profile = await Profile.findOne();
    if (profile) {
      // Update existing
      profile.name = name || profile.name;
      profile.role = role || profile.role;
      profile.description = description || profile.description;
      profile.profileImage = profileImage || profile.profileImage;

      profile.socialLinks = {
        linkedin: linkedin || profile.socialLinks?.linkedin || "",
        github: github || profile.socialLinks?.github || "",
      };

      await profile.save();
    } else {
      // Create new
      profile = await Profile.create({
        name,
        role,
        description,
        profileImage,
        socialLinks: {
          linkedin: linkedin || "",
          github: github || "",
        },
      });
    }

    res.json(profile);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
