import { Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts.jsx";
import Home from "./components/Home.jsx";
import NotFound from "./components/Global/NotFound.jsx";
import MyEvents from "./components/Events/MyEvents.jsx";
import AddEvent from "./components/Events/AddEvent.jsx";
import ShowAll from "./components/Events/ShowAll.jsx";
import Profile from "./components/Global/Profile.jsx";
import Navbar from "./components/Global/Navbar.jsx";
import LoginForm from "./components/Users/LoginForm.jsx";
import RegisterForm from "./components/Users/RegisterForm.jsx";
import Privacy from "./components/Global/Privacy.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Overview from "./components/Global/Overview.jsx";
import LandingPage from "./components/LandingPage.jsx";
import EditeEvent from "./components/Events/EditeEvent.jsx";
import Template from "./components/Templates/Template.jsx";
import RigtSide from "./components/RigtSide.jsx";
import Settings from "./components/Global/Settings.jsx";
import { useAuth } from "./Context/MyEventContext.jsx";
import ForTeam from "./components/Global/ForTeam.jsx";
import ChangePassword from "./components/Global/ChangePassword.jsx";

export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Navbar />
      <ToastContainer />
      {isLoggedIn ? (
        <div className="flex ">
          <Routes>
            <Route path="/home" element={<Overview />} />
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/forteam" element={<ForTeam />} />
            <Route path="/user/register" element={<RegisterForm />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/user/mail" element={<TestMail />} />
            <Route
              path="/home/settings/changepassword"
              element={<ChangePassword />}
            />

            <Route path="/myevents" element={<MyEvents />} />
            {/* <Route path="/myevents/showall" element={<ShowAll />} /> */}
            <Route path="/myevents/addevent" element={<AddEvent />} />
            <Route path="/myevents/edit/:id" element={<EditeEvent />} />
            <Route path="/home/contacts" element={<Contacts />} />
            <Route path="/admin/templates" element={<Template />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          <RigtSide />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user/login" element={<LoginForm />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/user/register" element={<RegisterForm />} />
          <Route path="/forteam" element={<ForTeam />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

import "./components/Contacts/Contact.css";
import axios from "axios";
import { useEffect, useState } from "react";

function TestMail() {
  const [mailData, setMailData] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/mail`)
      .then((res) => {
        console.log(res.data);
        setMailData(res.data);
      })
      .catch((error) => {
        console.error("ERR testing Mail:", error.stack);
      });
  }, []);

  return (
    <>
      <div className="m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        <h2>Test Mail</h2>
        <div className="Contacts">
          {mailData && <code>{JSON.stringify(mailData)}</code>}
        </div>
      </div>
    </>
  );
}
