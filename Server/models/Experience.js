import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String },              // e.g., SAP Labs
  role: { type: String, required: true }, // Job title
  duration: { type: String, required: true }, // e.g., "Jan 2023 – May 2024"
  description: { type: String }           // Work details / responsibilities
}, { timestamps: true });

export default mongoose.model("Experience", experienceSchema);
