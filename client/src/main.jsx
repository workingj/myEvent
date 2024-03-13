import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MyEventContext from "./Context/MyEventContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <PayPalScriptProvider
      options={{
        clientId: `${import.meta.env.VITE_PAYPAL_Client_ID}`,
        currency: "EUR",
      }}
    >
      <MyEventContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyEventContext>
    </PayPalScriptProvider>
    </I18nextProvider>
  //</React.StrictMode>
);
