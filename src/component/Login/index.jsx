import React, { useContext, useEffect } from "react";
import { Web3Context } from "../../contexts/Web3Provider";
import Logo from "./../../assets/images/logo.png";
import networkConfig from "../../assets/config/network.json";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/images/Showcase.svg";
import "./styles.css";

const Login = () => {
  const { switchToCamDLNetwork, chainId } = useContext(Web3Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (chainId && chainId === `0x${networkConfig.chainId.toString(16)}`) {
      navigate("/");
    }
  }, [chainId, navigate]);

  return (
    <div>
      <div className="wrapper">
        <div className="left-side">
          <div className="top-logo flex gap-4">
            <img className="w-8 h-8" src={Logo} alt="App logo" />
            <span className="max-md:text-white">Decentralize Voting</span>
          </div>
          <div className="middle-logo">
            <div className="app-title">
              <h1 className="title max-md:hidden">Decentralize Voting</h1>
              <h2 className="sub-title max-md:hidden">
                Blockchain based technologies
              </h2>
            </div>
            <div className="w-full max-md:mt-72 self-center flex justify-center">
              <button className="login-btn" onClick={switchToCamDLNetwork}>
                Connect With Metamask
              </button>
            </div>
          </div>
        </div>
        <div
          className="right-side"
          style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
