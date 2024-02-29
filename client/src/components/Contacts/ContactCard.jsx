import React, { useRef, useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";

export default function ContactCard({ Contact }) {
  return (
    <div name="ContactCard" className="ContactCard">
      <DefaultAvatar Contact={Contact} />
      <h3 className="cName">
        {Contact.firstName} {Contact.last}
      </h3>
      <span className="cData">{Contact.email}</span>
      <span className="vSpace">&nbsp;</span>
      <span className="cBirthday">{Contact.dates.birthday}</span>
      <span className="cData">{Contact.city}</span>
      <span className="cData">{Contact.street}</span>
      <span className="vSpace">&nbsp;</span>
      <button className="editBtn">Edit</button>
    </div>
  );
}

function DefaultAvatar({ Contact }) {
  return (
    <div name="DefaultAvatar" className="DefaultAvatar">
      <span className="initialen">
        {Contact.firstName[0]}.{Contact.last[0]}.
      </span>
      <img src={defaultAvatar} alt="" />
    </div>
  );
}
