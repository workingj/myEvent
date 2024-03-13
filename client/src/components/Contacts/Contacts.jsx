import ContactCard from "./ContactCard";
import AddContactCard from "./AddContactCard";
import "./Contact.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validator from "validator";
import { AddPopup, EditPopup, DateTitlePopup } from "./ContactPopup.jsx";
import { useTranslation } from "react-i18next";



export default function Contacts() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const contactCache = useRef();
  const { userData } = useAuth();
  const [isEdating, setIsEdating] = useState(false);
  // const [fillter, setFillter] = useState([]);

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
  }, [addPopup, editPopup, deletePopup, isEdating, contacts]);

  return (
    <>
      <div className="m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        <h2>{t('CONTACTS')}</h2>
        <div className="Container">
          <AddContactCard handleAdd={handleAdd} />
          {contacts &&
            contacts.map((contact) => (
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
              setIsEdating={setIsEdating}
              isEdating={isEdating}
              setContact={setContacts}
            />
          )}
          {deletePopup && (
            <DateTitlePopup
              contact={contactCache.current}
              handleCancel={handleCancel}
              setDeletePopup={setDeletePopup}
              deletePopup={deletePopup}
              setContact={setContacts}
            />
          )}
          {addPopup && (
            <AddPopup
              handleCancel={handleCancel}
              userID={userData._id}
              contacts={contacts}
              setContact={setContacts}
            />
          )}
        </div>
      </div>
    </>
  );
}
