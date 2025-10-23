import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String },         // small about section
  profileImage: { type: String }         // URL of profile picture
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
