import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
});
const User = mongoose.model("User",userSchema)
