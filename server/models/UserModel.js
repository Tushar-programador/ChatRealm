import { genSaltSync, hashSync } from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    firstName: {
      type: String,
      require: false,
    },
    lastName: {
      type: String,
      require: false,
    },
    profileImage: {
      type: String,
      require: false,
    },
    color: {
      type: Number,
      require: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
      default: null,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      required: false,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const salt = genSaltSync(10);
  this.password = hashSync(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
