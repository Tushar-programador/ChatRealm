import { Router } from "express";
import {
  loginController,
  registerController,
  getUserInfo,
  updateUserController,
  uploadProfileController,
  deleteProfileController,
  logoutController,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-user", verifyToken, updateUserController);
authRoutes.post("/upload-profile", verifyToken,upload.single("profileImage"),uploadProfileController);
authRoutes.delete("/delete-profile",verifyToken,deleteProfileController);
authRoutes.post("/logout",logoutController);

export default authRoutes;
