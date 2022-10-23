import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Web3Provider from "./contexts/Web3Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
      <ToastContainer />
    </Web3Provider>
  </React.StrictMode>
);
