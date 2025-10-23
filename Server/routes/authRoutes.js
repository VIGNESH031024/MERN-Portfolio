import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);  // Optional: create admin
router.post("/login", login);        // Login admin

export default router;
