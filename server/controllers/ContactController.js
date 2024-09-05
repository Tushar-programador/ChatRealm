import Message from "../models/MessageModel.js";
import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const SearchContactController = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ message: "Search text is required" });
    }

    const sanitizeSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(sanitizeSearch, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.user.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserContactsController = async (req, res) => {
  try {
    let userID = req.user.userId
    console.log(req.user.userId);
    if (!userID) {
      return res.status(404).json({ message: "User not found." });
    }
    userID = new mongoose.Types.ObjectId(userID);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userID }, { recipient: userID }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userID] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          contactId: "$_id",
          lastMessage: "$lastMessage",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          email: "$contactInfo.email",
          profileImage: "$contactInfo.profileImage",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { "lastMessage.timestamp": -1 },
      },
    ]);

    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllContactsController = async (req, res) => {
  try {
    const userID = req.user.userId; // Get the current user's ID
    const users = await User.find(
      { _id: { $ne: userID } },
      "firstName lastName _id email"
    ); // Find all users except the current user

    // Map over the users to create the contacts array
    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email, // Set the label to full name or email
      value: user._id, // Set the value to the user's ID
    }));

    return res.status(200).json({contacts}); // Return the contacts as a JSON response
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Handle any errors
  }
};

