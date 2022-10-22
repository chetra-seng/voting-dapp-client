import React from "react";
import Logo from "./../../assets/images/blockchain.png";

const Login = () => {
  return (
    <div className="flex flex-row">
      <div className="basis-1/2 left-side">
        <div className="container">
          <div className="flex flex-row gap-3 top-logo">
            <img className="w-8 h-8" src={Logo} alt="App logo" />
            <h1>Decentralize Voting</h1>
          </div>
          <div className="middle-logo">
            <div className="app-title">
              <h1 className="title">Decentralize voting</h1>
              <h2 className="sub-title">App Subheading</h2>
            </div>
            <div className="button">
              {/* We have 2 options to change this:
            1. We will use this div to create button
            2. change "div" to "button" and style the button elememnt
            */}
            </div>
          </div>
        </div>
      </div>
      <div className="basis-1/2 right-side"></div>
    </div>
  );
};

export default Login;
