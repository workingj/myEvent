import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";

function AddEvent({ handleButtonClick}) {
  const [allEnents, setAllEvents] = useState([]);
  const [latestEventNR, setLatestEventNR] = useState(0);
  const [isImage, setIsImage] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/events");
        const responseData = response.data;
        if (responseData.success && Array.isArray(responseData.data)) {
          setAllEvents(responseData.data);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);
  const latestEvent = () => {
    if (allEnents.length === 0) {
      return 1;
    }
    const latestEvent = allEnents.reduce((acc, event) => {
      if (event.eventNR > acc) {
        return event.eventNR;
      }
      return acc;
    }, 0);
    return latestEvent + 1;
  };
  useEffect(() => {
    setLatestEventNR(latestEvent());
    console.log(latestEventNR);
  }, [allEnents]);

  const [sending, setSending] = useState(false);
  const [event, setEvent] = useState({
    actionDate: "",
    title: "",
    text: "",
    image: "",
    eventNR: 2,
    user: "65dc93f865137995cc7ea9a5",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const response = await axios.post("http://localhost:8000/events", event);
      console.log(response);
      if (response.status === 201) {
        setEvent({
          actionDate: "",
          title: "",
          text: "",
          image: "",
          eventNR: latestEventNR,
          user: "65dc93f865137995cc7ea9a5",
        });
        setSending(false);
        navigate("/myevents");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating event");
      setSending(false);
    }
  };
  const handleChange = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };
  if (sending) {
    return (
      <div className="">
        <SpinnerDotted
          size={50}
          thickness={100}
          speed={100}
          color="rgba(57, 107, 172, 1)"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md mt-20 rounded-xl shadow-xl shadow-gray-500">
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Create an Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <p className="block mb-2">Action Date:</p>
            <input
              type="date"
              name="actionDate"
              value={event.actionDate}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Title:</p>
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Text:</p>
            <input
              type="text"
              name="text"
              value={event.text}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <p className="block mb-2">Image-url:</p>
            <input
              type="text"
              name="image"
              value={event.image}
              onChange={handleChange}
              className="border rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4"
          >
            ADD EVENT
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
