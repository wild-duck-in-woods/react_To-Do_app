import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  signUp,
  logIn,

} from "../services/api";
function Login() {
  const {
    token,
    user,
    login,
    logout,
  } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {

      const data = await logIn(email, password)

      if (data.token && data.user) {
        login(data.token, data.user)

        window.location.reload();
      }

      return data



    } catch (err) {
      console.log(err);
    }
  }
  const signupUser = async () => {


    const data = await signUp(email, password)

    return data





  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    let newErrors = {};

    if (!email.includes("@")) {
      newErrors.email = "invalid email";
    }

    if (password.length < 6) {
      newErrors.password = "password must be at least 6 characters";
    }


    if (Object.keys(newErrors).length !== 0) {

      setErrors(newErrors);
    } else {

      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      
      const data = isLogin
        ? await loginUser()
        : await signupUser();


      if (!data.ok)
        newErrors.general = data.message;

      setErrors(newErrors);

    }


  };



  return (

    //  

    <div className="flex flex-col items-center justify-center h-screen bg-grap-100">
      <h2 className="text-2xl font-bold">
        {
          !isLogin
            ? " Signup"
            : " Login"
        }
      </h2>
      <p className="text-sm mt-2">
        {
          isLogin
            ? "Do not have an account?"
            : "Already Have an account"
        }

        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {
            isLogin
              ? " Signup"
              : " Login"
          }
        </span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md w-80">
        <input
          className="w-full border p2 mb-2"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-sm text-blue-500 mt-1"
        >
          {showPassword ? "hide" : "show"} password
        </button>

        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <button
          type="submit"
          className={
            isLogin
              ? "w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-800 transition duration-200"
              : "w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-800 transition duration-200"
          }
          disabled={loading}

        > {
            loading
              ? isLogin
                ? "Logging in..."
                : "Signing in..."
              : isLogin
                ? "Login"
                : "Signup"
          }
        </button>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}
      </form>
    </div>
  );
}
export default Login;