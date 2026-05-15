import { useState } from "react";

import {
  signUp,
} from "../services/api";
function Signup({ setIsLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const signupUser = async () => {
    try {

      const data= await signUp(email,password)
      console.log(data)

        alert(data.message);


    } catch (err) {
      console.log(err);
    }
  }

return (
    <div className="p-10 flex flex-col gap-4 max-w-sm mx-auto">

      <h1 className="f">
        Signup
      </h1>

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
        onClick={signupUser}
        className="bg-green-500 text-white p-2 rounded"
      >
        Signup
      </button>

      <p className="text-sm mt-2">
                Already have an account?{" "}
                <span
                    className="text-blue-500 cursor-pointer"
                    onClick={()=>setIsLogin(true)}
                >
                    Login
                </span>
            </p>

    </div>
  );
}
export default Signup;