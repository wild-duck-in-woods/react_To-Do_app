import { useState, useEffect } from "react";
import Login from "./components/Login";
import TodoApp from "./components/TodoApp";
import Signup from "./components/Signup";

function App(){
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(()=>{
    const savedUser=localStorage.getItem("user");
    if(savedUser){
      setUser(savedUser);
    }
  },[]);

  const handleLogin = (email) => {
    localStorage.setItem("user",email);
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    App();
  }

  
  return (
    <div>
      {user ? (
        <TodoApp onLogout={handleLogout}/>
      ) : isSignup? (
        <Signup onSignup={handleLogin} />
      ) : (
        <Login onLogin={handleLogin} setIsSignup={setIsSignup} />
      )}
        
    </div>
  );
}

export default App;