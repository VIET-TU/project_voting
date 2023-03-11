const useController = require("../controllers/userController");
const router = require("express").Router();
const middlewareController = require("../controllers/middlewareController");

// get all user
router.get("/", middlewareController.verifyToken, useController.getAllUser);

module.exports = router;
