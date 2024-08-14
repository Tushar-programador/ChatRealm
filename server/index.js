import dotenv from "dotenv";
import { app } from "./app.js";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;
const DB_url = process.env.DATABASE_URL;

mongoose
  .connect(DB_url)
  .then(() => {
    console.log("Db conncted successfull ",DB_url);
    app.listen(port, () => {
      console.log(`server started at port number ${port}`);
    });
  })
  .catch((e) => console.log("DB Error ", e));
