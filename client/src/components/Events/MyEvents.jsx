import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext";
import { SpinnerDotted } from "spinners-react";
import EditeEvent from "./EditeEvent.jsx";
import AddEvent from "./AddEvent.jsx";
import plus from "../../assets/plus.svg";

function MyEvents({ handleButtonClick }) {
  // const [allEvents, setAllEvents] = useState([]);
  const { contacts, setContacts, allEvents, setAllEvents, userData, template } =
    useAuth();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [eventId, setEventId] = useState("");
  // const [firstSentence, setFirstSentence] = useState(null);
  // const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (allEvents.length >= 0) {
      setFilteredEvents(allEvents);
    }
  }, [allEvents, addPopup, editPopup, deletePopup]);

  // fetshing gift api from

  const handleCancel = (e) => {
    e.stopPropagation();
    editPopup && setEditPopup(false);
    deletePopup && setDeletePopup(false);
    addPopup && setAddPopup(false);
  };

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
  }, [addPopup, editPopup, deletePopup]);

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

  // m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full
  // container m-4 text-center flex justify-center items-center flex-col gap-5 w-full

  return (
    <>
      <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        <h2>MY EVENTS</h2>
        <div className="Container m-4 text-center flex justify-center items-center flex-col gap-5 w-full">
          <div
            className="addEventBtn cursor-pointer border rounded-md border-gray-400"
            onClick={
              () =>
                //  handleButtonClick("addEvent")
                {
                  setAddPopup(true);
                }

              // navigate("/myevents/addevent")
            }
          >
            <img src={plus} alt="add" className="w-20 h-20" />
          </div>

          {/* show contacts in dropdown */}
          <div className="mb-4">
            <strong className="block mb-2">Filter for Contacts:</strong>
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
          {loading ? (
            <SpinnerDotted size="100" color="#686769" />
          ) : (
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Content</th>
                  <th className="px-4 py-2">image</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents &&
                  filteredEvents.map((event) => (
                    <tr key={event._id}>
                      <td className="border px-4 py-2">
                        {contacts &&
                        contacts.find(
                          (contact) => contact._id === event.contact
                        )
                          ? contacts.find(
                              (contact) => contact._id === event.contact
                            ).firstName +
                            " " +
                            contacts.find(
                              (contact) => contact._id === event.contact
                            ).lastName
                          : "Unknown Contact"}
                      </td>
                      <td className="border px-4 py-2">{event.title}</td>
                      <td className="border px-4 py-2">
                        {event.text.split(".")[0] + " ..."}
                      </td>
                      <td className="border px-4 py-2">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        {formatDate(event.actionDate)}
                        {` @ ${event.time}`}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center items-center gap-2 flex-wrap">
                          <button
                            className="btn editBtn"
                            onClick={() => {
                              // handleButtonClick("editEvent", event);
                              // navigate(`/myevents/editevent/${event._id}`);

                              //  navigate(`/myevents/edit/${event._id}`);
                              setEventId(event._id);
                              setEditPopup(true);
                            }}
                          >
                            Edit
                          </button>
                          <span className="vSpace"></span>
                          <button
                            className="btn deleteBtn"
                            onClick={() => {
                              setEventId(event._id);
                              setDeletePopup(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          {addPopup && (
            <AddEvent handleCancel={handleCancel} setAddPopup={setAddPopup} />
          )}

          {editPopup && (
            <EditeEvent
              id={eventId}
              handleCancel={handleCancel}
              setEditPopup={setEditPopup}
            />
          )}
          {deletePopup && (
            <div className="popup" onClick={handleCancel}>
              <div className="popupInner" onClick={(e) => e.stopPropagation()}>
                <h2>Do you want to delete this event?</h2>
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => {
                      handleDelete(eventId);
                      setDeletePopup(false);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeletePopup(false)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default MyEvents;
