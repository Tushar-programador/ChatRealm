import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compareSync } from "bcrypt";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import cloudinary from "cloudinary";
import crypto from "crypto";
import nodemailer from "nodemailer";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY);
};

export const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    const user = await User.findById(userID).populate();
    if (!user) return res.status(404).send("User not found");
    console.log(user);
    return res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
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
    console.log(1);

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
    ).select("-password");

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

export const deleteProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const imageUrl = user.profileImage;

    if (imageUrl) {
      await cloudinary.uploader.destroy(imageUrl);

      // Remove the image URL from the user's profile
      user.profileImage = null;
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting profile image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting profile image",
    });
  }
};

export const uploadProfileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload the file to Cloudinary
    const result = await uploadOnCloudinary(req.file.path);

    if (!result) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    const imageUrl = result.secure_url;

    const updateResult = await User.findByIdAndUpdate(
      req.user.userId, // Make sure this matches your actual user ID field
      { profileImage: imageUrl },
      { new: true } // Return the updated document
    );

    if (!updateResult) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(imageUrl);
    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading profile image",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("auth");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const resetPasswordController = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    //
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const forgetPassword = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // Send reset link via email
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset Request",
      text: `You have requested a password reset. Please make a put request to: \n\n ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
