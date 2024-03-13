import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/MyEventContext.jsx";
import { SpinnerDotted } from "spinners-react";


function MyOverview({ handleButtonClick }) {
  // const [allEvents, setAllEvents] = useState([]);
  const { contacts, setContacts, allEvents, setAllEvents, userData, template,isLoggedIn } =
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

  

  // fetshing gift api from

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
      return function cleanup() {
        setFilteredEvents([]);
      };
  }, []);

  // -------------------get events---------------------

  useEffect(() => {
    const fetchEvents = async () => {
      if(isLoggedIn){
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/user/events`,
          {
            user: userData._id,
          }
        );
        const responseData = response.data;
        if (responseData.success && Array.isArray(responseData.data)) {
          setAllEvents(responseData.data.sort(function(a, b) {
            var dateA = new Date(a.actionDate);
            var dateB = new Date(b.actionDate);
            return dateB - dateA;
        }));
          
          console.log(responseData.data);
        } else {
          console.error("Invalid response format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
 
    } else {setError("Error fetching data");}
    };
    fetchEvents();
  }, [addPopup, editPopup, deletePopup]);


  useEffect(() => {
  
    if (allEvents.length >= 0) {
      setFilteredEvents(allEvents.filter(e => e.active ===false).slice(0, 10));
    }
 
  }, [allEvents, addPopup, editPopup, deletePopup]);

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

  return (
    <>
      <div className="settings mt-4 text-center  rounded-md p-4  m-auto w-3/4">

          {/* table for data */}
          {loading ? (
            <SpinnerDotted size="100" color="#686769" />
          ) : (
            <table className=" border-0  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-auto">
              <thead className="">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody className=" border-0">
                {filteredEvents &&
                  filteredEvents.map((event) => (
                    <tr className="  rounded-full shadow-xl shadow-gray-500  bg-white bg-opacity-80 mx-4 hover:cursor-pointer" key={event._id} onClick={()=>navigate('/myevents')}>
                      <td className=" px-4 py-2">
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
                      <td className=" px-4 py-2">{event.title}</td>
                      <td className=" px-4 py-2">
                        {formatDate(event.actionDate)}
                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
         
        
        </div>
      
    </>
  );
}
export default MyOverview;
