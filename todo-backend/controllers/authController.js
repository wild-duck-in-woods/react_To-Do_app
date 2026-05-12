const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];

const signup = async (req, res) => {

  const { email, password } = req.body;

  const existingUser = users.find(
    (u) => u.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.status(201).json({
    message: "Signup successful",
  });
};

const login = async (req, res) => {

  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    return res.status(401).json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    "secretkey"
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
};

module.exports = {
  signup,
  login,
};