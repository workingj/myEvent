import React from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import { useAuth } from "../../Context/MyEventContext";

export default function Profile() {
  const { userData, images } = useAuth();
  return (
    <>
      <img
        src={images ? images : defaultAvatar}
        alt=""
        className="rounded-full h-32 w-32 mb-4"
      />
      <span className="cName">{userData.username}</span>
      <span className="">
        {userData.firstName} {userData.lastName}
      </span>
      <span className="">{userData.email}</span>
      {/* <span className="vSpace">&nbsp;</span> */}
    </>
  );
}
