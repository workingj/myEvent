import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';
import { useAuth } from "../../Context/MyEventContext";

function Overview() {
  const [allEvents, setAllEvents] = useState([]);

  const [latestEventNR, setLatestEventNR] = useState(0);
  const [user, setUser] = useState("");
  const { isLoggedIn, userData } = useAuth();

  useEffect(() => {
   
//Fetch Events
    const fetchEvents = async () => {
      if (isLoggedIn) {
        setUser(userData._id)
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/events`, {
          user: userData._id,
        });
        console.log('from Overview',response.data);
        const responseData = response.data;
        if (responseData.success && Array.isArray(responseData.data)) {
          setAllEvents(responseData.data);
        } else {
          console.error('Invalid response format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    else {
      setUser("")
    }
    };
    fetchEvents();
  }, []);

  return (
    <>
    {/* //Link Div */}
    <div className="container mt-20 mx-auto max-w-6xl rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
      <h1  className="text-center text-3xl font-bold mt-5">Last 10 events</h1>
      
      <div className="container mt-5 text-center grid grid-cols-1 gap-4">
        <ul>
        {allEvents.map((event) => (
          <li
            key={event._id}
            className="bg-gray-100 p-4 rounded-md shadow-md mx-auto max-w-md"
          >
            <h2 className="text-xl font-semibold mb-2">{event.contact}</h2>
            <p className="text-gray-700">{event.title}</p>
            <p className="text-gray-700" >
              
              {event.actionDate}
              </p>
            
          </li>
        ))}
        </ul>
      </div>
    </div>

    {/* //Right Div */}
    <div className="container mt-20 mx-auto max-w-6xl rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
      <h1  className="text-center text-3xl font-bold mt-5">Next 10 events</h1>
      
      <div className="container mt-5 text-center grid grid-cols-1 gap-4">
        <ul>
        {allEvents.map((event) => (
          <li
            key={event._id}
            className="bg-gray-100 p-4 rounded-md shadow-md mx-auto max-w-md"
          >
            <h2 className="text-xl font-semibold mb-2">{event.contact}</h2>
            <p className="text-gray-700">{event.title}</p>
            <p className="text-gray-700" >
              
              {event.actionDate}
              </p>
            
          </li>
        ))}
        </ul>
      </div>
    </div>

</>
  );
}

export default Overview;
