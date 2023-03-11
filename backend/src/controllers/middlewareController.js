const jwt = require("jsonwebtoken");

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = req.headers.token;
      const result_jwt = jwt.verify(
        token,
        process.env.JWT_ACCESS_KEY,
        (err, user) => {
          if (err) return res.status(403).json("json is not valid");
          req.user = user;
          next();
        }
      );
    } else {
      return res.status(401).json("You are not authenticate");
    }
  },
  verifyTokenSuperdAdminAuth: function (req, res, next) {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role === 1) {
        return next();
      } else return res.status(403).json("You are not allowed to creat group ");
    });
  },
};

module.exports = middlewareController;
