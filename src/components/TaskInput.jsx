function TaskInput( { task, setTask, addTask}){
    return (
        <div>
            <input
                value = {task}
                onChange = {(e)=>setTask(e.target.value)}
                placeholder="enter task"
            />
            <button onClick={addTask}>add</button>
        </div>
    );
}

export default TaskInput;