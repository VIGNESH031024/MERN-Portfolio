import express from "express";
import { getProjects, addProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProjects);            // Public
router.post("/", addProject);   // Admin only
router.put("/:id", updateProject);   // Admin only
router.delete("/:id", deleteProject); // Admin only

export default router;
