const middlewareController = require("../controllers/middlewareController");
const groupController = require("../controllers/groupController");

const router = require("express").Router();
// get all member
router.get(
  "/",
  middlewareController.verifyToken,
  groupController.getAllMemebers
);

// add admin member
router.post(
  "/admin-member",
  middlewareController.verifyTokenSuperdAdminAuth,
  groupController.addAdminMember
);

// add member
router.post(
  "/user-member",
  middlewareController.verifyTokenSuperdAdminAuth,
  groupController.addMember
);

// delete membeber in group
router.delete(
  "/delete-member/:id",
  middlewareController.verifyTokenSuperdAdminAuth,
  groupController.deleteMember
);

// update member
router.put(
  "/:id",
  middlewareController.verifyTokenSuperdAdminAuth,
  groupController.updateMember
);

// delete group
router.delete(
  "/delete-group",
  middlewareController.verifyToken,
  groupController.deleteGroup
);

module.exports = router;
