import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const userID = req.user.userId;
    if (!name || !members) {
      return res.status(400).json({ message: "Name and member required" });
    }
    const admin = await User.findById(userID);
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }
    const validMembers = await User.find({ _id: { $in: members } });
    if (validMembers.length !== members.length) {
      return res.status(400).json({ message: "Invalid member" });
    }
    const newChannel = await Channel.create({
      name,
      admin: admin._id,
      members,
    });
    console.log("Channel created");
    return res.status(201).json({ channel: newChannel });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getChannels = async (req, res, next) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.user.userId);

    const channels = await Channel.find({
      $or: [{ admin: userID }, { members: userID }],
    }).sort({ updatedAt: -1 });

    return res.status(200).json({ channels });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
