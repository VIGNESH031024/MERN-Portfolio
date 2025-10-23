import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Project name
  description: { type: String },                  // Short description of project
  image: { type: String },                        // Project image URL
  skillsUsed: [{ type: String }],                // List of skills used in project
  githubLink: { type: String },                  // Optional GitHub link
  liveDemo: { type: String }                      // Optional live demo link
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
