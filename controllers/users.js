const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const viewUser = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users");
    return res.json(result.rows);
  } catch (error) {
    return next(error);
  }
};
