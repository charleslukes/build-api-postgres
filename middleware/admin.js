const verifyAdmin = async (req, res, next) => {
  if (req.isAdmin) {
    return next();
  } else {
    return res.json({ message: "Forbidden" });
  }
};

module.exports = verifyAdmin;
