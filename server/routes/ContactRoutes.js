import { Router } from "express";
import {
    getAllContactsController,
  getUserContactsController,
  SearchContactController,
} from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, SearchContactController);
contactRoutes.get("/get-contact", verifyToken, getUserContactsController);
contactRoutes.get("/get-all-contacts", verifyToken, getAllContactsController)
export default contactRoutes;
