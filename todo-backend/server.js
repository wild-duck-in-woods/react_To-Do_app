
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

const User = require("./models/User")
const Task = require("./models/Task")
mongoose.connect("mongodb://127.0.0.1:27017/taskapp")
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.post("/signup", async (req, res) => {

    const { username, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.json({
            message: "User created"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }

})
function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: "Token missing"
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, "secretkey")

        req.user = decoded

        next()

    } catch (err) {

        res.status(401).json({
            message: "Invalid token"
        })
    }
}
// Login Route

app.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        console.log(password)
        console.log(user)
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            "secretkey",
            {
                expiresIn: "1d"
            }
        )

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
})

app.post("/tasks", verifyToken, async (req, res) => {

    try {

        const newTask = await Task.create({
            text: req.body.text,
            completed: false,
            userId: req.user.userId
        })

        res.json(newTask)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
})

app.get("/tasks", verifyToken, async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.userId
        })

        res.json(tasks)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
})
// UPDATE TASK


app.put("/tasks/:id", verifyToken, async (req, res) => {

    try {

        const task = await Task.find({
            _id: req.params.id
        });


        if (!task.length) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (task[0].userId.toString() !== req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,

            {
                ...req.body
            },

            // {
            //     new: true
            // }
        )

        res.json(updatedTask)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
})

//delete
app.delete("/tasks/:id", verifyToken, async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        await Task.findByIdAndDelete(req.params.id)

        res.json({
            message: "Task deleted"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
})


app.listen(5000, () => {
    console.log("Server running on port 5000")
})
