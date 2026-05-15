import { useState, useEffect, useContext } from "react";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import Signup from "./components/Signup";
import { AuthContext } from "./context/AuthContext";

function App(){
    const { token, user } = useContext(AuthContext);

  

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