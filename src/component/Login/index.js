import React from "react";

const Login = () => {
  return (
    <div>
      <div className="left-side">
        <div className="top-logo">
          <img src="#" alt="App Logo"/>
          <h1>App Title</h1>
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
      <div className="right-side"></div>
    </div>
  );
};

export default Login;
