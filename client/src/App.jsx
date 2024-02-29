import { Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts.jsx";
import Home from "./components/Home.jsx";
import NotFound from "./components/Gloubal/NotFound.jsx";
import MyEvents from "./components/Events/MyEvents.jsx";
import AddEvent from "./components/Events/AddEvent.jsx";
import ShowAll from "./components/Events/ShowAll.jsx";

import Navbar from "./components/Gloubal/Navbar.jsx";
import Login from "./components/Users/Login.jsx";
import RegisterForm from "./components/Users/RegisterForm.jsx";
import Privacy from "./components/Gloubal/Privacy.jsx";


export default function App() {
  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/myevents/showall" element={<ShowAll />} />
        <Route path="/myevents/addevent" element={<AddEvent />} />

        <Route path="/user/contacts" element={<Contacts />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
