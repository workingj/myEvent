import React, { useState } from 'react'
import MyEvents from './Events/MyEvents'
import AddEvent from './Events/AddEvent'

function Home() {
  const [myEvents, setMyEvents] = useState(false)
  const [addEvent, setAddEvent] = useState(false)

  const handleButtonClick = (button) => {
    setMyEvents(false)
    setAddEvent(false)

    if (button === "myEvents") setMyEvents(true)
    if (button === "addEvent") setAddEvent(true)

  }
  return (
    <div className="container flex  bg-gray-300 justify-center text-center w-full h-full ">





      {/* left side */}
      <div className="m-4 bg-gray-100 text-center flex-1 rounded-md p-4 border border-gray-300 w-full">
      
        {myEvents && <MyEvents handleButtonClick={handleButtonClick
        }/>}
        {addEvent && <AddEvent handleButtonClick={handleButtonClick
        }
         />}
       

      </div>







      {/* Right side */}
      <div className="border border-gray-300 p-4 m-4 bg-gray-100 rounded-md text-center w-96">
      <div className='profile flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md shadow-md mx-auto max-w-md w-82 h-72
        '>
          <h2>Prpfile</h2>

        </div>
        <div className='dashboard mt-5 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md shadow-md mx-auto max-w-md w-82 h-96
        '>
          <h2>Dashboard</h2>

          <ul>
            
             {/* Buttons */}
            <li>             
              <button
                className="btn-left my-2 hover:bg-blue-200 text-blue-500
                "
                onClick={() => handleButtonClick("myEvents")}
              >
                My Events
              </button>
            </li>
            
          </ul>

        </div>
      </div>
    </div>


  )
}

export default Home
