function TaskInput( { task, setTask, addTask}){
    return (
        <div className="flex gap-2 mb-4">
            <input
                className="flex-1 p-2 boder border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                //className="w-full p-2 border rounded mb-4"
                value = {task}
                onChange = {(e)=>setTask(e.target.value)}
                placeholder="Enter Task"
            />
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg transition"
                onClick={addTask}>add</button>
        </div>
    );
}

export default TaskInput;