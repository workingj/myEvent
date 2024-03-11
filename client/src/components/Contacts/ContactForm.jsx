import "./Contact.css";
import { useEffect, useState } from "react";
import { AddDatePopup } from "./ContactPopup.jsx";

export function ContactForm({ contactInput, handleCancel, handleOk, userID }) {
  const [load, setLoad] = useState(false);
  const [addDatePopup, setAddDatePopup] = useState();
  const [contact, setContact] = useState(
    contactInput
      ? contactInput // if contact is undefined create an empty contact object
      : {
          email: "",
          firstName: "",
          lastName: "",
          zipcode: "",
          city: "",
          street: "",
          dates: [],
          user: userID,
        }
  );

  return (
    <form
      onSubmit={(e) => {
        handleOk(e, contact);
        handleCancel(e);
      }}
    >
      <span>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={contact ? contact.email : ""}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={contact ? contact.firstName : ""}
          onChange={(e) =>
            setContact({ ...contact, firstName: e.target.value })
          }
          required
        />
      </span>
      <span>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={contact ? contact.lastName : ""}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
          required
        />
      </span>
      <span>
        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          name="zipcode"
          value={contact ? contact.zipcode : ""}
          onChange={(e) => setContact({ ...contact, zipcode: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={contact ? contact.city : ""}
          onChange={(e) => setContact({ ...contact, city: e.target.value })}
        />
      </span>
      <span>
        <label htmlFor="street">Street:</label>
        <input
          type="text"
          name="street"
          onChange={(e) => setContact({ ...contact, street: e.target.value })}
          value={contact ? contact.street : ""}
        />
      </span>
      <span className="hCenter">
        <strong>Dates</strong>
      </span>
      <hr />
      <div id="Dates">
        {contact.dates[0] &&
          contact.dates.map((date) => {
            return (
              <span>
                <label htmlFor={date.title}>{date.title}</label>
                <input
                  type="date"
                  name={date.title}
                  value={date.value.slice(0, 10)}
                  onChange={(e) => {
                    const data = contact;

                    data.dates.map((dataDate) => {
                      console.log(dataDate.value, e.target.value);
                      dataDate.title == date.title &&
                        (dataDate.value = e.target.value);
                    });

                    setContact(data);
                    setLoad(!load);
                  }}
                />
              </span>
            );
          })}
        <span className="hCenter">
          <button
            className="btn editBtn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAddDatePopup(true);
            }}
          >
            Add Date
          </button>
        </span>
      </div>
      <span className="vSpace"></span>
      <span className="hCenter">
        <button type="submit" className="btn okBtn">
          Ok
        </button>
        <button className="btn cancelBtn" onClick={(e) => handleCancel(e)}>
          Cancel
        </button>
      </span>
      {addDatePopup && (
        <AddDatePopup
          closePopup={(e) => {
            setAddDatePopup(false);
          }}
          contact={contact}
          setContact={setContact}
        />
      )}
    </form>
  );
}
