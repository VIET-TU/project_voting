/**
 * id, username, password, email, firstname, lastname, phone, role, passowrd
 */

const moogoose = require("mongoose");

const userSchema = new moogoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: String,
    firstname: String,
    lastname: String,
    phoneNumber: String,
    role: {
      type: Number,
      default: 3, // 0-super_admin, 1-admin, 3-user
    },
  },
  {
    timestamps: true,
  }
);

const User = new moogoose.model("User", userSchema);

module.exports = User;
