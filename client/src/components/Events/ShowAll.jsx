import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SpinnerDotted } from 'spinners-react';
import axios from 'axios';

function ShowAll() {
  const [allEvents, setAllEvents] = useState([]);
  const [latestEventNR, setLatestEventNR] = useState(0);
  const [user, setUser] = useState("65dc93f865137995cc7ea9a5");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post('http://localhost:8000/events', {
          user,
        });
        const responseData = response.data;
        if (responseData.success && Array.isArray(responseData.data)) {
          setAllEvents(responseData.data);
        } else {
          console.error('Invalid response format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h1  className="text-center text-3xl font-bold mt-5">Show All Events</h1>
      
      <div className="container mt-5 text-center grid grid-cols-1 gap-4">
        {allEvents.map((event) => (
          <div
            key={event._id}
            className="bg-gray-100 p-4 rounded-md shadow-md mx-auto max-w-md"
          >
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-700">{event.text}</p>
            <img
              className="mt-3 w-full h-auto"
              src={`./${event.image}`}
              alt="event"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAll;
