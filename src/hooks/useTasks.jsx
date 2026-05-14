import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { 
  getTasks ,
  createTask,
  deleteTask,
  updateTask

} from "../services/api";

function useTasks() {


  const { token, user } = useContext(AuthContext);

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
    if (!token) return

    fetchTasks()

  }, [token])


  const fetchTasks = async () => {

    try {
      const data =
        await getTasks(token)

      if (Array.isArray(data)) {

        setTasks(data);

      } else {

        setTasks([]);

        if (
          data.message === "invalid token" ||
          data.message === "no token provided"
        ) {
          logout();
        }
      }
    } catch (err) {
      console.log(err);

      setTasks([]);
    }
  };


const addTask = async () => {


    if (!task.trim()) return;

    const newTask = {
      text: task,
      completed: false,
      date: new Date().toLocaleString(),
    };

    const data = await createTask(newTask,token)
    console.log("data is ",data)

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

    const res= updateTask(updatedTask, token)


    setTasks((prev) =>
      Array.isArray(prev)
        ? prev.map((t) =>
          t._id === task._id
            ? updatedTask
            : t
        )
        : []
    );
  };

  const removeTask = async (id) => {

    try {

      

      const response= await deleteTask(id,token)

      console.log(await response)

      setTasks((prev) =>
        prev.filter((task) => task._id !== id)
      )

    } catch (err) {

      console.log(err)
    }
  }
  const startEdit = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };


  const saveEdit = async (task) => {
    const updatedTask = {
      ...task,
      text: editText,
    };

    // await fetch(`http://localhost:5000/tasks/${task._id}`, {
    //   method: "PUT",

    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },

    //   body: JSON.stringify(updatedTask),
    // });
    const res= await updateTask(updatedTask, token)
    console.log(res)
    setTasks((prev) =>
      Array.isArray(prev)
        ? prev.map((t) =>
          t._id === task._id
            ? updatedTask
            : t
        )
        : []
    );

    setEditingIndex(null);
    setEditText("");
  };



  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((t) => {

      //safety check
      if (!t || !t.text) return false;

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
    removeTask,
    startEdit,
    saveEdit,

    filteredTasks,
  };
}

export default useTasks;
