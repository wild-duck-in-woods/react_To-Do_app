import { useState, useEffect } from "react";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import Signup from "./components/Signup";

function App(){
  const token =
    localStorage.getItem("token");
  

  return(
    <div>
      {token ? (
        <TodoApp />
      ) : (
      <Login />
      )}
        
    </div>

  )
  
}
export default App;