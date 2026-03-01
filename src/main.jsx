import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ScrollTop from "./components/ScrollTop";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <ScrollTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
