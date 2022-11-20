import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from '../Dashboard';
import FinishedVote from '../FinishedVote';
import Home from '../Home';
import Login from '../Login';

const RouteContent = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/votes" element={<FinishedVote />} />
          </Route>
        </Routes>
    </AnimatePresence>
  );
}

export default RouteContent;
