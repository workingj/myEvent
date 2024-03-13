import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { DataContext } from "../../Context/MyEventContext";
import { useAuth } from "../../Context/MyEventContext";
import axios from "axios";
import Menu from "./Menu";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { setOverview } = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn, userData } = useAuth();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/user/login");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="h-30 rounded-t-lg flex justify-between items-center flex-grow bg-opacity-80 m-auto px-5 py-1 rounded-xl shadow-xl shadow-gray-200 w-full">
      <div className="menu bg-black w-28 text-white rounded-full p-1 text-white w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end"
        >
          <FaBars />
        </button>
      </div>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
      <div className="navbar flex items-center space-x-4 flex-grow">
        <div className="">
          <Link to="/home">
            {/* <img src="/src/assets/favicon.svg" alt="SharedTravelLogo" /> */}
            <img src={logo} alt="SharedTravelLogo" className="logoHeader" />
          </Link>
        </div>
        <div>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
          >
            <option
              key="en"
              value="en"
              className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end"
            >
              EN
            </option>
            <option key="de" value="de">
              DE
            </option>
          </select>
        </div>
        <ul className="flex items-center space-x-4 flex-grow">
          <Link to="/home">
            <li className="basis-1/4 hover:text-orange-300 text-white font-oleo font-bold py-2 px-4 ">
              {t("My Events")}
            </li>
          </Link>
        </ul>
        <div className="flex items-center space-x-4 gap-4 flex-grow justify-end">
          <div className="space-x-4">
            {isLoggedIn && (
              <Link to="/home">
                <button
                  className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
                  onClick={() => setOverview(true)}
                >
                  {t("Home")}
                </button>
              </Link>
            )}
            <Link to="/privacy">
              <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                {t("Privacy")}
              </button>
            </Link>
            <Link to="/forteam">
              <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                {t("Team")}
              </button>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className=" flex items-center space-x-4 gap-4 justify-end">
              <Link to="/donate">
                <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                  {t("Donate")}
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              >
                {t("Logout")}
              </button>
              <p className="text-sm pl-5">
                {t("Welcome")}, {userData.firstName}
              </p>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/user/login">
                <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                  {t("Sign in")}
                </button>
              </Link>
              <Link to="/user/register">
                <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                  {t("Register")}
                </button>
              </Link>
              <Link to="/donate">
                <button className="bg-black w-28 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end ">
                  {t("Donate")}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
