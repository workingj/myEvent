import { Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts.jsx";
import Home from "./components/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import MyEvents from "./components/Events/MyEvents.jsx";
import AddEvent from "./components/Events/AddEvent.jsx";
import ShowAll from "./components/Events/ShowAll.jsx";

export default function App() {
  return (
    <>
      <h1>MyEvent</h1>
      <Contacts />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/myevents" element={<MyEvents />}/>
          <Route path="/myevents/showall" element={<ShowAll />} />
      
       
          <Route path="/myevents/addevent" element={<AddEvent />}/>
   
          <Route path="/user/contacts" element={<Contacts />}/>

        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}
