import { useState } from "react";

function Login({setIsLogin}){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser= async ()=>{
        const res= await fetch(
            "http://localhost:5000/login",
            {
                method: "POST",

                headers:{
                    "Content-Type":"application/json",
                },

                body:JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data= await res.json();

        console.log(data);

        if(data.token){
            localStorage.setItem(
                "token",
                data.token
            );
            
            alert("login successful");
        } else{
            alert(data.message);
        }
    } 
    return (
    <div className="p-10 flex flex-col gap-4 max-w-sm mx-auto">

      <h1 className="text-2xl font-bold">
        Login
      </h1>
        <p
  onClick={() => setIsLogin(false)}
  className="text-blue-500 cursor-pointer"
>
  Create account
</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border p-2 rounded"
      />

      <button
        onClick={loginUser}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>

    </div>
  );
}

export default Login;