import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  content: { type: String, required: true }  // The 300-word about text
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
