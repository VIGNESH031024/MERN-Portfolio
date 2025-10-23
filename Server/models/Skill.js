import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },        // e.g., React, Node.js
  category: { type: String },                    // e.g., Frontend, Backend, Tools
  level: { type: String }                        // e.g., Beginner, Intermediate, Expert
}, { timestamps: true });

export default mongoose.model("Skill", skillSchema);
