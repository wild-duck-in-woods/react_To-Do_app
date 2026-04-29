import { useState } from "react";

function Login({onLogin, setIsSignup}){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        let newErrors = {};

        if(!email.includes("@")) {
            newErrors.email = "invalid email";
        }

        if(password.length <6){
            newErrors.password="password must be at least 6 characters";
        }
        const validUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (!validUser) {
            newErrors({general : "invalid credentials"});
        }

        if(Object.keys(newErrors).length === 0){
            setLoading(true);
            
            
            setTimeout(()=>{
                onLogin(email);
                setLoading(false);
            }, 1000);
        }
        setErrors(newErrors);

       
    };

    return (
        <div className="flex items-center justify-center h-screen bg-grap-100">
            <h2 className="text-center text-xl mb-4">login</h2>
            <p className="text-sm mt-2">
                Dont't have an account?{" "}
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={()=>setIsSignup(true)}
                >
                    signup
                </span>
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-80">
                <input
                    className="w-full border p2 mb-2"
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                
                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <input
                    className="w-full border border-gray-300 p-2 rounded mt-2"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    type ="button"
                    onClick={()=> setShowPassword(!showPassword)}
                    className="text-sm text-blue-500 mt-1"
                >
                    {showPassword ? "hide" : "show"} password
                </button>

                {errors.password && <p className="text-red-500">{errors.password}</p>}

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? "logging in..." : "login"}
                </button>

                {errors.general && (
                    <p className="text-red-500 text-sm">{errors.general}</p>
                )}
            </form>
        </div>
    );
}

export default Login;