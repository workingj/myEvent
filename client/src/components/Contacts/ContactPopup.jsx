import "./Contact.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validator from "validator";
import { ContactForm } from "./ContactForm";


export function AddPopup({ handleCancel, userID ,setContacts,contacts}) {
  const navigate = useNavigate();

  // Add new contact
  const handleAddOk = async (e, contact,setContact) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/contacts/`,
        {
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
          zipcode: contact.zipcode,
          city: contact.city,
          street: contact.street,
          dates: contact.dates,
          user: contact.user,
        },
        {
          withCredentials: true,
        }
      );
      //     setContact((prev) => prev.map((c) => (c._id === contact._id ? contact : c)));
      if (response.status === 201) {
    
        toast.success("Contact successfully created!");
        setContact((prev) => [...prev,contact]);

        
        // setAllEvents([...allEvents, response.data]);
        
        console.log(response&&response.data.data);

        // navigate("/home/contacts");
      }
      
    } catch (error) {
      console.error("ERR form handle Ok", error);
      toast.error("Could not create Contact!");
    }
  };

  return (
    <div className="popup" onClick={(e) => handleCancel(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Add Contact</h3>
        <ContactForm
          contactInput={undefined}
          handleCancel={handleCancel}
          handleOk={handleAddOk}
          userID={userID}
        />
      </div>
    </div>
  );
}

export function EditPopup({ contact, handleCancel,isEdating, setIsEdating, setContact}) {
  const navigate = useNavigate();

  // Edit existing contact
  const handleEditOk = async (e, contact) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/contacts/${contact._id}`,
        {
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
          zipcode: contact.zipcode,
          city: contact.city,
          street: contact.street,
          dates: contact.dates,
        },
        {
          withCredentials: true,
        }
      );
     
        toast.success("Successfully Updated.");
        setContact((prev) => prev.map((c) => (c._id === contact._id ? contact : c)));
        // navigate("user/contacts");
        setIsEdating(!isEdating);
    
    } catch (error) {
      toast.error(error.response.data.error || "Could not Update Contact!");
    }
  };

  return (
    <div className="popup" onClick={(e) => handleCancel(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Contact</h3>
        <ContactForm
          contactInput={contact}
          handleCancel={handleCancel}
          handleOk={handleEditOk}
        />
      </div>
    </div>
  );
}

export function DateTitlePopup({ contact, handleCancel,setDeletePopup,deletePopup, setContact }) {
  const navigate = useNavigate();
  const {  userData } =
  useAuth();

  const handleDeleteAllEvents = async () => {
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(`${VITE_API_URL}/user/events/allforcontact`, {
        data: { user: userData._id, contact: contact._id 
         }
      });
      toast.success("All events deleted successfully");

    } catch (error) {
      console.error("error deleting all events", error);
      toast.error("All events not deleted");
    }
  };


  // Delete contact
  const handleDeleteOk = async (contact) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/contacts/${contact._id}`,
        {
          withCredentials: true,
        }
      );
      
        handleDeleteAllEvents();
        setContact((prev) => prev.filter((c) => c._id !== contact._id));
        toast.success("Contact successfully deleted!");
        navigate("/home/contacts");
      
    } catch (error) {
      toast.error(error.response.data.error || "Could not delete Contact!");
    }
  };

  return (
    <div className="popup" onClick={(e) => handleCancel(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Contact ?</h3>
        <span className="hCenter">
          <button
            className="btn okBtn"
            onClick={(e) => {
              handleDeleteOk(contact);
              handleCancel(e);
              setDeletePopup(!deletePopup);
            }}
          >
            Ok
          </button>
          <button className="btn cancelBtn" onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}

export function AddDatePopup({ closePopup, contact, setContact }) {
  const [title, setTitle] = useState("");
  const data = contact;

  return (
    <div className="popup layer2" onClick={(e) => closePopup()}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Choose title</h3>
        <span className="hCenter">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </span>
        <span className="hCenter">
          <button
            className="btn okBtn"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              const D = new Date();
              data.dates.push({
                title: title,
                value: D.toISOString().split("T")[0],
              });
              setContact(data);
             
              closePopup();
            }}
          >
            Ok
          </button>
          <button className="btn cancelBtn" onClick={(e) => closePopup()}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}
