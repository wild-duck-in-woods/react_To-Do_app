function Header({ onLogout, tasks }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>

            <button
                onClick={onLogout}
                className="bg-red-500 rounded hover:bg-red-600 text-white px-4 py-2 transition"
            >
                Logout
            </button>

            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-400">Total Tasks</p>
                    <h2 className="text-2xl font-bold">{tasks?.length}</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-400">Completed</p>
                    <h2 className="text-2xl font-bold">
                        {tasks?.filter(t => t.completed).length}
                    </h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-gray-400">Pending</p>
                    <h2 className="text-2xl font-bold">
                        {tasks?.filter(t => !t.completed).length}
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default Header;