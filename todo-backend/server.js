const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let users = [];

const verifyToken = (req, res, next)=>{
    const authHeader= req.headers.authorization;

    if(!authHeader){
        return res.json({
            message: "no token provided",
        });
    }

    // remove "bearer "
    try{
        const verified = jwt.verify(
            token,
            "secretkey"
        );

        req.user= verified;

        next();
    } catch (err){
        res.json({
            message: "invalid token",
        });
    }
}

app.get("/tasks",verifyToken, (req, res) => {
    res.json(tasks);
});

// ADD task
app.post("/tasks",verifyToken, (req, res) => {
    const newTask = {
        id: Date.now().toString(),
        text: req.body.text || "",
        completed: false,
        date: new Date().toLocaleString(),
    };

    tasks.push(newTask);

    res.json(newTask);
});

// signup
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = users.find(
        (u) => u.email === email
    );

    if (existingUser) {
        return res.json({
            message: "user already exists",
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
        message: "signup successful",
    });
});
//login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    //find user
    const user = users.find(
        (u) => u.email === email
    );

    if (!user) {
        return res.json({
            message: "user not found",
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.json({
            message: "wrong password",
        });
    }

    //create token
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
// DELETE task
app.delete("/tasks/:id",verifyToken, (req, res) => {
    tasks = tasks.filter((t) => t.id !== req.params.id);

    res.json({ message: "Deleted" });
});

// UPDATE task
app.put("/tasks/:id", (req, res) => {
    tasks = tasks.map((t) =>
        t.id === req.params.id
            ? { ...t, ...req.body }
            : t
    );

    const updatedTask = tasks.find(
        (t) => t.id === req.params.id
    );

    res.json(updatedTask);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});