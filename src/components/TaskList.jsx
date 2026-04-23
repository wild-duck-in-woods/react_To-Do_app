function TaskList({ tasks, toggleTask, deleteTask }){
    return (
        <ul>
            {tasks.map((t,index) => (
                <li key={index}>
                    <span   
                        onClick={() => toggleTask(t)}
                        style={{
                            cursor: "pointer",
                            textDecoration: t.completed? "line-through":"none"
                        }}
                    >
                        {t.text};
                    </span>

                    <button onClick={()=> deleteTask(t)}>
                        delete
                    </button> 
            
                </li>
            ))}
        </ul>
    );
}

export default TaskList;