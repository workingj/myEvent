import "./Contact.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validator from "validator";
import { ContactForm } from "./ContactForm";

export function AddPopup({ handleCancel, userID }) {
  const navigate = useNavigate();

  // Add new contact
  const handleAddOk = async (e, contact) => {
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
      if (response.status === 201) {
        toast.success("Contact successfully created!");
        navigate("/home/contacts");
      }
    } catch (error) {
      console.error("ERR form handle Ok", error);
      toast.error(error.response.data.message || "Could not create Contact!");
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

export function EditPopup({ contact, handleCancel }) {
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
      if (response.status === 201) {
        toast.success("Successfully Updated.");
        navigate("user/contacts");
      }
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

export function DateTitlePopup({ contact, handleCancel }) {
  const navigate = useNavigate();

  // Delete contact
  const handleDeleteOk = async (contact) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/user/contacts/${contact._id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Contact successfully deleted!");
        navigate("user/contacts");
      }
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
            className="okBtn"
            onClick={(e) => {
              handleDeleteOk(contact);
              handleCancel(e);
            }}
          >
            Ok
          </button>
          <button className="cancelBtn" onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}

export function AddDatePopup({ closePopup, contact, setContact }) {
  const [title, setTitle] = useState("");

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
            className="okBtn"
            onClick={(e) => {
              e.stopPropagation();
              const D = new Date();
              const data = contact;
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
          <button className="cancelBtn" onClick={(e) => closePopup()}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}
