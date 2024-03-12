import React, { useState } from "react";
import { useAuth } from "../../Context/MyEventContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditeEvent({ handleCancel, id, setEditPopup }) {
  // const { id } = useParams();
  const { allEvents, userData, contacts, template } = useAuth();
  console.log("id: " + id);
  const event = allEvents && allEvents.find((event) => event._id === id);
  const [editeEvent, setEditeEvent] = useState(event);
  const name =
    contacts &&
    editeEvent &&
    contacts.find((contact) => contact._id === editeEvent.contact);

  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/events/${id}
      `,
        editeEvent
      );

      console.log(response);
      if (response.status === 200) {
        setEditeEvent({
          actionDate: "",
          title: "",
          text: "",
          image: "",
          eventNR: 0,
          user: userData._id,
          contact: "",
          time: "",
        });
        setSending(false);
        setEditPopup(false);
        navigate("/myevents");
      }
    } catch (error) {
      setError(error.response.data.message);
      setSending(false);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  return (
    <div className="popup" onClick={handleCancel}>
      <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500 shadow  bg-white bg-opacity-80">
        <div className="popupInner" onClick={(e) => e.stopPropagation()}>
          <h2>Edit Event</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <span>
              <label htmlFor="">Contact:</label>
              <span>
                {`${name && name.firstName} ${name && name.lastName}`}
              </span>
            </span>
            <span className="hSpace">&nbsp;</span>
            <span>
              <label className="block mb-2">Title:</label>
              <input
                type="text"
                value={editeEvent && editeEvent.title}
                onChange={(e) =>
                  setEditeEvent({ ...editeEvent, title: e.target.value })
                }
                className="border rounded-full w-full p-2"
              />
            </span>
            <span>
              <label className="block mb-2">Date:</label>
              <input
                type="date"
                value={editeEvent && formatDate(editeEvent.actionDate)}
                onChange={(e) =>
                  setEditeEvent({ ...editeEvent, actionDate: e.target.value })
                }
                className="border rounded-full w-full p-2"
              />
            </span>
            <span>
              <label className="block mb-2">Time:</label>
              <input
                type="time"
                value={editeEvent && editeEvent.time}
                onChange={(e) =>
                  setEditeEvent({ ...editeEvent, time: e.target.value })
                }
                className="border rounded-full w-full p-2"
              />
            </span>

            <label className="block mb-2 max-w-24">Text:</label>
            <textarea
              value={editeEvent && editeEvent.text}
              onChange={(e) =>
                setEditeEvent({ ...editeEvent, text: e.target.value })
              }
              className="border rounded-lg w-full p-2 h-32 max-h-52"
            />
            <span>
              <div className="flex justify-center items-center">
                <img
                  src={event.image}
                  alt="template image"
                  className="w-20 h-20 rounded-full"
                />
              </div>
            </span>
            <span className="hCenter">
              <button
                type="submit"
                className="btn okBtn btnSizeB"
                disabled={sending}
              >
                Save
              </button>
              <button
                className="btn cancelBtn btnSizeB"
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditeEvent;
