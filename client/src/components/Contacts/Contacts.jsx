import ContactCard from "./ContactCard";
import AddContactCard from "./AddContactCard";
import "./Contact.css";
import { useEffect, useState } from "react";
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
  },
};

// const handleCreateContact = async (e) => {
//   try {
//     const result = await axios.post(
//       `${import.meta.env.VITE_API_URL}/user/login`,
//       {
//         email,
//         password,
//       },
//       {
//         withCredentials: true,
//       }
//     );
//     if (result.status === 200) {
//       toast.success("Successfully logedin!");
//       checkUser();
//       setIsLoggedIn(true);
//       navigate("/");
//     }
//   } catch (error) {
//     setError(error.response.data.message);
//     toast.error("Login failed!");
//   }
// };

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);

  function editHandler() {
    setEditPopup(true);
    console.log("editPopup", editPopup);
  }

  function deleteHandler() {
    setDeletePopup(true);
    setDeletePopup(true);
    console.log("deletePopup", deletePopup);
  }

  function okHandler() {
    setEditPopup(false);
    console.log("editPopup", editPopup);
  }

  function cancelHandler(e) {
    e.stopPropagation();
    setEditPopup(false);
    setDeletePopup(false);
    setAddPopup(false);
    console.log(
      "addPopup",
      addPopup,
      "editPopup",
      editPopup,
      "deletePopup",
      deletePopup
    );
  }

  function addHandler() {
    setAddPopup(true);
    console.log("addPopup", addPopup);
  }

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/contacts`)
      .then((res) => {
        setContacts(res.data);
        console.log("User/Contacts", res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.stack);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <h2>CONTACTS</h2>
      <div className="Contacts">
        <AddContactCard addHandler={addHandler} />
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            Contact={contact}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
        {editPopup && <EditPopup cancelHandler={cancelHandler} />}
        {deletePopup && <DeletePopup cancelHandler={cancelHandler} />}
        {addPopup && <AddPopup cancelHandler={cancelHandler} />}
      </div>
    </>
  );
}

function DeletePopup({ cancelHandler }) {
  return (
    <div className="popup" onClick={(e) => cancelHandler(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Contact ?</h3>
        <span className="hCenter">
          <button className="okBtn">Delete</button>
          <button className="cancelBtn" onClick={(e) => cancelHandler(e)}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
}
function EditPopup({ cancelHandler }) {
  return (
    <div className="popup" onClick={(e) => cancelHandler(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Contact</h3>
        <form action="">
          <span>
            <b>Email:</b>
            <input type="text" name="email" />
          </span>
          <span>
            <b>First Name:</b>
            <input type="text" name="firstName" />
          </span>
          <span>
            <b>Last Name:</b>
            <input type="text" name="lastName" />
          </span>
          <span>
            <b>Zipcode:</b>
            <input type="text" name="ipcode" />
          </span>
          <span>
            <b>City:</b>
            <input type="text" name="city" />
          </span>
          <span>
            <b>Street:</b>
            <input type="text" name="street" />
          </span>
          <span>
            <b>Dates:</b>
            <input type="text" name="dates" />
          </span>
          <span className="hCenter">
            <button className="okBtn">Ok</button>
            <button className="cancelBtn" onClick={(e) => cancelHandler(e)}>
              Cancel
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
function AddPopup({ cancelHandler }) {
  return (
    <div className="popup" onClick={(e) => cancelHandler(e)}>
      <div className="popupInner" onClick={(e) => e.stopPropagation()}>
        <h3>Add Contact</h3>
        <form action="">
          <span>
            <b>Email:</b>
            <input type="text" name="email" />
          </span>
          <span>
            <b>First Name:</b>
            <input type="text" name="firstName" />
          </span>
          <span>
            <b>Last Name:</b>
            <input type="text" name="lastName" />
          </span>
          <span>
            <b>Zipcode:</b>
            <input type="text" name="ipcode" />
          </span>
          <span>
            <b>City:</b>
            <input type="text" name="city" />
          </span>
          <span>
            <b>Street:</b>
            <input type="text" name="street" />
          </span>
          <span>
            <b>Dates:</b>
            <input type="text" name="dates" />
          </span>
          <span className="hCenter">
            <button className="okBtn">Ok</button>
            <button className="cancelBtn" onClick={(e) => cancelHandler(e)}>
              Cancel
            </button>
          </span>
        </form>
      </div>
    </div>
  );
}
