import ContactCard from "./ContactCard";
import AddContactCard from "./AddContactCard";
import "./Contact.css";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Placeholder data for contactCard Component
const Contact = {
  email: "email@provider.net",
  firstName: "Firstname",
  lastName: "Lastname",
  city: "Homestadt",
  street: "Knownstreet 7",
  dates: {
    birthday: "06.11.1998",
    marriage: "06.11.1998",
  },
};

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const contactCache = useRef();

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
      .get(`${import.meta.env.VITE_API_URL}/user/contacts`)
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.stack);
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
        {addPopup && <AddPopup handleCancel={handleCancel} />}
      </div>
    </>
  );
}

function AddPopup({ handleCancel }) {
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
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Contact successfully created!");
        navigate("/contacts");
      }
    } catch (error) {
      toast.error(error.response.data.error || "Could not create Contact!");
    }
  };

  return (
    <div className="popup" onClick={(e) => handleCancel(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Add Contact</h3>
        <ContactForm
          contact={undefined}
          handleCancel={handleCancel}
          handleOk={handleAddOk}
        />
      </div>
    </div>
  );
}

function EditPopup({ contact, handleCancel }) {
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
          user: contact.user,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success("Successfully Updated.");
        navigate("/contacts");
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
          contact={contact}
          handleCancel={handleCancel}
          handleOk={handleEditOk}
        />
      </div>
    </div>
  );
}

function DeletePopup({ contact, handleCancel }) {
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
        navigate("/contacts");
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

function ContactForm({ contact, handleCancel, handleOk }) {
  const [cTemp, setCTemp] = useState(
    contact
      ? contact // if contact is undefined create an empty contact object
      : {
          email: "",
          firstName: "",
          lastName: "",
          zipcode: "",
          city: "",
          street: "",
          dates: {
            birthday: "",
            marriage: "",
          },
        }
  );

  return (
    <form action="">
      <span>
        <b>Email:</b>
        <input
          type="text"
          name="email"
          value={cTemp ? cTemp.email : ""}
          onChange={(e) => setCTemp({ ...cTemp, email: e.target.value })}
        />
      </span>
      <span>
        <b>First Name:</b>
        <input
          type="text"
          name="firstName"
          value={cTemp ? cTemp.firstName : ""}
          onChange={(e) => setCTemp({ ...cTemp, firstName: e.target.value })}
          required
        />
      </span>
      <span>
        <b>Last Name:</b>
        <input
          type="text"
          name="lastName"
          value={cTemp ? cTemp.lastName : ""}
          onChange={(e) => setCTemp({ ...cTemp, lastName: e.target.value })}
          required
        />
      </span>
      <span>
        <b>Zipcode:</b>
        <input
          type="text"
          name="zipcode"
          value={cTemp ? cTemp.zipcode : ""}
          onChange={(e) => setCTemp({ ...cTemp, zipcode: e.target.value })}
        />
      </span>
      <span>
        <b>City:</b>
        <input
          type="text"
          name="city"
          value={cTemp ? cTemp.city : ""}
          onChange={(e) => setCTemp({ ...cTemp, city: e.target.value })}
        />
      </span>
      <span>
        <b>Street:</b>
        <input
          type="text"
          name="street"
          onChange={(e) => setCTemp({ ...cTemp, street: e.target.value })}
          value={cTemp ? cTemp.street : ""}
        />
      </span>
      <span className="hCenter">
        <strong>Dates</strong>
      </span>
      <hr />
      <span>
        <b>Birthday:</b>
        <input
          type="date"
          name="birthday"
          onChange={(e) =>
            setCTemp({
              ...cTemp,
              dates: { ...cTemp.dates, birthday: e.target.value },
            })
          }
          value={
            cTemp
              ? cTemp.dates.birthday
                ? cTemp.dates.birthday.slice(0, 10)
                : ""
              : ""
          }
          required
        />
      </span>
      <span>
        <b>Marriage:</b>
        <input
          type="date"
          name="marriage"
          onChange={(e) =>
            setCTemp({
              ...cTemp,
              dates: { ...cTemp.dates, marriage: e.target.value },
            })
          }
          value={
            cTemp
              ? cTemp.dates.marriage
                ? cTemp.dates.marriage.slice(0, 10)
                : ""
              : ""
          }
        />
      </span>
      <span className="vSpace"></span>
      <span className="hCenter">
        <button
          type="submit"
          className="okBtn"
          onClick={(e) => {
            handleOk(e, cTemp);
            handleCancel(e);
          }}
        >
          Ok
        </button>
        <button className="cancelBtn" onClick={(e) => handleCancel(e)}>
          Cancel
        </button>
      </span>
    </form>
  );
}
