const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res.json({
      message: "No token provided",
    });
  }

  const token =
    authHeader.split(" ")[1];

  try {

    const verified = jwt.verify(
      token,
      "secretkey"
    );

    req.user = verified;

    next();

  } catch (err) {

    res.json({
      message: "Invalid token",
    });
  }
};

module.exports = verifyToken;