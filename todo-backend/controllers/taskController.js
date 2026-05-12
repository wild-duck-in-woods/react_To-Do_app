let tasks = [];

// GET TASKS
const getTasks = (req, res) => {

  const userTasks = tasks.filter(
    (t) => t.userId === req.user.userId
  );

  res.status(200).json(userTasks);
};

// ADD TASK
const addTask = (req, res) => {

  if (!req.body.text?.trim()) {
    return res.status(400).json({
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

  res.status(201).json(newTask);
};

// DELETE TASK
const deleteTask = (req, res) => {

  const task = tasks.find(
    (t) => t.id === req.params.id
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.userId !== req.user.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  tasks = tasks.filter(
    (t) => t.id !== req.params.id
  );

  res.status(200).json({
    message: "Deleted",
  });
};

// UPDATE TASK
const updateTask = (req, res) => {

  const task = tasks.find(
    (t) => t.id === req.params.id
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (task.userId !== req.user.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  tasks = tasks.map((t) =>
    t.id === req.params.id
      ? { ...t, ...req.body }
      : t
  );

  const updatedTask = tasks.find(
    (t) => t.id === req.params.id
  );

  res.status(200).json(updatedTask);
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
};