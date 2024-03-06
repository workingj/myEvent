import React from 'react'
import Profile from './Global/Profile'
import Dashboard from './Global/Dashboard'

const User = {
  username: "Doejohn",
  email: "john@provider.net",
  firstName: "John",
  lastName: "Doe",
  avatar: "",
};

function RigtSide() {
  return (
    <div className="border border-gray-300 p-4 m-4  rounded-md text-center ">
    <div className="Profile rounded-md shadow-md mx-auto max-w-md w-82 h-60">
      <Profile User={User} />
    </div>
    <div>
      <Dashboard  />
    </div>
  </div>

  )
}

export default RigtSide
