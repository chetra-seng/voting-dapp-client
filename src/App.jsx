// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
