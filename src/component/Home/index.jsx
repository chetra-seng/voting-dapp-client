import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../../contexts/Web3Provider";
import ConnectWallet from "../ConnectWallet";
import Layout from "../Layout";
import networkConfig from "../../assets/config/network.json";
import Plus from "../../assets/images/plus.png";

const Home = () => {
  const { address, chainId, connectWallet } = useContext(Web3Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (chainId && chainId !== `0x${networkConfig.chainId.toString(16)}`) {
      navigate("/login");
    }
  }, [chainId, navigate]);

  return (
    <Layout>
      <div className="flex h-full">
        <div className="m-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-5 border rounded-md text-center">
                <h3>You are gay bro</h3>
                <p>{address}</p>
              </div>
              <div className="flex flex-col px-5 py-10 border rounded-md text-center items-center">
                <h3>Create new vote</h3>
                <p>Add a new vote topic</p>
                <button className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 gap-3">
                  <img src={Plus} alt="Test" className="w-5 h-5" />
                  Create a topic
                </button>
              </div>
            </div>
          ) : (
            <ConnectWallet connectWallet={connectWallet} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;