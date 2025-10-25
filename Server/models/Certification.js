import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Certificate title
  image: { type: String, required: true },       // Cloudinary URL of certificate image
  issuer: { type: String },                      // e.g., Coursera, SAP
  date: { type: String },                        // e.g., "June 2025"
  description: { type: String }                  // Short details about the certification
}, { timestamps: true });

export default mongoose.model("Certification", certificationSchema);

