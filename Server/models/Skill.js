import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },        // e.g., React, Node.js
  category: { type: String },                    // e.g., Frontend, Backend, Tools
  level: { type: String },                       // e.g., Beginner, Intermediate, Expert
  logo: { type: String }                         // URL or path to the skill logo/image
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
