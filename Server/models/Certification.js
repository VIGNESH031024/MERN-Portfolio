import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Certificate title
  image: { type: String, required: true },       // URL of certificate image
  issuer: { type: String },                      // e.g., Coursera, SAP
  date: { type: String }                         // e.g., "June 2025" (optional)
}, { timestamps: true });

export default mongoose.model("Certification", certificationSchema);
