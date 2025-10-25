import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },        // Project name
  description: { type: String, required: true },  // Short description of project
  image: { type: String },                        // Project image URL
  skillsUsed: [{ type: String }],                // List of skills used in project
  from: { type: String },                         // Project start date (e.g., Jan 2025)
  to: { type: String },                           // Project end date (e.g., Mar 2025)
  githubLink: { type: String },                  // Optional GitHub link
  liveLink: { type: String }                      // Optional live demo link
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
