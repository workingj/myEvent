import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
import { useAuth } from "../../Context/MyEventContext";

function AddEvent({handleCancel,setAddPopup}) {
  const { contacts, setContacts, allEvents, setAllEvents, userData } =
    useAuth();
  const [latestEventNR, setLatestEventNR] = useState(0);

  const [isImage, setIsImage] = useState(false);
  // const [contacts, setContacts] = useState([]);

  const [sending, setSending] = useState(false);
  // -------------------latest event number---------------------

  useEffect(() => {
    const latestEvent = allEvents.length;
    allEvents && setLatestEventNR(latestEvent);
  }, [allEvents]);
  useEffect(() => {
    allEvents && console.log(latestEventNR);
  }, [allEvents]);

  const [event, setEvent] = useState({
    actionDate: "",
    title: "",
    text: "",
    image: "",
    eventNR: latestEventNR,
    user: userData._id,
    contact: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await axios.post( `${import.meta.env.VITE_API_URL}/user/events/create`, event);
      
      console.log(response);
      if (response.status === 201) {
        setEvent({
          actionDate: "",
          title: "",
          text: "",
          image: "",
          eventNR: latestEventNR,
          user: userData._id,
          contact: "",
        });
        setSending(false);
        setAddPopup(false);

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
    <div className="popup 
    ">
      <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80  
      ">
      <div className=" w-full container
      " onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Create an Event</h2>
        <form onSubmit={handleSubmit}>
          {/* choose a contact */}
          <div className="mb-4">
            <p className="block mb-2">Choose a contact:</p>
            <select
              name="contact"
              value={event.contact}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="">Choose a contact</option>
              {Array.isArray(contacts) &&
                contacts.map((contact) => (
                  <option
                    key={contact._id}
                    value={contact._id}
                    onChange={(e) =>
                      setEvent({ ...event, contact: e.target.value })
                    }
                  >
                    {contact.firstName}
                  </option>
                ))}
            </select>
          </div>

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
          <span className="hCenter">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 mt-4"
          >
            ADD EVENT
          </button>
          <button className=" bg-red-500 text-white rounded p-2 mt-4 ml-4
          " onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
          </span>
        </form>
      </div>
    </div>
    </div>
  
    </div>
  );
}

export default AddEvent;
