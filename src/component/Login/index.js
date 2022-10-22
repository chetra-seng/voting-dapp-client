import React from "react";
import "./styles.css"
const Login = () => {
  return (
    <div>
      <div className = "wrapper">
        <div className="left-side">
          <div className="top-logo">
            <img src="#"/>
            <span>DVOTE</span> 
          </div>
          <div className="middle-logo">
            <div className="app-title">
              <h1 className="title">Decentralize Voting</h1>
              <h2 className="sub-title">The reliable voting system</h2>
            </div>
            <button>
               Connect With Metamask Account
            </button>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </div>
  );
};

export default Login;
