import React, { useRef, useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";

export default function ContactCard({ contact }) {
  return (
    <div className="ContactCard">
      <DefaultAvatar contact={contact} />
      <h3 className="cName">
        {contact.firstName} {contact.last}
      </h3>
      <span className="cData">{contact.email}</span>
      &nbsp;
      <span className="cBirthday">{contact.dates.birthday}</span>
      <span className="cData">{contact.city}</span>
      <span className="cData">{contact.street}</span>
      &nbsp;
      <button className="btn">Edit</button>
    </div>
  );
}

function DefaultAvatar({ contact }) {
  return (
    <div className="DefaultAvatar">
      <span className="initialen">
        {contact.firstName[0]}.{contact.last[0]}.
      </span>
      <img src={defaultAvatar} alt="" />
    </div>
  );
}
