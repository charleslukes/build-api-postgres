const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validate } = require("jsonschema");
const userSchema = require("../schema/users.json");

const viewUsers = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users");
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id=$1", [
      req.params.id
    ]);
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

const createUsers = async (req, res, next) => {
  try {
    const { errors, valid } = validate(req.body, userSchema);

    if (!valid) {
      return next(errors.map(error => error.stack));
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, hashPassword]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.query(
      "UPDATE users SET username=$1, password=$2 WHERE id=$3 RETURNING *",
      [req.body.username, hashPassword, req.params.id]
    );
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE username=$1 LIMIT 1",
      [req.body.username]
    );

    if (result.rows.length === 0) {
      return res.json({ message: "Username Invalid" });
    }

    const comparePasword = await bcrypt.compare(
      req.body.password,
      result.rows[0].password
    );
    if (!comparePasword) {
      return res.json({ message: "Password Invalid" });
    }

    const token = jwt.sign(
      { username: result.rows[0].username, isAdmin: result.rows[0].isadmin },
      process.env.SECRET,
      {
        expiresIn: 60 * 60
      }
    );
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await db.query("DELETE from users WHERE id=$1", [req.params.id]);
    return res.status(204).json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  viewUsers,
  getUser,
  createUsers,
  userLogin,
  deleteUser,
  updateUser
};
