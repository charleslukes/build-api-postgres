const db = require("../db");
const bcrypt = require("bcrypt");

// helper function to create admin
async function createAdmin(name, password) {
  const hashPassword = await bcrypt.hash(password, 10);
  const admin = await db.query(
    "INSERT INTO users (username, password, isadmin) VALUES ($1, $2, $3) RETURNING *",
    [name, hashPassword, true]
  );
  return admin.rows[0];
}

// createAdmin("Gladys", "123abc").then(() => process.exit(0));
module.exports = createAdmin;
