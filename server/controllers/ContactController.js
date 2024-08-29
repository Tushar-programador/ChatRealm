import User from "../models/UserModel.js";

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
