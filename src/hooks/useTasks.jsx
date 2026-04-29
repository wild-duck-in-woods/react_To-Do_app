import { useState, useEffect } from "react";

function useTasks() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
        date: new Date().toLocaleString(),
      },
    ]);

    setTask("");
  };

  // Toggle Task
  const toggleTask = (index) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete Task
  const deleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit Task
  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    if (!editText.trim()) return;

    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, text: editText } : t
      )
    );

    setEditingIndex(null);
    setEditText("");
  };

  // Filter + Search
  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    })
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    );

  return {
    task,
    setTask,
    tasks,
    filter,
    setFilter,
    search,
    setSearch,
    editingIndex,
    editText,
    setEditText,
    addTask,
    toggleTask,
    deleteTask,
    startEdit,
    saveEdit,
    filteredTasks,
  };
}

export default useTasks;