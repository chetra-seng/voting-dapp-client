import React, { useContext, useEffect } from "react";
import { Web3Context } from "../../contexts/Web3Provider";
import Logo from "./../../assets/images/blockchain.png";
import networkConfig from "../../assets/config/network.json";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { switchToCamDLNetwork, chainId } = useContext(Web3Context);
  const navigate = useNavigate();

  useEffect(() => {
    if(chainId && chainId === `0x${networkConfig.chainId.toString(16)}`){
      navigate("/");
    }
  }, [chainId, navigate]);


  return (
    <>
      <div className="flex flex-row min-h-screen">
        <div className="basis-1/2 left-side">
          <div className="container py-10 px-20 flex flex-col min-h-screen">
            <div className="flex flex-row gap-3 top-logo">
              <img className="w-8 h-8" src={Logo} alt="App logo" />
              <h3>Decentralize Voting</h3>
            </div>
            <div className="middle-logo grow flex flex-row">
              <div className="flex flex-col justify-center gap-3">
                <div className="app-title">
                  <h1 className="title">Decentralize Voting</h1>
                  <h2 className="sub-title">Blockchain based technologies</h2>
                </div>
                <div className="button">
                  <button
                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={switchToCamDLNetwork}
                  >
                    Connect with MetaMask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/2 bg-black right-side"></div>
      </div>
    </>
  );
};

export default Login;
