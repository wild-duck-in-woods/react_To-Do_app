const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/verifyToken");

const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

router.get(
  "/tasks",
  verifyToken,
  getTasks
);

router.post(
  "/tasks",
  verifyToken,
  addTask
);

router.delete(
  "/tasks/:id",
  verifyToken,
  deleteTask
);

router.put(
  "/tasks/:id",
  verifyToken,
  updateTask
);

module.exports = router;