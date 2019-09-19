const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

module.exports = app;
