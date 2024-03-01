import React, { useRef, useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";

export default function ContactCard({ Contact, editHandler, deleteHandler }) {
  let date = new Date(Contact.dates.birthday);
  date = `
    ${date.getDate().toString().padStart(2, "0")}.${date
    .getMonth()
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return (
    <div name="ContactCard" className="ContactCard">
      <DefaultAvatar Contact={Contact} />
      <h3 className="cName">
        {Contact.firstName} {Contact.lastName}
      </h3>
      <span className="cData">{Contact.email}</span>
      <span className="vSpace">&nbsp;</span>
      <span className="cBirthday">{date}</span>
      <span className="cData">
        {Contact.zipcode} {Contact.city}
      </span>
      <span className="cData">{Contact.street}</span>
      <span className="vSpace">&nbsp;</span>
      <span>
        <button className="editBtn" onClick={editHandler}>
          Edit
        </button>
        <button className="deleteBtn" onClick={deleteHandler}>
          Delete
        </button>
      </span>
    </div>
  );
}

function DefaultAvatar({ Contact }) {
  return (
    <div name="DefaultAvatar" className="DefaultAvatar">
      <span className="initialen">
        {Contact.firstName[0]}
        {Contact.lastName[0]}
      </span>
      <img src={defaultAvatar} alt="" />
    </div>
  );
}
