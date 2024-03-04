import { useContext, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { DataContext } from "../../Context/MyEventContext";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import axios from 'axios';


 

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const { setOverview } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn, userData } = useAuth();
  console.log("Login??", userData);
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/");

    } catch (error) {
      toast.error("Error logging out");
    }
  };

  



  
  return (
    <nav className="h-30 rounded-t-lg flex justify-between items-center flex-grow bg-gray-200 px-5 py-5 ps-12">
      <div className="flex items-center space-x-4 flex-grow">
        <div className="w-12 h-12 overflow-hidden flex justify-center">
          <Link to="/">
            <img src="/src/assets/favicon.svg" alt="SharedTravelLogo" />
          </Link>
        </div>

        <ul className="flex items-center space-x-4 flex-grow ">
          <Link to="/">
            <li className="basis-1/4 hover:text-orange-300 text-white font-oleo font-bold py-2 px-4 ">
              My Events
            </li>
          </Link>
        </ul>
        <div
          className="flex items-center space-x-4 gap-4 flex-grow justify-end 
        "
        >
          <div className="space-x-4">
            <Link to="/">
              <button className="" onClick={() => setOverview(true)}>
                Home
              </button>
            </Link>
            <Link to="/privacy">
              <button className="">Privacy</button>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className=" flex items-center space-x-4 gap-4  justify-end ">
              <Link to="/" className="cursor-pointer hover:opacity-80">
                For team
              </Link>
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-black hover:bg-gray-600 rounded-full p-1 text-white  "
              >
                LOGOUT
              </button>
              <p className="text-sm pl-5">Welcome, {userData.firstName}</p>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/user/login">
                <button
                  className=" bg-blue-500 text-white text-sm rounded-md
               border-solid border-2 border-blue-500 py-1 px-1 hover:bg-blue-800 transition duration-300 font-oleo font-bold py-1 px-2
              "
                >
                  Sign in
                </button>
              </Link>
              <Link to="/user/register">
                <button
                  className="bg-red-500 text-white text-sm rounded-md
                border-solid border-2 border-red-500 py-1 px-1 hover:bg-red-800 transition duration-300 font-oleo font-bold py-1 px-2 mr-4
              "
                >
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* <div className="flex justify-end ">

        <form className="flex items-center pe-8">
          <input
            className="bg-white-400 border-double border-2 border-white-500 rounded py-1 px-8 mr-5 font-oleo text-sm text-white"
            type="text"
            placeholder=""
            value={searchText}
            onChange={handleSearchChange}
          />
          <button
            className="flex bg-black text-orange-300 text-sm rounded-full border-solid border-2 border-orange-500 py-1 px-1 hover:bg-orange-800 transition duration-300 font-oleo font-bold py-1 px-2 "
            onClick={handleSearchSubmit}
            type="submit"
          >
            Search
          </button>
        </form>
      </div> */}
    </nav>
  );
};

export default Navbar;