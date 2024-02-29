import React, { useState } from "react";
import validator from 'validator';

import "./Styles/settings.css";

function Settings() {
  const [data, setData] = useState({
    first_name: "Issa",
    last_name: "alali",
    email: "issa@exp.com",
    avater: "defaultAvatar.svg",
    birthdate: "12/12/1990",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  // -------------------format date--------------
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // validate form
  const validateForm = () => {
    const newErrors = {};

    if (!validator.isAlpha(data.first_name)) {
      newErrors.first_name = "Please enter a valid name";
    }

    if (!validator.isAlpha(data.last_name)) {
      newErrors.last_name = "Please enter a valid name";
    }

    if (!validator.isEmail(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!validator.isDate(data.birthdate)) {
      newErrors.birthdate = "Please enter a valid date";
    }

    if (!validator.isURL(data.avater)) {
      newErrors.avater = "Please enter a valid URL";
    }

    setErrors({ ...newErrors });

    return Object.keys(newErrors).length === 0;
  };
  // -------------------handle button--------------

  const handleButton = (idName, span) => {
    const idInbox = document.getElementById(idName);
    const spanButton = document.getElementById(span);
    const savebtn = document.getElementById("save");
    const cancelbtn = document.getElementById("cancel");
     

    if (isEditMode) {
    
      idInbox.readOnly = true;
      idInbox.style.backgroundColor = "lightgray";
      spanButton.innerHTML = "Edit";
      setIsEditMode(false);
      // savebtn.style.display = "visible";
      // cancelbtn.style.display = "visible";
    } else {
      idInbox.readOnly = false;
      idInbox.focus();
      spanButton.innerHTML = "Save";
      idInbox.style.backgroundColor = "white";
      setIsEditMode(true);
    }
    
    
  };
  // -------------------avatar change--------------
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  // -------------------form submit--------------
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", data);
  };
// ------------ validate form----------------
 
  return (
    <div className="settings">
      <h1>Settings your Profile</h1>
      <div>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          className=" formsitting
       "
        >
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={data.first_name}
              className={`border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 m-2 w-72 bg-gray-100`}
              onChange={(e) => {
                setData({ ...data, first_name: e.target.value }, () => validateForm());
              }}
              readOnly
            />
              
            {/* edit button */}
            <span
              id="span-first-name"
              className="btn-left my-2 hover:bg-blue-200 text-blue-500 cursor-pointer"
              onClick={() => handleButton("first_name", "span-first-name")}
            >
              Edit
            </span>
          </div>
          <br />
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={data.last_name}
              className="border border-gray-300 rounded-md p-2 m-2  w-72 bg-gray-100"
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
              readOnly
            />
            <span
              className="btn-left my-2 hover:bg-blue-200 text-blue-500 cursor-pointer"
              id="span-last-name"
              onClick={() => handleButton("last_name", "span-last-name")}
            >
              Edit
            </span>
          </div>

          <br />
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              className="border border-gray-300 rounded-md p-2 m-2  w-72 bg-gray-100"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              readOnly
            />
            <span
              className="btn-left my-2 hover:bg-blue-200 text-blue-500 cursor-pointer"
              id="span-email"
              onClick={() => handleButton("email", "span-email")}
            >
              Edit
            </span>
          </div>
          <br />
          <div>
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formatDate(data.birthdate)}
              className="border border-gray-300 rounded-md p-2 m-2  w-72 bg-gray-100"
              onChange={(e) => setData({ ...data, birthdate: e.target.value })}
              readOnly
            />
            <span
              className="btn-left my-2 hover:bg-blue-200 text-blue-500 cursor-pointer"
              id="span-birthdate"
              onClick={() => handleButton("birthdate", "span-birthdate")}
            >
              Edit
            </span>
          </div>
          <br />
          <div>
            <label htmlFor="avater">Avater</label>
            <input
              type="file"
              id="avater"
              name="avater"
              className="border border-gray-300 rounded-md p-2 m-2  w-72 bg-gray-100"
              onChange={(e) => handleAvatarChange(e)}
              readOnly
            />
          </div>
          <br />
          <div
            className="flex justify-center gap-4 m-4  
          "
          >
            <button
              id="save"
              type="submit"
              className="bg-blue-500 text-white text-sm rounded-md 
            border-solid border-2 border-blue-500 py-1 px-1 hover:bg-blue-800 transition duration-300 font-oleo font-bold py-1 px-2"
            >
              Save
            </button>
            <button
              id="cancel"
              type="reset"
              className="bg-red-500 text-white text-sm rounded-md 
            border-solid border-2 border-red-500 py-1 px-1 hover:bg-red-800 transition duration-300 font-oleo font-bold py-1 px-2 mr-4"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
