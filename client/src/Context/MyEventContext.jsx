
import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import Cookies from "js-cookie";


 export const DataContext = createContext();
export const useAuth = () => useContext(DataContext);


function MyEventContext({ children }) {
  //useStates
  const [overview, setOverview] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [images, setImages] = useState('');
 

  const checkUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, { withCredentials: true }
      );
      if (response.data && response.data._id) {
        setIsLoggedIn(true);
        setUserData(response.data);

      } else {
        setIsLoggedIn(false);
        setUserData([]);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData([]);
    }
};

    useEffect(() => {
      const token = Cookies.get('token');
      if (token) {
        checkUser();
      }
    },[])
 



  const value = {
    overview,
    setOverview,
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    checkUser,
    allEvents,
    setAllEvents,
    contacts, setContacts,
    images, setImages
    
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default MyEventContext;
