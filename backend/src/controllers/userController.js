const User = require("../models/User");

const useController = {
  // GET ALL USER
  getAllUser: async (req, res) => {
    try {
      const users = await User.find({ role: { $not: { $eq: 1 } } });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // DELETE A USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json("Delete success!");
    } catch (error) {
      json.status(500).json(error);
    }
  },
};

module.exports = useController;
