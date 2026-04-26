function TaskList({ tasks, toggleTask, deleteTask, editingIndex, startEdit }){
    return (
        <ul>
            {tasks.map((t,index) => (
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
    );
}

export default TaskList;