import ContactCard from "./ContactCard";
import AddContactCard from "./AddContactCard";
import "./Contact.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validator from "validator";
import { AddPopup, EditPopup, DeletePopup } from "./ContactPopup.jsx";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const contactCache = useRef();
  const { userData } = useAuth();

  function handleEdit(contact) {
    contactCache.current = contact;
    setEditPopup(true);
  }

  function handleDelete(contact) {
    contactCache.current = contact;
    setDeletePopup(true);
  }

  function handleCancel(e) {
    e.stopPropagation();
    addPopup && setAddPopup(false);
    editPopup && setEditPopup(false);
    deletePopup && setDeletePopup(false);
  }

  function handleAdd() {
    setAddPopup(true);
  }

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/user/contacts/allforuser`, {
        user: userData._id,
      })
      .then((res) => {
        setContacts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("ERR getContacts:", error.stack);
        setLoading(false);
        setError(true);
      });
  }, [addPopup, editPopup, deletePopup]);

  return (
    <>
      <h2>CONTACTS</h2>
      <div className="Contacts">
        <AddContactCard handleAdd={handleAdd} />
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            Contact={contact}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
        {editPopup && (
          <EditPopup
            contact={contactCache.current}
            handleCancel={handleCancel}
          />
        )}
        {deletePopup && (
          <DeletePopup
            contact={contactCache.current}
            handleCancel={handleCancel}
          />
        )}
        {addPopup && (
          <AddPopup handleCancel={handleCancel} userID={userData._id} />
        )}
      </div>
    </>
  );
}
