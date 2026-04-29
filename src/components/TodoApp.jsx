import useTasks from "../hooks/useTasks";
import TaskInput from "./TaskInput";
import TaskSearch from "./TaskSearch";
import FilterButtons from "./FilterButtons";
import TaskList from "./TaskList";
import Header from "./Header";
import DashboardLayout from "./DashboardLayout";

function TodoApp({ onLogout }) {
    const {
        task,
        setTask,
        tasks,
        filter,
        setFilter,
        search,
        setSearch,
        editingIndex,
        editText,
        setEditText,
        addTask,
        toggleTask,
        deleteTask,
        startEdit,
        saveEdit,
        filteredTasks,
    } = useTasks();

    return (
        <DashboardLayout>
            <Header onLogout={onLogout} tasks={tasks} />
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                <TaskInput task={task} setTask={setTask} addTask={addTask} />

                <TaskSearch search={search} setSearch={setSearch} />

                <FilterButtons filter={filter} setFilter={setFilter} />
            </div>
            <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                startEdit={startEdit}
                editingIndex={editingIndex}
                editText={editText}
                setEditText={setEditText}
                saveEdit={saveEdit}
            />
        </DashboardLayout>
    );
}

export default TodoApp;