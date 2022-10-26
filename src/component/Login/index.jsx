import React, { useContext } from "react";
import { Web3Context } from "../../contexts/Web3Provider";
import Logo from "./../../assets/images/blockchain.png";
import "./styles.css"
const Login = () => {

  const { connectWallet } = useContext(Web3Context);

  return (
    <div>
      <div className = "wrapper">
        <div className="left-side">
          <div className="top-logo">
          <img className="w-8 h-8" src={Logo} alt="App logo" />
          <span>Decentralize Voting</span> 
          </div>
          <div className="middle-logo">
            <div className="app-title">
              <h1 className="title">Decentralize Voting</h1>
              <h2 className="sub-title">Blockchain based technologies</h2>
            </div>
            <button onClick={connectWallet}>
               Connect With Metamask
            </button>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    </div>
  );
};

export default Login;
