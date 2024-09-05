import { Router } from "express";
import {
  loginController,
  registerController,
  getUserInfo,
  updateUserController,
  uploadProfileController,
  deleteProfileController,
  logoutController,
  forgetPassword,
  resetPasswordController,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/user-info", verifyToken, getUserInfo);
authRouter.post("/update-user", verifyToken, updateUserController);
authRouter.post(
  "/upload-profile",
  verifyToken,
  upload.single("profileImage"),
  uploadProfileController
);
authRouter.delete("/delete-profile", verifyToken, deleteProfileController);
authRouter.post("/logout", logoutController);

// Forget Password
authRouter.put("/reset-password/:resetToken", resetPasswordController);

authRouter.post("/forgot-password", forgetPassword);

export default authRouter;
