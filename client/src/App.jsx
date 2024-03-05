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

export default function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/user/login" element={<LoginForm />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/user/register" element={<RegisterForm />} />

        <Route path="/myevents" element={<MyEvents />} />
        {/* <Route path="/myevents/showall" element={<ShowAll />} /> */}
        <Route path="/myevents/addevent" element={<AddEvent />} />
        <Route path="/myevents/edit/:id" element={<EditeEvent />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/home/contacts" element={<Contacts />} />
        <Route path="/admin/templates" element={<Template />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
