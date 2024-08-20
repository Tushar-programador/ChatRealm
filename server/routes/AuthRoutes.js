import { Router } from "express";
import {
  loginController,
  registerController,
  getUserInfo,
  updateUserController,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-user", verifyToken, updateUserController);
export default authRoutes;
