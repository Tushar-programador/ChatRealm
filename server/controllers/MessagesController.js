export const getMessage = async (req, res) => {
  try {
    const user1 = req.user.userId;
    const user2 = req.body.id;
    if (!user1 || !user) {
      return res.status(400).send("Both userId  is required.");
    }
    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamps: true });

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).error(error.message);
  }
};
