// import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import RouteContent from "./component/RoutesContent";

function App() {

  return (
    // For some reason, Browser routers doesn't work with useLocation
    // Had to superate the into different component
    <BrowserRouter>
      <RouteContent /> 
    </BrowserRouter>

  );
}

export default App;
