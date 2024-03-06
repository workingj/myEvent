import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard mt-5 flex flex-col items-center justify-center  p-4 rounded-md shadow-md mx-auto max-w-md w-82 h-96
        ">
      <h2>Dashboard</h2>

      <ul>
        {/* Buttons */}
        <li>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500
                "
                onClick={() => navigate("/myevents")}
          >
            My Events
          </button>
        </li>
        <li>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 "
            onClick={() => navigate("/home/contacts")}
          >
            Contacts
          </button>
        </li>
        <li>
          <button
            className="btn-left my-2 hover:bg-blue-200 text-blue-500 "
            onClick={() => navigate("/user/settings")}
          >
            Settings
          </button>
        </li>
      </ul>
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
//             My Events
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
