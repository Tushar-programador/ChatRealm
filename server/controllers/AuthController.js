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
    console.log("succefully registered");
    return res.status(201).json({
      message: "Register  successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res, next) => {
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
      .status(201);
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

export const getUserInfo = async (req, res) => {
  try {
    const userID = req.user.userId;
    const user = await User.findById(userID);
    if (!user) return res.status(404).send("User not found");

    return res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      color: user.color,
      profileSetup: user.profileSetup,
    });
  } catch (error) {
    console.error("Error getting user info", error);
    return null;
  }
};

export const updateUserController = async (req, res) => {
  try {
    const userID = req.user.userId;

    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName || color === undefined) {
      return res
        .status(400)
        .json({ message: "First name, last name, and color are required" });
    }

    const user = await User.findByIdAndUpdate(
      userID,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error("Error updating user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
