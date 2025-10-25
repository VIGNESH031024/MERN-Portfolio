import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  linkedin: { type: String }, // optional
});

export default mongoose.model("ContactInfo", contactInfoSchema);
