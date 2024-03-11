import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/MyEventContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsLoggedIn, checkUser } = useAuth();
  const navigate = useNavigate();

  function reverseTimer(minutes) {
    // Convert minutes to milliseconds
    const milliseconds = minutes * 60 * 1000;
  
    // Set a timeout to display an alert after login
    setTimeout(function () {
      navigate("/user/login");
      alert("  Time's up! please login again !!");
      toast.warning("Please login again!");
    }, milliseconds);
  }
  

  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        toast.success("Successfully logedin!");
        checkUser();
        setIsLoggedIn(true);
        navigate("/home");
        reverseTimer(31);
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error("Login failed!");
    }
  };
  return (
    <div className="w-screen h-screen  bg-black bg-opacity-30 popup">
      <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
        <div className="p-4">
          <h2 className="text-21 font-semibold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="block mb-2">Email:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="block mb-2">Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-full w-full p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-600 rounded-full p-3 mt-2 text-white font-bold"
            >
              Login
            </button>
            <Link to="/" >
                    <button
                className="bg-gray-400 hover:bg-black rounded-full p-3 m-4 text-white font-bold"               
              >
                Cancel
              </button>
              </Link>
        
            <p className="mt-4">
              {" "}
              Not registered yet?{" "}
              <Link to="/user/register" className=" underline">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
