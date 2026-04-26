import TaskInput from "./components/TaskInput";
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
  const [editingIndex, setEdititingIndex] = useState(null);
  const [editText, setEditText] = useState("");



  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const editTask = (index, newText) =>{
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    setTasks(newTasks);
  };
  const toggleTask = (taksToDelete) => {
    const newTasks = tasks.map((t) =>
      t === taksToDelete ? { text: t.text, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const addTask = () => {
    //console.log("clicked"); // 👈 check this
    if(task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: task,
         completed: false,
          date: new Date.toLocaleString()
      }
    ]);

    setTask("");
  }

  
  const deleteTask = (taskToDelete) =>{
    setTasks(tasks.filter((t)=> t!== taskToDelete));
  }

  const startEdit = (index, text)=>{
    setEdititingIndex(index);
    setEditText(text);
  }

  const saveEdit = (index)=>{
    const newTasks = [...tasks];
    newTasks[index].text = editText;
    setTasks(newTasks);
    setEdititingIndex(null);
    setEditText("");
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

      <TaskInput task={task} setTask={setTask} addTask={addTask}  />
      
      {tasks.length === 0 && <p> No tasks Yet</p>}

      <input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="search tasks..."
            />
      <FilterButtons filter= {filter} setFilter={setFilter} />

       <ul>
            {filteredTasks.map((t,index) => (
                <li key={index}>

                    {editingIndex === index ? (
                        <>
                            <input
                                value={editText}
                                onChange = {(e)=>setEditText(e.target.value)}
                            />
                            <button onClick={()=>saveEdit(index)}>save</button>
                        </>
                    ):(
                       <>
                            <span   
                                onClick={() => toggleTask(t)}
                                style={{
                                cursor: "pointer",
                                textDecoration: t.completed? "line-through":"none"
                                }}
                            >
                        {t.text}
                            </span>
                            <br />
                            <small> {t.date}</small>
                            <br />

                            <button onClick={()=>startEdit(index, t.text)}>
                                edit
                            </button>

                            <button onClick={()=>deleteTask(t)}>
                                delete
                            </button>
                       </> 
                    )}
                    
            
                </li>
            ))}
        </ul>
      
      
    </div>
  )
}


export default App;