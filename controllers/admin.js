const db = require("../db");
const bcrypt = require("bcrypt");

// helper function to create admin
async function createAdmin(name, password) {
  const hashPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO users (username, password, isadmin) VALUES ($1, $2, $3) RETURNING *",
    [name, hashPassword, true]
  );
  return console.log(`Admin ${name} created`);
}

createAdmin("Gladys", "123abc");
