import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className=" mt-5 flex flex-col items-center justify-start pt-8 p-4 rounded-md  mx-auto max-w-md h-96 w-60">
      {/* <h3 className="text-2xl mb-6 underline">Dashboard</h3> */}

      <div className="rounded-md shadow-md  max-w-md h-auto w-60 pb-2 fixed">
        <ul>
          {/* Buttons */}
          <li>
            <button
             className="bg-black w-44 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              onClick={() => navigate("/myevents")}
            >
               Events
            </button>
          </li>
          <li>
            <button
              className="bg-black w-44 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              onClick={() => navigate("/home/contacts")}
            >
               Contacts
            </button>
          </li>
          <li>
            <button
              className="bg-black w-44 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              onClick={() => navigate("/admin/templates")}
            >
               Templates
            </button>
          </li>
          <li>
            <button
              className="bg-black w-44 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              onClick={() => navigate("/user/settings")}
            >
               Settings
            </button>
          </li>
          <li>
            <button
              className="bg-black w-44 hover:bg-gray-500 rounded-full p-2 mt-1 text-white text-base ml-auto mx-3 items-end "
              onClick={() => navigate("/gift/upload")}
            >
             Upload Cards
            </button>
          </li>
        
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

// function Dashboard({ handleButtonClick }) {
//   return (
//     <div
//       className="dashboard mt-5 flex flex-col items-center justify-center  p-4 rounded-md shadow-md mx-auto max-w-md w-82 h-96
//         "
//     >
//       <h2>Dashboard</h2>

//       <ul>
//         {/* Buttons */}
//         <li>
//           <button
//             className="btn-left my-2 hover:bg-blue-200 text-blue-500
//                 "
//             onClick={() => handleButtonClick("myEvents")}
//           >
//             Events
//           </button>
//         </li>
//         <li>
//           <button
//             className="btn-left my-2 hover:bg-blue-200 text-blue-500 "
//             onClick={() => handleButtonClick("contacts")}
//           >
//             Contacts
//           </button>
//         </li>
//         <li>
//           <button
//             className="btn-left my-2 hover:bg-blue-200 text-blue-500 "
//             onClick={() => handleButtonClick("settings")}
//           >
//             Settings
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;
