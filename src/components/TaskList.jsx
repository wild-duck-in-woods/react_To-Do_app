function TaskList({
    tasks,
    toggleTask,
    deleteTask,
    startEdit,
    editingIndex,
    editText,
    setEditText,
    saveEdit
}) {
    return (
        <>
            {tasks.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p className="text-lg">No tasks found</p>
                    <p className="text-sm">Start by adding a new task</p>
                </div>
            )}

            <ul className="mt-4">
                {tasks.map((t, index) => (
                    <li key={index}>
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-3 flex justify-between items-center hove:shadow-md transition">

                            {editingIndex === index ? (
                                <>
                                    <input
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={() => saveEdit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <div>
                                    <p 
                                        onClick={() => toggleTask(index)}
                                        className={`cursor-pointer ${t.completed ? "line-through text-gray-400" : " text-gray-800"
                                            }`}
                                    >
                                        {t.text}
                                    </p>
                                        <p className="text-xs text-gray-400">{t.date}</p>
                                    </div>

                                    <div className="flex gap-3 text-sm">
                                        <button onClick={() => startEdit(index, t.text)}>
                                            Edit
                                        </button>

                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => deleteTask(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;