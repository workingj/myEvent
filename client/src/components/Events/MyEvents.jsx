import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext";

function MyEvents({ handleButtonClick }) {
  // const [allEvents, setAllEvents] = useState([]);
  const { allEvents, setAllEvents, userData } = useAuth();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/events`,
          {
            user: userData._id,
          }
        );
        const responseData = response.data;
        if (responseData.success && Array.isArray(responseData.data)) {
          setAllEvents(responseData.data);
          console.log(responseData.data);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      {/* add cards for events */}
      <div className="container mt-5 text-center flex justify-center items-center flex-col gap-5">
        <div
          className=" cursor-pointer height-20 bg-blue-200 p-5 rounded-lg shadow-lg hover:bg-blue-300"
          onClick={
            () => handleButtonClick("addEvent")

            // navigate("/myevents/addevent")
          }
        >
          <h2 className="text-xl font-bold text-center text-blue-800 hover:text-blue-900">
            Add Event
          </h2>
        </div>
        {/* table for data */}
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((event) => (
              <tr key={event._id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">
                  {formatDate(event.actionDate)}{" "}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MyEvents;
