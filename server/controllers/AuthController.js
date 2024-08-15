import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compareSync } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY);
};

export const registerController = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    if (!email || !password) {
      return res.json({
        message: "Email and password required",
      });
    }

    const user = await User.create({ email, password });

    res.cookie("auth", createToken(email, user._id), {
      httpOnly: true,
      expires: new Date(Date.now() + maxAge),
      profileSetup: user.profileSetup,
    });
     return res.json({
      message: "Register  successfully",
      user: {
        id: user.id,
        email: user.email,
        
      }});
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "Email and password required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    const auth = compareSync(password, user.password);
    if (!auth) {
      return res.status(403).json({ message: "Incorrect password" });
    }
    res
      .cookie("auth", createToken(user.email, user._id), {
        httpOnly: true,
        expires: new Date(Date.now() + maxAge),
        sameSite: "None", // or 'Lax'/'Strict' depending on your needs
        secure: true,
        profileSetup: user.profileSetup,
      })
      .status(200);
    return res.json({
      message: "Logged in successfully",
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firtName: user.firtName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
      },
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
};
