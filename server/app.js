import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import authRouter from "./routes/AuthRoutes.js";
import contactRouter from "./routes/ContactRoutes.js";
import messageRouter from "./routes/MessageRoutes.js";
import channelRouter from "./routes/channelRoutes.js";

app.use("/uploads/profiles", express.static("/public/uploads"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/channel", channelRouter);
export { app };
