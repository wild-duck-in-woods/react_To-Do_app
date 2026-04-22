
import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  })
  const [filter, setFilter] = useState("all");





  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };


  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });


  return (
    <div className="container">
      <h1>
        To-Do App
      </h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="enter task"
      />

      <button onClick={() => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false }]);
        setTask("");
      }}>
        Add
      </button>

      <div>
        <button onClick={() => setFilter("all")}
          style = {{
            background: filter === "all" ? "black" :  "", color: filter === "all" ? "white" : ""
          }}
        > 
          All 
          </button>
        <button 
          onClick={() => setFilter("completed")}
          style = {{ background: filter === "completed" ? "black" : "" , color: filter === "completed" ? "white" : "" }}
          >
            completed</button>
        <button 
          onClick={() => setFilter("pending")}
          style={{background: filter === "pending" ? "black" : "", color: filter === "pending" ? "white" : "" }}
        >
          pending
        </button>
        <button onClick={()=>{
          if(window.confirm("are you sure?")){
            setTasks([]);
            }
          }}>
          Clear All
        </button>
      </div>
      

      <ul>
        {filteredTasks.map((t, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTask(index)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "gray" : "black"
              }}
            >
              {t.text}
            </span>

            <button onClick={() => {
              const newTasks = tasks.filter((item) => item !== t);
              setTasks(newTasks);
            }}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default App;