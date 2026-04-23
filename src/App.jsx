import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterButtons from "./components/FilterButtons";
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  })
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");




  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taksToDelete) => {
    const newTasks = tasks.map((t) =>
      t === taksToDelete ? { text: t.text, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const addTask = () => {
    console.log("clicked"); // 👈 check this
    if(task.trim() === "") return;
    setTasks([...tasks, {text: task, completed: false}]);
    setTask("");
  }
  const deleteTask = (taskToDelete) =>{
    setTasks(tasks.filter((t)=> t!== taskToDelete));
  }
  const filteredTasks = tasks.filter((t) => {
    const matchesFilter = 
    filter === "all" ||
    (filter === "completed" && t.completed) ||
    (filter === "pending" && !t.completed);

    const matchesSearch = 
      t.text.toLowerCase().includes(search.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });


  return (
    <div className="container">
      <h1>To-Do App</h1>

      <TaskInput task={task} setTask={setTask} addTask={addTask} />
      
      <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="search tasks..."
            />
      <FilterButtons filter= {filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      
    </div>
  )
}


export default App;