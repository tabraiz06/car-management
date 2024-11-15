const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = auth;
