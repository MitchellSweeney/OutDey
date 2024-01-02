const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  let token = req.cookies.jwt;
  console.log(token);
  if (!token) {
    return res.status(401).send("Authorization Failed.");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).send("Token could not be verified");
    }
    req.user = user;
  });
  next();
};

module.exports = validateToken;
