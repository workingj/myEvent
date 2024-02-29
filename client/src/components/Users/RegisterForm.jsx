import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            navigate('/login');
        }
    } catch (error) {
        toast.error(error.response.data.error || 'Registration failed');
    }
  };
  return (

    <div className="container mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500 bg-white">

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
          <Link className="underline " to="/login">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
