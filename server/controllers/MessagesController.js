import Message from "../models/MessageModel.js";

export const getAllMessages = async (req, res) => {
  try {
    const user1 = req.user.userId;
    const user2 = req.body.id;
    if (!user1 || !user2) {
      return res.status(400).send("Both userId  is required.");
    }
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamps: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
