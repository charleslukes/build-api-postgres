const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  //get the token from the headers
  try {
    const authHeaderValue = req.headers.authorization;
    const token = jwt.verify(authHeaderValue, process.env.SECRET);
    req.isAdmin = token.isAdmin;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
