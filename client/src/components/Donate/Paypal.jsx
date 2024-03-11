import React from 'react'
import {  PayPalButtons } from "@paypal/react-paypal-js";

function Paypal() {
  return (
    <div className="container mt-20 mx-auto max-w-6xl rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
    <div className="container mt-20 mx-auto max-w-md rounded-xl shadow-xl shadow-gray-500  bg-white bg-opacity-80">
         <PayPalButtons style={{ layout: "vertical" }} />
    </div>
    </div>
  )
}

export default Paypal