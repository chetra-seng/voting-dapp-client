import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard";
import Votes from "../Votes";
import Home from "../Home";
import Login from "../Login";
import Result from "../Votes/Result";
import About from "../About";

// This Component is created to use useLocation with Routes
const RouteContent = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/votes" element={<Votes />} />
          <Route path="/votes/:id" element={<Result />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default RouteContent;
