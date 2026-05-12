const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", authRoutes);

app.use("/", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});