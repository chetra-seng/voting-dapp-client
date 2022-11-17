// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./component/Dashboard";
import FinishedVote from "./component/FinishedVote";
import Home from "./component/Home";
import Login from "./component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/votes" element={<FinishedVote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
