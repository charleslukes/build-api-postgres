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

router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/login").post(userLogin);

module.exports = router;
