import { useState } from "react";

function Signup({ setIsLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const signupUser = async () => {
        const res = await fetch(
            "http://localhost:5000/signup",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        )
        const data = await res.json();
        alert(data.message);

        if (data.message === "signup successful") {
            setIsLogin(true);
        }
    };
return (
    <div className="p-10 flex flex-col gap-4 max-w-sm mx-auto">

      <h1 className="text-2xl font-bold">
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

      <p
        onClick={() => setIsLogin(true)}
        className="text-blue-500 cursor-pointer"
      >
        Already have an account?
      </p>

    </div>
  );
}
export default Signup;