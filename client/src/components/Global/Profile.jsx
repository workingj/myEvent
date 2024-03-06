import React from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import { useAuth } from "../../Context/MyEventContext";

export default function Profile({ User }) {
  const { userData ,images} = useAuth();
  return (
    <>
      <img src={images ? images : defaultAvatar} alt=""    className="rounded-full h-32 w-32 m-4"/>
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
