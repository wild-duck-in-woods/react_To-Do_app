function TaskInput({ task, setTask, addTask }) {
  return (
    <div className="flex gap-2 mb-4">

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task..."
        className="border p-2 rounded"
      />

      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>

    </div>
  );
}

export default TaskInput;