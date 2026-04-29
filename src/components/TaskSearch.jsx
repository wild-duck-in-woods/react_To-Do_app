function TaskSearch({setSearch, search}) {
    return (
        <input
            //className="flex-1 p-2 boder rounded "
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Sarch tasks..."
        />
    );
}

export default TaskSearch;