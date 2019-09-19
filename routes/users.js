const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  viewUsers,
  createUsers,
  updateUser,
  deleteUser,
  getUser,
  userLogin
} = require("../controllers/users");

router
  .route("/")
  .get([auth, admin], viewUsers)
  .post(createUsers);

router
  .route("/:id")
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);

router.route("/login").post(userLogin);

module.exports = router;
