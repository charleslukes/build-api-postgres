const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const usersRoute = require("./routes/users");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/api/users", usersRoute);

app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
