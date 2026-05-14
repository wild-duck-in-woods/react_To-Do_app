import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login({ setIsLogin }) {
  const {
    token,
    user,
    login,
    logout,
  } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/login",
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
      );
      const data = await res.json();


      if (data.token) {
        login(data.token, data.user)

        window.location.reload();
      } else {
        alert(data.message);
      }


    } catch (err) {
      console.log(err);
    }
  }


  const signupUser = async () => {
    try {
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
      );
      const data = await res.json();

      console.log(data);

        alert(data.message);



    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ padding: 40 }}>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>

      <br />
      <br />

      <button onClick={signupUser}>
        Signup
      </button>

    </div>
  );
}
export default Login;