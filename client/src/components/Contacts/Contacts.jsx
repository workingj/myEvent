import React from "react";
import ContactCard from "./ContactCard";
import "./Contact.css";

// Placeholder data for contactCard Component
const Contact = {
  email: "email@provider.net",
  firstName: "Firstname",
  last: "Lastname",
  city: "Homestadt",
  street: "Knownstreet 7",
  dates: {
    birthday: "06.11.1998",
  },
};

export default function Contacts() {


  return (
    <>
      <h2>CONTACTS</h2>
      <div className="Contacts">
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
        <ContactCard Contact={Contact} />
      </div>
    </>
  );
}
