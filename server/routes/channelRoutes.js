import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel, getChannels } from "../controllers/ChannelController.js";

const channelRouter = Router();

channelRouter.post("/create-channel", verifyToken, createChannel);
channelRouter.get("/get-channels", verifyToken, getChannels);

export default channelRouter;
