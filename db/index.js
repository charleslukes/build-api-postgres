const { Client } = require("pg");

const db = process.env.NODE_ENV === "test" ? "build-api-test" : "build-api";

const client = new Client({
  connectionString: `postgresql://localhost/${db}`
});

client.connect();

/**
 *  CREATE TABLE users (id SERIAL PRIMARY KEY,
 * username TEXT UNIQUE NOT NULL,
 * password TEXT NOT NULL, isAdmin TEXT DEFAULT false);
 */
module.exports = client;
