import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext";
import { SpinnerDotted } from "spinners-react";
import EditeEvent from "./EditeEvent.jsx";
import AddEvent from "./AddEvent.jsx";
import plus from "../../assets/plus.svg";
import Lottie from "lottie-react";
import doneyAnimation from "../../../public/annimation/done.json";
import { useTranslation } from "react-i18next";

function MyEvents({ handleButtonClick }) {
  // const [allEvents, setAllEvents] = useState([]);
  const { t } = useTranslation();

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
  const [animationPopup, setAnimationPopup] = useState(false);

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
        setAnimationPopup(true);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Show image in popup if clicked
  const showImage = (e) => {
    const img = e.target;
    const src = img.src;
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.paddingTop = "100px";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgb(0,0,0)";
    modal.style.backgroundColor = "rgba(0,0,0,0.9)";
    modal.onclick = () => {
      modal.style.display = "none";
    };
    const modalImg = document.createElement("img");
    modalImg.src = src;
    modalImg.style.margin = "auto";
    modalImg.style.display = "block";
    modalImg.style.width = "80%";
    modalImg.style.maxWidth = "700px";
    modalImg.style.maxHeight = "500px";
    modalImg.style.objectFit = "contain";
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimationPopup(false);
    }, 3000);
  }, [animationPopup]);

  return (
    <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
      <h2>{t("MY EVENTS")}</h2>
      <div className="Container m-4 text-center flex justify-center items-center flex-col gap-5 w-full">
        <div
          className="addEventBtn cursor-pointer border rounded-md border-gray-400"
          onClick={() => {
            setAddPopup(true);
          }}
        >
          <img src={plus} alt="add" className="w-20 h-20" />
        </div>

        {/* show annimation for 3 second */}
        {animationPopup && (
          <div className="popup" onClick={() => setAnimationPopup(false)}>
            <Lottie
              animationData={doneyAnimation}
              className=""
              style={{
                width: "100%",
                height: "300px",
                margin: "auto",
                display: "block",
                color: "#fcd133",
              }}
              loop={false}
            />
          </div>
        )}

        {/* show contacts in dropdown */}
        <div className="mb-4">
          <strong className="block mb-2">{t("Filter for Contacts:")}</strong>
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
            <option value="">{t("All contact")}</option>
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
                <th className="px-4 py-2">{t("Title")}</th>
                <th className="px-4 py-2">{t("Content")}</th>
                <th className="px-4 py-2">{t("image")}</th>
                <th className="px-4 py-2">{t("Date")}</th>
                <th className="px-4 py-2">{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents &&
                filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td className="border px-4 py-2">
                      {contacts &&
                      contacts.find((contact) => contact._id === event.contact)
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
                      {event.text && event.text.length > 50
                        ? event.text.substring(0, 100) + "..."
                        : event.text}
                    </td>
                    <td className="border px-4 py-2">
                      <img
                        id="image"
                        src={event.image}
                        alt={event.title}
                        className="w-20 h-20 object-cover rounded-xl"
                        onClick={showImage}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      {formatDate(event.actionDate)}
                      {` @ ${event.time}`}
                    </td>
                    <td className="border px-4 py-2">
                      <div
                        className="flex justify-center items-center gap-2 
                         flex-wrap"
                      >
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
                          {t("Edit")}
                        </button>
                        <span className="vSpace"></span>
                        <button
                          className="btn deleteBtn"
                          onClick={() => {
                            setEventId(event._id);
                            setDeletePopup(true);
                          }}
                        >
                          {t("Delete")}
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
                  className="btn okBtn btnSizeB"
                >
                  {t("Yes")}
                </button>
                <button
                  onClick={() => setDeletePopup(false)}
                  className="btn deleteBtn btnSizeB"
                >
                  {t("No")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default MyEvents;
