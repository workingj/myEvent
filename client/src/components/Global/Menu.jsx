import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext";
import { toast } from "react-toastify";
function Menu({setShowMenu}) {
  const {isLoggedIn,  setIsLoggedIn,userData } = useAuth();
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
  
    <div className="menu1 dashboard mt-5 flex flex-col items-center justify-start pt-8 p-4 rounded-md shadow-md mx-auto max-w-md h-96 w-60">
      {/* button clos ia right side with icone */}

      <button
        className="btn-right my-2 hover:bg-blue-200 text-blue-500 w-28 text-right 
        "
        onClick={() => setShowMenu(false)}
      >
        close
      </button>
      {isLoggedIn && (
        <div>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => navigate("/myevents")}
          >
            📆 Events
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => navigate("/home/contacts")}
          >
            📱 Contacts
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => navigate("/admin/templates")}
          >
            📄 Templates
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => navigate("/user/settings")}
          >
            🎛 Settings
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("privacy")}}
          >
            📄 Privacy
              
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("forteam")}}
          >
            📄 For teams
          </button>

          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("user/login")}}
          >
            🚪 Login
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("user/register")}}
          >
            📝 Register
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("privacy")}}
          >
            📄 Privacy
              
          </button>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 w-28 text-left"
            onClick={() => {
              setShowMenu(false);
              navigate("forteam")}}
          >
            📄 For teams
          </button>
        </div>
      )}

    
  </div>
       
  )
}

export default Menu
