import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#1A0B3B",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "500",
        },
        success: {
          iconTheme: {
            primary: "#818CF8",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#818CF8",
            secondary: "#fff",
          },
          duration: 5000,
        },
      }}
     />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
