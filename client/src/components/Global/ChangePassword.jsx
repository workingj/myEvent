import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import { useAuth } from '../../Context/MyEventContext';

function ChangePassword({handleCancel,userId,setChangePasswordPopup}) {
const { userData } = useAuth();
const [data, setData] = useState({
  oldPassword: "",
  newPassword: "",

});

const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
}

  // handleSubmit
  const handleSubmit = (e) => { 
 
    e.preventDefault();
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    console.log(`${import.meta.env.VITE_API_URL}/user/changePassword/${userData&&userData._id}`)
  axios.put(`${import.meta.env.VITE_API_URL}/user/changePassword/${userData&&userData._id}`, data
  )
    .then((res) => {
      console.log(res);
      setChangePasswordPopup(false);
      toast.success("Password changed successfully");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Password not changed");
    });
  };
  return (
    <div className="popup">
    <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
    <div className="popupInner" onClick={(e) => e.stopPropagation()}>
      <div className="p-4">
    <h2>
      Change Password
    </h2>
    <div className="m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
      <form   onSubmit={(e) => handleSubmit(e)}
      >
      
        <div className="mb-4">
          <p className="block mb-2">Old Password:</p>
          <input
          name='oldPassword'
            type="password"
            value={data.oldPassword}
            className="border rounded-full w-full p-2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <p className="block mb-2">New Password:</p>
          <input
            name='newPassword'
            value={data.newPassword}
            type="password"
            className="border rounded-full w-full p-2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-4">
          <p className="block mb-2">Confirm New Password:</p>
          <input
            name='confirmPassword'
            value={data.confirmPassword}
            type="password"
            className="border rounded-full w-full p-2"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <span className="hCenter">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4"
          >
            Save
          </button>
          <button className=" bg-red-500 text-white rounded p-2 mt-4 ml-4
          " onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
          </span>
      </form>

      </div>
      
    </div>
    </div>
    </div>
    </div>
  )
}

export default ChangePassword
