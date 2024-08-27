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

import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";

app.use("/uploads/profiles", express.static("/public/uploads"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/contact", contactRoutes);
export { app };
