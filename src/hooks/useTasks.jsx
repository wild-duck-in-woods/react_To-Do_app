import { useState, useEffect } from "react";

function useTasks() {
  const token = localStorage.getItem("token");

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const [editText, setEditText] = useState("");

  //-----------------------------------------------------------------
  // fetch tasks from server
  //-----------------------------------------------------------
  useEffect(() => {
    fetch("http://localhost:5000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("FETCH:", data);

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]);

          if (
            data.message === "invalid token" ||
            data.message === "no token provided"
          ) {
            localStorage.removeItem("token");

            window.location.reload();
          }
        }
        //setTasks(data);
      })
      .catch((err) => {
        console.log(err);

        setTasks([]);
      })
  }, []);

  const addTask = async () => {


    if (!task.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      date: new Date().toLocaleString(),
    };

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newTask),
    });

    const data = await res.json();

    setTasks((prev) =>
      Array.isArray(prev)
        ? [...prev, data]
        : [data]
    );

    setTask("");
  };

  //-------------------------------------------------------------------
  // toggle task
  //------------------------------------------------------------------

  const toggleTask = async (task) => {
    const updatedTask = {
      ...task,
      completed: !task.completed,
    };

    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(updatedTask),
    });

    setTasks((prev) =>
      Array.isArray(prev)
        ? prev.map((t) =>
          t.id === task.id
            ? updatedTask
            : t
        )
        : []
    );
  };

  const deleteTask = async (id) => {
    //if(!id) return;
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTasks((prev) =>
      Array.isArray(prev)
      ?  prev.filter((t) => t.id !== id)
      : []
    );
  };

  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = async (index) => {
    const updatedTask = {
      ...task,
      text: editText,
    };

    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedTask),
    });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? updatedTask : t
      )
    );

    setEditingIndex(null);
    setEditText("");
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((t) => {

      //safety check
      if(!t || !t.text) return false;
      
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && t.completed) ||
        (filter === "pending" && !t.completed);

      const matchesSearch =
        t.text.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    : [];

  return {
    task,
    setTask,

    tasks,
    setTasks,

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