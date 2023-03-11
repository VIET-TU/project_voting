const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const middlewareController = require("./middlewareController");
require("dotenv").config();

let refreshTokens = [];

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const userExits = User.findOne({ user: req.body.user });
      if (userExits.length) return res.json(403).json("Username exited");
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // creat new user
      const newUser = await User({ ...req.body, ...{ password: hashed } });
      // save to db
      const user = await newUser.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // generate acess token
  generateAcessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "1h" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  // login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username!");
      }
      const vaildPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!vaildPassword) res.status(404).json("Wrong password!");
      if (user && vaildPassword) {
        const accessToken = authController.generateAcessToken(user);
        const refreshToken = authController.generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      console.log(error);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("You're not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not vaild");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) return res.status(403).json("Refresh is not vaild");
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = authController.generateAcessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // log out
  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = [];
    res.status(200).json("Logged out !");
  },
};

module.exports = authController;
