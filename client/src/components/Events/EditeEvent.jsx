import React, { useState } from 'react'
import { useAuth } from '../../Context/MyEventContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditeEvent({handleCancel, id,setEditPopup}) {
  // const { id } = useParams();
  const {  allEvents, userData, contacts
  } = useAuth();
  console.log('id: '+id)
  const event = allEvents&&allEvents.find((event) => event._id === id);
  const [editeEvent, setEditeEvent] = useState(event);
  const name = contacts && editeEvent && contacts.find((contact) => contact._id === editeEvent.contact);


  
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/events/${id}
      `, editeEvent);
      
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
        setEditPopup(false)
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
    <div className="popup">
      <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <h2 className="text-21 font-semibold mb-4">Edite Event</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="block mb-2">
                <span className="font-bold">Contact: <b className="text-black"> {` ${name&&name.firstName} ${name&&name.lastName}`}</b></span>
                
              </p>
              <p className="block mb-2">Title:</p>
              <input
                type="text"
                value={editeEvent&&editeEvent.title}
                onChange={(e) => setEditeEvent({ ...editeEvent, title: e.target.value })}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="block mb-2">Date:</p>
              <input
                type="date"
                value={editeEvent&&formatDate(editeEvent.actionDate)}
                onChange={(e) => setEditeEvent({ ...editeEvent, actionDate: e.target.value })}
                className="border rounded-full w-full p-2"
              />
            </div>
            <div className="mb-4">
              <p className="block mb-2">Time:</p>
              <input
                type="time"
                value={editeEvent&&editeEvent.time}
                onChange={(e) => setEditeEvent({ ...editeEvent, time: e.target.value })}
                className="border rounded-full w-full p-2"
              />
            </div>

            <div className="mb-4">
              <p className="block mb-2">Text:</p>
              <textarea
                value={editeEvent&&editeEvent.text}
                onChange={(e) => setEditeEvent({ ...editeEvent, text: e.target.value })}
                className="border rounded-lg w-full p-2 h-32 resize-none"
              />
            </div>
            <div className="mb-4">
              <p className="block mb-2">Image:</p>
              <input
                type="file"
                onChange={(e) => setEditeEvent({ ...editeEvent, image: e.target.files[0] })}
                className="border rounded-full w-full p-2"
              />
            </div>
            <span className="hCenter">
          
              <button
                type="submit"
                className="okBtn"
                disabled={sending}
               
                >
                Save
              </button>
              <button className="cancelBtn" onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
            </span>
            </form>

            </div>
            </div>
            </div>




      
    </div>
  )
}

export default EditeEvent
