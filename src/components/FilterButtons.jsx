function FilterButtons({ setFilter, filter}){
    return (
        <div>
            
            <button onClick={()=>setFilter("all")}>
                all
            </button>
            <button onClick={()=>setFilter("completed")}>
                completed
            </button>
            <button onClick={()=>setFilter("pending")}>
                pending
            </button>
        </div>
    );
}

export default FilterButtons;