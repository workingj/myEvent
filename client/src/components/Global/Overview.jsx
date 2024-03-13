import { useState, useEffect } from "react";

import MyOverview from "../Global/MyOverview.jsx";
import MyOverviewNext from "../Global/MyOverviewNext.jsx";
import axios from "axios";
import { useAuth } from "../../Context/MyEventContext";

function Overview() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  ("const [flag, setFlag] = useState(null);");

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <div className="settings m-4 text-center flex-1 rounded-md p-4 border border-gray-300 w-full max-w-6xl mx-auto
      
      ">
        <h2>Your Events</h2>
        <div
          className="Container m-4 text-center flex justify-center items-center flex-col gap-5 w-full max-w-6x 
       
      
      "
        >
          {/* //Link Div */}
          <div>
            <h1 className="text-center text-sm font-bold mt-5 
            ">
              Last 10 events
            </h1>

            <MyOverview />
          </div>

          {/* //Right Div */}
          <div>
            <h1 className="text-center text-sm font-bold mt-5">
              Next 10 events
            </h1>

            <MyOverviewNext />
          </div>
          <div className="container mt-20  max-w-6xl bg-opacity-80 mx-4 "></div>
        </div>
      </div>
    </>
  );
}

export default Overview;
