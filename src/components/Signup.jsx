import { useState } from "react";

function Signup({onSignup}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const handleSignup = (e) =>{
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        const newUser = {email, password};

        existingUsers.push(newUser);

        localStorage.setItem("users", JSON.stringify(existingUsers));

        onSignup(email);
    };

    return (
        <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-80">
            <h2 className="text-xl text-center mb-4"> signup</h2>

            <input
                className="w-full border p-2 mb-2"
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                className="w-full border p-2 mb-2"
                type="password"
                placeholder="password"
                value="password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="w-full bg-green-500 text-white p-2 rounded">
                signup
            </button>
        </form>
    );
}

export default Signup;