import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  

  const navigate = useNavigate();
  
useEffect(() => {

  document.body.classList.add("bg-white");
  return () => {
    document.body.classList.remove("bg-white");
  };
}, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('password',password , 'pass2',password2);
      toast.error('Passwords are not equal !!');
    } else {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        {
          username,
          password,
          email,
          firstName,
          lastName,
          birthDate,
          },
          {
            withCredentials:true
        }
        );
        if (response.status === 201) {
            toast.success('Successfully registered.')
            navigate('/home');
        }
    } catch (error) {
      setError(error.response.data.error);
        toast.error(error.response.data.error || 'Registration failed');
      }
    }
  };
  return (
    <div className="w-screen h-screen  bg-black bg-opacity-30">
      <div className="container mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500 bg-white bg-opacity-90">
        <div className="p-4 mt-20">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="User Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2"></p>
              <input
                placeholder="Retype Password"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <p className="mb-2">Birth Date</p>
              <input
                placeholder="Birth Date"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border rounded-full w-full p-2"
                required
              />
            </div>
            <button
              className="bg-black text-white p-2 mt-2 rounded-full hover:bg-gray-700"
              type="submit"
            >
              Register
            </button>
          </form>
          <p>
            Have you already an account?
            <Link className="underline " to="/user/login">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
