import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, default: "" }, // small about section
  profileImage: { type: String, default: "" }, // URL of profile picture
  //bannerImage: { type: String, default: "" },  // optional hero background
  socialLinks: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" }
  }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
