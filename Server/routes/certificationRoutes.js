import express from "express";
import { getCertifications, addCertification, updateCertification, deleteCertification } from "../controllers/certificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCertifications);            // Public
router.post("/", addCertification);  // Admin only
router.put("/:id", updateCertification); // Admin only
router.delete("/:id", deleteCertification); // Admin only

export default router;
