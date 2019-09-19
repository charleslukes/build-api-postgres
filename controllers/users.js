const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    const result = await db.query(
      "SELECT * FROM users WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    return result;
  } catch (error) {
    return next(error);
  }
};

const createUsers = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [req.body.username, hashPassword]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const result = await db.query(
      "UPDATE users SET username=$1 password=$2 WHERE id=$3 RETURNING *",
      [req.body.username, hashPassword, req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await db.query("DELETE from users WHERE id=$1", [
      req.params.id
    ]);
    return res.json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
};
