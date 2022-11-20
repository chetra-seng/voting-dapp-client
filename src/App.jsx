// import logo from './logo.svg';
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";
import FinishedVote from "./component/FinishedVote";
import Home from "./component/Home";
import Login from "./component/Login";
import RouteContent from "./component/RoutesContent";

function App() {

  return (
    <BrowserRouter>
      <RouteContent />    
    </BrowserRouter>

  );
}

export default App;
