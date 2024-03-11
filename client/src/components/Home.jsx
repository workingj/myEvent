import React, { useContext, useEffect, useState } from "react";
import MyEvents from "./Events/MyEvents";
import AddEvent from "./Events/AddEvent";
import Contacts from "./Contacts/Contacts";
import Profile from "./Global/Profile";
import Dashboard from "./Global/Dashboard";
import { DataContext } from "../Context/MyEventContext";
import Overview from "./Global/Overview";
import { toast } from "react-toastify";
import Settings from "./Global/Settings";

function Home() {
  const [myEvents, setMyEvents] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [settings, setSettings] = useState(false);
  const { overview, setOverview } = useContext(DataContext);

  useEffect(() => {
    if (overview == true) {
      setMyEvents(false);
      setAddEvent(false);
      setContacts(false);
      setSettings(false);
    }
  }, [overview]);

  const handleButtonClick = (button) => {
    setMyEvents(false);
    setAddEvent(false);
    setContacts(false);
    setOverview(false);
    setSettings(false);

    if (button === "myEvents") setMyEvents(true);
    if (button === "addEvent") setAddEvent(true);
    if (button === "contacts") setContacts(true);
    if (button === "settings") setSettings(true);
  };
  return (
    <div className="containerHome flex  justify-center text-center w-full h-full ">
      {/* left side */}
      <div className="m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
        {myEvents && <MyEvents handleButtonClick={handleButtonClick} />}
        {addEvent && <AddEvent handleButtonClick={handleButtonClick} />}
        {contacts && <Contacts />}
        {overview && <Overview />}
        {settings && <Settings />}
      </div>

      {/* Right side */}
      <div className="border border-gray-300 p-4 m-4  rounded-md text-center ">
        <div className="Profile rounded-md shadow-md mx-auto max-w-md w-82 h-60">
          <Profile />
        </div>
        <div>
          <Dashboard handleButtonClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}

export default Home;
