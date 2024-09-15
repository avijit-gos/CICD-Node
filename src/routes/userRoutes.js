/** @format */

const {
  registerUser,
  loginUser,
  fetchUsersList,
  fetchUserProfile,
  updateUserProfile,
  updateProfileStatus,
} = require("../controller/userController");

const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/list", fetchUsersList);
router.get("/:profileId", fetchUserProfile);
router.put("/update/:profileId", updateUserProfile);
router.patch("/update-status/:profileId", updateProfileStatus);
module.exports = router;
