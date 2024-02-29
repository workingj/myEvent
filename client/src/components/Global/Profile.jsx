import React from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";

export default function Profile({ User }) {
  return (
    <>
      <img src={User.avatar ? User.Avatar : defaultAvatar} alt="" />
      <span className="cName">{User.username}</span>
      <span className="">
        {User.firstName} {User.lastName}
      </span>
      <span className="cData">{User.email}</span>
      <span className="vSpace">&nbsp;</span>
      <button className="editBtn">Edit</button>
    </>
  );
}
