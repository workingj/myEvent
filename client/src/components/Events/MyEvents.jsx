import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function MyEvents( {handleButtonClick}) {
  
  const navigate = useNavigate();

  return (
    <>
    {/* add cards for events */}
    <div  className="container mt-5 text-center flex h-full grid grid-cols-2 gap-4 mt-5 flex justify-center"
    >
      <div className="bg-gray-100 p-4 rounded-md  bg-green-500 h-20"
     
      >
        <h2 className="text-xl font-bold text-center 
          ">My Events</h2>
        </div>


        <div className="bg-gray-100 p-4 rounded-md bg-red-500  h-20 "
         onClick={() => 
          handleButtonClick("addEvent")
          
          
          // navigate("/myevents/addevent")
        }
        >
        <h2 className="text-xl font-bold text-center
        ">
        Add Event</h2>
        </div>
        <div className="bg-gray-100 p-4 rounded-md bg-blue-500  "
          onClick={() => navigate("/myevents/showall")}

        >
        <h2 className="text-xl font-bold">Show All Events</h2>

        </div>


   
    </div>
    
    </>

  );
}
export default MyEvents;
