import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY);
};
export const signupController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Email and password reauired",
      });
    }
    const user = await User.create({ email, password });
    res.cookie("user", createToken(user.email, user._id), {
      httpOnly: true,
      expires: new Date(Date.now() + maxAge),
      profileSetup: user.profileSetup,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
