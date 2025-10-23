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
        const { name, image, issuer, date } = req.body;
        const certification = await Certification.create({ name, image, issuer, date });
        res.json(certification);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update a certification
export const updateCertification = async (req, res) => {
    try {
        console.log("req.body:", req.body);
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" });
        }
        const { name, image, issuer, date } = req.body;
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ message: "Certification not found" });

        // Update only provided fields
        if (name !== undefined) certification.name = name;
        if (image !== undefined) certification.image = image;
        if (issuer !== undefined) certification.issuer = issuer;
        if (date !== undefined) certification.date = date;

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

    await certification.deleteOne(); // ✅ Fixed
    res.json({ message: "Certification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};