import React, { useRef, useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";

export default function ContactCard({
  Contact: contact,
  handleEdit,
  handleDelete,
}) {
  let date = new Date(contact.dates.birthday);
  date = `
    ${date.getDate().toString().padStart(2, "0")}.${date
    .getMonth()
    .toString()
    .padStart(2, "0")}.${date.getFullYear()}`;

  return (
    <div name="ContactCard" className="ContactCard">
      <DefaultAvatar Contact={contact}
    
      />
      <h3 className="cName">
        {contact.firstName} {contact.lastName}
      </h3>
      <span className="cData">{contact.email}</span>
      <span className="vSpace">&nbsp;</span>
      <span className="cBirthday"style={{color: contact.dates.length===0?"red":"black" }}>Dates: {contact.dates.length}</span>
      <span className="cData" >
        {contact.zipcode} {contact.city}
      </span>
      <span className="cData">{contact.street}</span>
      <span className="vSpace">&nbsp;</span>
      <span>
        <button className="editBtn" onClick={() => handleEdit(contact)}>
          Edit
        </button>
        <button className="deleteBtn" onClick={() => handleDelete(contact)}>
          Delete
        </button>
      </span>
    </div>
  );
}

function DefaultAvatar({ Contact }) {

  const [avatarPopup, setAvatarPopup] = useState(false);
  const [file, setFile] = useState(null);
  const { userData } = useAuth();

  const [changImage, setChangImage] = useState(false);


   // -------------------avatar change--------------
   const handleAvatarChange = () => {
   
    if (!file) {
      toast.error("please select a Card to upload");
     
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    console.log("file: ", file);
    try {
      axios
        .put(`${VITE_API_URL}/test/upload/${Contact._id }`, formData)
        .then((res) => {
          console.log(res);
          setChangImage(!changImage)
          toast.success("Avatar updated successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Avatar not updated");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div name="DefaultAvatar" className="DefaultAvatar cursor-pointer"
    onClick={() =>
      setAvatarPopup(!avatarPopup)
    
    }
    >
      <span className="initialen">
        {Contact.image ? "" : Contact.firstName[0]}
        {Contact.image ? "" : Contact.lastName[0]}
      </span>
      <img src={Contact.image ? Contact.image : defaultAvatar

      } alt="" />
      {avatarPopup && (
      <div className="popup" onClick={() => setAvatarPopup(!avatarPopup)}>
        <div className="popupInner" onClick={(e) => e.stopPropagation()}>
          <h3>Change Avatar</h3>
          <span className="hCenter">
            <input type="file" className=" shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
            "  onChange={(e) => 
              setFile(e.target.files[0])
              }/>
          </span>
          <span className="hCenter">
            <button
              className="okBtn"
              onClick={() => {
                handleAvatarChange();
                setAvatarPopup(!avatarPopup);
              }}
            >
              Ok
            </button>
            <button
              className="cancelBtn"
              onClick={() => setAvatarPopup(false)}
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    )}
    </div>
 

  );

  // 
}
