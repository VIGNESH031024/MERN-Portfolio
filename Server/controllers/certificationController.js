import Certification from "../models/Certification.js";

// Get all certifications
export const getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find();
    res.json(certifications);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add a new certification
export const addCertification = async (req, res) => {
  try {
    const image = req.file?.path; // multer + Cloudinary file path

    if (!image) return res.status(400).json({ message: "Image is required" });

    const { name, issuer, date, description } = req.body;

    const certification = await Certification.create({
      name,
      image,
      issuer,
      date,
      description,
    });

    res.json(certification);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a certification
export const updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: "Certification not found" });

    const image = req.file?.path; // optional new file
    const { name, issuer, date, description } = req.body;

    if (name) certification.name = name;
       if (image) certification.image = image;
    if (issuer) certification.issuer = issuer;
    if (date) certification.date = date;
    if (description) certification.description = description;
 

    await certification.save();
    res.json(certification);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a certification
export const deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) return res.status(404).json({ message: "Certification not found" });

    await certification.deleteOne();
    res.json({ message: "Certification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
