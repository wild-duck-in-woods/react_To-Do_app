function FilterButtons({ setFilter, filter }) {
    return (
        <div className="flex gap-2 mb-4">

            {["all", "completed", "pending"].map((type) =>(
                <button
                    key={type}
                    onClick={()=>setFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize transition
                        ${
                            filter === type
                            ?   "bg-blue-500 text-white"
                            :   "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {type}
                </button>
            ))}
            


        </div>
    );
}

export default FilterButtons;