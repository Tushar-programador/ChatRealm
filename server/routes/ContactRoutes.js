import { Router } from "express";
import { SearchContactController } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, SearchContactController);
export default contactRoutes;
