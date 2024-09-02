import { Router } from "express";
import { getContactsController, SearchContactController , } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, SearchContactController);
contactRoutes.get("/get-contact", verifyToken, getContactsController);
export default contactRoutes;
