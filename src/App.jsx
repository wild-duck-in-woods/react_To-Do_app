import { useState, useEffect } from "react";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import Signup from "./components/Signup";

function App(){
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(true);

  if(token){
    return <TodoApp />;
  }

  return(
    <>
    
      {
        isLogin?(
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )
      }
    </>
  )
}

export default App;