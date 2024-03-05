import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext";
import { SpinnerDotted } from "spinners-react";

function MyEvents({ handleButtonClick }) {
  // const [allEvents, setAllEvents] = useState([]);
  const { contacts, setContacts, allEvents, setAllEvents, userData } =
    useAuth();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  useEffect(() => {
    if (allEvents.length > 0) {
      setFilteredEvents(allEvents);
    }
  }, [allEvents]);
  //  -------------------get contacts---------------------
  useEffect(() => {
    // getContacts();
    axios

      .post(`${import.meta.env.VITE_API_URL}/user/contacts/allforuser`, {
        user: userData._id,
      })
      .then((response) => {
        setContacts(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Server Error", error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  // -------------------get events---------------------

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/events`,
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
  const [event, setEvent] = useState({
    actionDate: "",
    title: "",
    text: "",
    image: "",
    eventNR: "",
    user: userData._id,
    contact: "",
  });

  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };
  // handle delete event
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/events/${id}`
      );
      if (response.data.success) {
        setAllEvents(allEvents.filter((event) => event._id !== id));
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // click edit button as pop up






 
  


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
            {/* <img src="../../assets/add.png" alt="add" className="w-10 h-10" /> */}
            Add Event
          </h2>
        </div>

        {/* show contacts in dropdown */}
        <div className="mb-4">
          <p className="block mb-2">Choose a contact:</p>
          <select
            name="contact"
            value={event.contact}
            onChange={(e) => {
              setEvent({ ...event, contact: e.target.value });
              setFilteredEvents(
                e.target.value
                  ? allEvents.filter(
                      (event) => event.contact === e.target.value
                    )
                  : allEvents
              );
            }}
            className="border rounded w-full p-2"
          >
            <option value="">All contact</option>
            {Array.isArray(contacts) &&
              contacts.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.firstName}
                </option>
              ))}
          </select>
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
            {filteredEvents &&
              filteredEvents.map((event) => (
                <tr key={event._id}>
                  <td className="border px-4 py-2">{event.title}</td>
                  <td className="border px-4 py-2">
                    {formatDate(event.actionDate)}{" "}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center items-center gap-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          // handleButtonClick("editEvent", event);
                          // navigate(`/myevents/editevent/${event._id}`);
                          navigate(`/myevents/edit/${event._id}`);
                        }}
                      
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(event._id)}
                                              
                      >
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
