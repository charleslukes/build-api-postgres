const express = require("express");
const router = express.Router();
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
  .get(viewUsers)
  .post(createUsers);

module.exports = router;
