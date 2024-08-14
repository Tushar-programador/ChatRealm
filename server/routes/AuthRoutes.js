import { Router } from "express";
import { signupController } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/register", signupController);

export default authRoutes;