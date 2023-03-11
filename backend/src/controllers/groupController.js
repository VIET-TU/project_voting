const Group = require("../models/Group");
const User = require("../models/User");

const groupController = {
  // GET ALL MEMEBERS
  getAllMemebers: async (req, res) => {
    try {
      const members = await Group.find();
      return res.status(200).json(members);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // add admin group when creat group
  addAdminMember: async (req, res) => {
    try {
      let member_group;
      if (req.body.user) {
        member_group = await Group.findOne({ user: req.body.user });
      }
      if (member_group) {
        member_group = "";
        return res.status(404).json("Members have existed ");
      }
      await User.findOneAndUpdate({ _id: req.body.user }, { role: 2 });
      const newMember = new Group(req.body);
      const saveMember = await newMember.save();
      return res.status(200).json(saveMember);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // ADD  MEMBER
  addMember: async (req, res) => {
    let member_group;
    try {
      if (req.body.user) {
        member_group = await Group.findOne({ user: req.body.user });
      }

      if (member_group) {
        member_group = "";
        return res.status(404).json("Members have existed ");
      }
      const newMember = new Group(req.body);
      const saveMember = await newMember.save();
      return res.status(200).json(saveMember);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // DELETE MEMBER
  deleteMember: async (req, res) => {
    try {
      const member = await Group.findById(req.params.id);
      await User.findOneAndUpdate({ _id: member?.user }, { role: 3 });
      await Group.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete member  success!");
    } catch (error) {
      json.status(500).json(error);
    }
  },

  // UPDATE MEMBER
  updateMember: async (req, res) => {
    try {
      const member = await Group.findById(req.params.id);
      if (member) {
        const user = await User.findById(member.user);
        if (user.role === 3) {
          await user.updateOne({ $set: { role: "2" } });
        } else if (user.role === 2) {
          const admin_group = await User.find({ role: 2 });
          if (admin_group.length < 2) {
            return res.status(200).json("Group admin less one !");
          }
          await user.updateOne({ $set: { role: "3" } });
        }
        return res.status(200).json("Update member  success!");
      } else {
        return res.status(200).json("Update member  faile!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // DELETE GROUP
  deleteGroup: async (req, res) => {
    try {
      await Group.deleteMany({});
      res.status(200).json("Delete group  success!");
    } catch (error) {
      json.status(500).json(error);
    }
  },
};

module.exports = groupController;
