import { Router } from "express";
import { SearchContactController } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactRoutes = Router();

contactRoutes.get("/search", verifyToken, SearchContactController);
export default contactRoutes;
