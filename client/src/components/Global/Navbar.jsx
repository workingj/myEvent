import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/MyEventContext";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import axios from "axios";
import Menu from "./Menu";



const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const { setOverview } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn, userData } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

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
    <nav className=" h-30 rounded-t-lg flex justify-between items-center flex-grow bg-opacity-80 m-auto px-5 py-5 ps-12  rounded-xl shadow-xl shadow-gray-200 w-full">
      <div
        className=" menu bg-black w-28 text-white rounded-full p-1 text-white  
    "
      >
        <button onClick={() => setShowMenu(!showMenu)} className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
      
      menu

        </button>
      </div>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      <div className="navbar flex items-center space-x-4 flex-grow">
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
              <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end " onClick={() => setOverview(true)}>
                Home
              </button>
            </Link>
            <Link to="/privacy">
              <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">Privacy</button>
            </Link>
            <Link to="/forteam" >
              <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "    >
             Team
          </button>
              </Link>
          </div>
          {isLoggedIn ? (
            <div className=" flex items-center space-x-4 gap-4  justify-end ">

              <Link to="/donate">
          <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "    >
             Donate
          </button>
        </Link>
              <button
                onClick={handleLogout}
                className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              >
                LOGOUT
              </button>
              <p className="text-sm pl-5">Welcome, {userData.firstName}</p>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/user/login">
                <button
                  className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
                >
                  Sign in
                </button>
              </Link>
              <Link to="/user/register">
                <button
                 className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
                >
                  Register
                </button>
              </Link>
              <Link to="/donate">
          <button
           className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
                     >
             Donate
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
            className="flex bg-black w-28 text-orange-300 text-sm rounded-full border-solid border-2 border-orange-500 py-1 px-1 hover:bg-orange-800 transition duration-300 font-oleo font-bold py-1 px-2 "
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
