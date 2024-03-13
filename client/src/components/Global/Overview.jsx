
import { useState, useEffect } from "react";

import MyOverview from '../Global/MyOverview.jsx'
import MyOverviewNext from '../Global/MyOverviewNext.jsx'
import axios from "axios";
import { useAuth } from "../../Context/MyEventContext";

function Overview() {

  const {isLoggedIn,setIsLoggedIn } = useAuth();

  'const [flag, setFlag] = useState(null);'

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
    
  }, [isLoggedIn]);
  
  return (
    <>
    
      {/* //Link Div */}
      <div>
        <h1 className="text-center text-sm font-bold mt-5">Last 10 events</h1>

      
          <MyOverview />
       
      </div>


      {/* //Right Div */}
      <div >
        <h1 className="text-center text-sm font-bold mt-5">Next 10 events</h1>

      
          <MyOverviewNext />
       
      </div>
      <div className="container mt-20  max-w-6xl bg-opacity-80 mx-4 "></div>

     
    </>
  );
}

export default Overview;
