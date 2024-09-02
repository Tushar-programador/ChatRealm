import express from "express";
import { getAllMessages } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
const Routes = express.Router()
const messageRouter = Routes


// Get all messages for a specific user
messageRouter.post('/get-messages',verifyToken, getAllMessages);
// localhost:8000/api/v1/message/get-messages
 export default messageRouter;