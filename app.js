const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const usersRoute = require("./routes/users");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/api/users", usersRoute);

module.exports = app;
