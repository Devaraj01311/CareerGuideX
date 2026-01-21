import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContex.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <ThemeProvider>
          <App />
          </ThemeProvider>
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
);
