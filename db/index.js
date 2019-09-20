const { Client } = require("pg");

const db = process.env.NODE_ENV === "test" ? "build-api-test" : "build-api";

const client = new Client({
  connectionString: process.env.DATABASE_URL || `postgresql://localhost/${db}`
});

client.connect();

module.exports = client;
