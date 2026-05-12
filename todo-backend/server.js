const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// TEMP DATABASE
// =============================
let users = [];
let tasks = [];

// =============================
// ROOT ROUTE
// =============================
app.get("/", (req, res) => {
    res.send("Server running");
});

// =============================
// SIGNUP
// =============================
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.json({
            message: "All fields required",
        });
    }

    if (password.length < 6) {
        return res.json({
            message: "Password too short",
        });
    }
    // check existing user
    const existingUser = users.find(
        (u) => u.email === email
    );

    if (existingUser) {
        return res.json({
            message: "User already exists",
        });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(
        password,
        10
    );
    // create user
    const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
    };

    users.push(newUser);

    res.json({
        message: "Signup successful",
    });
});
// =============================
// LOGIN
// =============================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email
  );

  if (!user) {
    return res.json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );
if (!isMatch) {
    return res.json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    "secretkey"
  );

  res.json({
    message: "Login successful",
    token,
  });
});

// =============================
// VERIFY TOKEN MIDDLEWARE
// =============================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({
      message: "No token provided",
    });
  }
const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(
      token,
      "secretkey"
    );

    req.user = verified;

    next();
  } catch (err) {
    return res.json({
      message: "Invalid token",
    });
  }
};

// =============================
// GET TASKS
// =============================
app.get("/tasks", verifyToken, (req, res) => {
  const userTasks = tasks.filter(
    (t) => t.userId === req.user.userId
  );

  const userTasks = tasks.filter(
  (t) => t.userId === req.user.userId
);

res.json(userTasks);
});
// =============================
// ADD TASK
// =============================
app.post("/tasks", verifyToken, (req, res) => {
  if (!req.body.text?.trim()) {
    return res.json({
      message: "Task required",
    });
  }
const newTask = {
  id: Date.now().toString(),

  text: req.body.text,

  completed: false,

  date: new Date().toLocaleString(),

  userId: req.user.userId,
};
  

  tasks.push(newTask);

  res.json(newTask);
});

// =============================
// DELETE TASK
// =============================
app.delete(
  "/tasks/:id",
  verifyToken,
  (req, res) => {
    const task = tasks.find(
      (t) => t.id === req.params.id
    );

    if (!task) {
      return res.json({
        message: "Task not found",
      });
    }

    if (task.userId !== req.user.userId) {
      return res.json({
        message: "Unauthorized",
      });
    }

    tasks = tasks.filter(
      (t) => t.id !== req.params.id
    );

    res.json({
      message: "Deleted",
    });
  }
);

// toggle task

app.put(
    "/tasks/:id",
    verifyToken,
    (req, res)=> {
        const task= tasks.find(
            (t)=> t.id === req.params.id 
        );

        if(!task){
            return res.json({
                message: "task not found",
            });
        }

        if(task.userId !== req.user.userId){
            return res.json({
                message: "unauthorized",
            });
        }

        tasks = tasks.map(
            (t)=> t.id === req.params.id
                ? {...t, ...req.body }
                : t
        );
        const UpdatedTask= tasks.find(
            (t)=> t.id === req.params.id 
        );

        res.json(UpdatedTask);
    }
)

// =============================
// START SERVER
// =============================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});