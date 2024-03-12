import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validateForm from "../../validator/formvalidator.js";
import ChangePassword from "./ChangePassword.jsx";
import { useNavigate } from "react-router-dom";

function Settings() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    images,
    setImages,
    setChangImage,
    changImage,
  } = useAuth();
  const [data, setData] = useState({
    // firstName: "Issa",
    // lastName: "alali",
    // email: "issa@exp.com",
    // avater: "defaultAvatar.svg",
    // birthDate: "12/12/1990",
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    avater: userData.avatar,
    birthDate: userData.birthDate,
  });
  const [dataDelete, setDataDelete] = useState({
    email: "",
    password: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSave, setActiveSave] = useState(false);
  const [changePasswordPopup, setChangePasswordPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const navigate = useNavigate();

  // cancle button
  const handleCancel = (e) => {
    e.stopPropagation();
    setChangePasswordPopup(false);
  };

  // -------------------format date--------------
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // -------------------handle button--------------

  const handleButton = (idName, span) => {
    const idInbox = document.getElementById(idName);
    const spanButton = document.getElementById(span);
    const savebtn = document.getElementById("save");
    const cancelbtn = document.getElementById("cancel");

    setActiveSave(true);

    if (isEditMode) {
      idInbox.readOnly = true;
      idInbox.style.backgroundColor = "lightgray";
      spanButton.innerHTML = "Edit";
      setIsEditMode(false);
      // savebtn.style.display = "visible";
      // cancelbtn.style.display = "visible";
    } else {
      idInbox.readOnly = false;
      idInbox.disabled = false;
      idInbox.focus();
      spanButton.innerHTML = "Save";
      idInbox.style.backgroundColor = "white";
      setIsEditMode(true);
    }
  };
  // -------------------avatar change--------------
  const handleAvatarChange = (e) => {
    e.preventDefault();

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
        .put(`${VITE_API_URL}/user/upload/${userData._id}`, formData)
        .then((res) => {
          console.log(res);
          setChangImage(!changImage);
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

  // -------------------form submit--------------
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      toast.error("Please save  the changes");
      return;
    }
    const newErrors = validateForm(data);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      toast.error(
        Object.values(newErrors)
          .map((value) => value)
          .join(" ")
      );
    else {
      const VITE_API_URL = import.meta.env.VITE_API_URL;

      try {
        axios
          .put(`${VITE_API_URL}/user/${userData._id}`, data)
          .then((res) => {
            console.log(res);

            toast.success("Profile updated successfully");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Profile not updated");
          });
      } catch (error) {
        console.log(error);
      }

      console.log("Form submitted:", data);
    }
  };
  //  delete all events
  const handleDeleteAllEvents = async () => {
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${VITE_API_URL}/user/events/deleteAll`,
        {
          data: { user: userData._id },
        }
      );
      toast.success("All events deleted successfully");
    } catch (error) {
      console.error("error deleting all events", error);
      toast.error("All events not deleted");
    }
  };

  //  delete all contacts
  const handleDeleteAllContacts = async () => {
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${VITE_API_URL}/user/contacts/deleteallforuser`,
        {
          data: { user: userData._id },
        }
      );
      toast.success("All contacts deleted successfully");
    } catch (error) {
      console.error("error deleting all contacts", error);
      toast.error("All contacts not deleted");
    }
  };

  // delete account

  const handleDeleteAccount = async () => {
    console.log("dataDelete", dataDelete);
    try {
      const VITE_API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.delete(
        `${VITE_API_URL}/user/${userData._id}`,
        {
          data: dataDelete,
        }
      );
      if (response.status === 200) {
        console.log("response", response);
        handleDeleteAllEvents();
        handleDeleteAllContacts();
        toast.success("Account deleted successfully");
        handleLogout();
        setIsLoggedIn(false);
        window.location = "/";
      }
    } catch (error) {
      console.error("error deleting account", error);
      toast.error("Account not deleted");
    }
  };
  return (
    <div className="m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
      <h2>Profile Settings</h2>
      <div className="Container mw-30">
        <form onSubmit={(e) => handleFormSubmit(e)} className="settingsForm">
          <div className="settings">
            <span>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={data.firstName}
                className={`border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 m-2 bg-gray-100`}
                onChange={(e) => {
                  setData({ ...data, firstName: e.target.value });
                }}
                readOnly
                disabled
              />
              <button
                id="span-first-name"
                className="btn editBtn"
                onClick={() => handleButton("firstName", "span-first-name")}
              >
                Edit
              </button>
              <span className="text-red-500">{errors.firstName}</span>
            </span>

            <span>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={data.lastName}
                className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                readOnly
                disabled
              />
              <button
                className="btn editBtn"
                id="span-last-name"
                onClick={() => handleButton("lastName", "span-last-name")}
              >
                Edit
              </button>
              <span className="text-red-500">{errors.lastName}</span>
            </span>

            <span>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                readOnly
                disabled
              />
              <button
                className="btn editBtn"
                id="span-email"
                onClick={() => handleButton("email", "span-email")}
              >
                Edit
              </button>
              <span className="text-red-500">{errors.email}</span>
            </span>

            <span>
              <label htmlFor="birthDate">Birthday</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formatDate(data.birthDate)}
                className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                onChange={(e) =>
                  setData({ ...data, birthDate: e.target.value })
                }
                readOnly
                disabled
              />
              <button
                className="btn editBtn"
                id="span-birthDate"
                onClick={() => handleButton("birthDate", "span-birthDate")}
              >
                Edit
              </button>
              <span className="text-red-500">{errors.birthDate}</span>
            </span>
            <span>
              <label htmlFor="balance">Balance</label>
              <input
                type="text"
                id="balance"
                name="balance"
                value={userData.balance + "€"}
                className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                readOnly
                disabled
              />
            </span>
          </div>

          <div className="settings">
            <span>
              <label htmlFor="balance">Charge your balance? </label>
              <button href="/paypal" className="btn editBtn">
                purchase
              </button>
            </span>
            <hr />
            <span className="tCenter">
              <label htmlFor="avater">Avatar</label>
            </span>
            <span>
              <input
                type="file"
                id="avater"
                name="avater"
                className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="text-red-500">{errors.avater}</span>

              <button
                onClick={(e) => handleAvatarChange(e)}
                type="submit"
                className="btn okBtn"
              >
                Upload
              </button>
            </span>

            <hr />
            <span>
              <label htmlFor="">Change Password</label>
              <button
                className="btn editBtn"
                onClick={() => setChangePasswordPopup(true)}
              >
                Change
              </button>
            </span>
            <hr />
            <span>
              <label>Do you want to delete your account?</label>
              <button className="btn deleteBtn" onClick={setDeletePopup}>
                Click here
              </button>
            </span>
          </div>
          <div className="w-full">
            <span>
              <button
                id="save"
                type="submit"
                className="btn okBtn btnSizeB"
                disabled={!activeSave}
              >
                Save
              </button>
              <button
                id="cancel"
                type="reset"
                className="btn cancelBtn btnSizeB"
                onClick={() =>
                  setData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    avater: userData.avatar,
                    birthDate: userData.birthDate,
                  })
                }
              >
                Cancel
              </button>
            </span>
          </div>
        </form>
        {deletePopup && (
          <div className="popup">
            <div
              className="popupInner 
            "
            >
              {/* write your Email and password */}
              <h2>write your Email and password to delete your account</h2>
              <div
                className="flex justify-center items-center gap-2 direction-column
              "
              >
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={dataDelete.email}
                    className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                    onChange={(e) =>
                      setDataDelete({ ...dataDelete, email: e.target.value })
                    }
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={dataDelete.password}
                    className="border border-gray-300 rounded-md p-2 m-2  bg-gray-100"
                    onChange={(e) =>
                      setDataDelete({ ...dataDelete, password: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <a
                  className="bg-red-500 text-white text-sm rounded-md
            border-solid border-2 border-red-500 py-1 px-1 hover:bg-red-800 transition duration-300 font-oleo font-bold py-1 px-2 mr-4 cursor-pointer "
                  onClick={handleDeleteAccount}
                >
                  Yes
                </a>
                <a
                  className="bg-blue-500 text-white text-sm rounded-md
            border-solid border-2 border-blue-500 py-1 px-1 hover:bg-blue-800 transition duration-300 font-oleo font-bold py-1 px-2 mr-4 cursor-pointer"
                  onClick={() => setDeletePopup(false)}
                >
                  No
                </a>
              </div>
            </div>
          </div>
        )}

        {changePasswordPopup && (
          <ChangePassword
            handleCancel={handleCancel}
            setChangePasswordPopup={setChangePasswordPopup}
          />
        )}
      </div>
    </div>
  );
}

export default Settings;
