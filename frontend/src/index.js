import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext";
import CaptainContext from "./context/CaptainContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </React.StrictMode>
);
