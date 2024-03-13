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
      <div className="settings m-4 text-center  rounded-md p-4 border border-gray-300 w-full">
        <h2>Your Events</h2>
        <div
          className="Container m-4 text-center flex justify-center items-center flex-col gap-5 w-full bg-white bg-opacity-80 rounded-xl shadow-xl shadow-gray-400  mx-4 
        "
        >
          {/* //Right Div */}
          <div className="container mt-20  max-w-6xl rounded-xl shadow-xl shadow-gray-300  bg-white bg-opacity-80 mx-4 ">
            <h1 className="text-center text-sm font-bold mt-5">
              Next 10 events
            </h1>

            <MyOverviewNext />
          </div>

          {/* //Link Div */}
          <div className="container mt-20  max-w-6xl rounded-xl shadow-xl   bg-white bg-opacity-80 mx-4 ">
            <h1 className="text-center text-sm font-bold mt-5">
              Last 10 events
            </h1>

            <MyOverview />
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;
