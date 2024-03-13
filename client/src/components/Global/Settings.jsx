import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/MyEventContext";
import validateForm from "../../validator/formvalidator.js";
import ChangePassword from "./ChangePassword.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function Settings() {
  const { t } = useTranslation();
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
      <h2>{t('Profile Settings')}</h2>
      <div className="Container mw-30">
        <form onSubmit={(e) => handleFormSubmit(e)} className="settingsForm">
          <div className="settings">
            <span>
              <label htmlFor="firstName">{t('First Name')}</label>
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
                {t('Edit')}
              </button>
              <span className="text-red-500">{errors.firstName}</span>
            </span>

            <span>
              <label htmlFor="lastName">{t('Last Name')}</label>
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
                {t('Edit')}
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
                {t('Edit')}
              </button>
              <span className="text-red-500">{errors.email}</span>
            </span>

            <span>
              <label htmlFor="birthDate">{t('Birthday')}</label>
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
                  {t('Edit')}
              </button>
              <span className="text-red-500">{errors.birthDate}</span>
            </span>
            <hr />
            <span>
              <label htmlFor="balance">{t('Balance')}</label>
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
              <label htmlFor="balance">{t('Charge your balance?')} </label>
              <button
                className="btn editBtn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/paypal");
                }}
              >
                {t('purchase')}
              </button>
            </span>
            <hr />
            <span className="tCenter">
              <label htmlFor="avater">{t('Avatar')}</label>
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
                onClick={(e) => {
                  e.preventDefault(e);
                  handleAvatarChange(e);
                }}
                type="submit"
                className="btn okBtn"
              >
                {t('Upload')}
              </button>
            </span>

            <hr />
            <span>
              <label htmlFor="">{t('Change Password')}</label>
              <button
                className="btn editBtn"
                onClick={(e) => {
                  e.preventDefault(e);
                  setChangePasswordPopup(true);
                }}
              >
                {t('Change')}
              </button>
            </span>
            <hr />
            <span>
              <label>{t('Do you want to delete your account?')}</label>
              <button
                className="btn deleteBtn"
                onClick={(e) => {
                  e.preventDefault();
                  setDeletePopup(true);
                }}
              >
                {t('Click here')}
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
                {t('Save')}
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
                {t('Cancel')}
              </button>
            </span>
          </div>
        </form>
        {deletePopup && (
          <div className="popup">
            <div className="popupInner">
              <h2>Delete Account?</h2>
              <strong>Enter email and password to delete your account</strong>
              <span>
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
              </span>
              <span>
                <label htmlFor="password">{t('Password:')}</label>
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
              </span>
              <div className="hCenter">
                <button
                  className="btn okBtn btnSizeB"
                  onClick={handleDeleteAccount}
                >
                  {t('Yes')}
                </button>
                <button
                  className="btn cancelBtn btnSizeB"
                  onClick={() => setDeletePopup(false)}
                >
                  {t('No')}
                </button>
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
