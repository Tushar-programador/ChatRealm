import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";
import setupSocket from "./socket.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;
const DB_url = process.env.DATABASE_URL;


const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
mongoose
  .connect(DB_url)
  .then(() => {
    console.log("Database connected successfully to", DB_url);

    setupSocket(server); // Ensure socket setup is called after server starts

    console.log("Socket setup complete");
  })
  .catch((e) => {
    console.error("Database connection error:", e);
    process.exit(1); // Exit the process with failure code if DB connection fails
  });
