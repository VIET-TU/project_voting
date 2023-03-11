const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  // id
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  phone: String,
  address: String,
});

const Group = new mongoose.model("Group", groupSchema);

module.exports = Group;
