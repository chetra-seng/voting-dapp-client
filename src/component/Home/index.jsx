import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../../contexts/Web3Provider";
import ConnectWallet from "../ConnectWallet";
import Layout from "../Layout";
import networkConfig from "../../assets/config/network.json";
import Plus from "../../assets/images/plus.png";
import useAdminContract from "../../hooks/useAdminContract";
import useWeb3 from "../../hooks/useWeb3";

const Home = () => {
  const { address, chainId, connectWallet } = useContext(Web3Context);
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false);
  const {getOwner} = useAdminContract();
  
  const web3 = useWeb3();

  useEffect(() => {
    if (chainId && chainId !== `0x${networkConfig.chainId.toString(16)}`) {
      navigate("/login");
    }
  }, [chainId, navigate]);

  useEffect(() => {
    checkOwner(address);
  })

  const checkOwner = async (address) => {
    try {
      const res = await getOwner(address);
      if(web3.utils.toChecksumAddress(res) === web3.utils.toChecksumAddress(address)){
        console.log(web3.utils.toChecksumAddress(res) === web3.utils.toChecksumAddress(address));
        setOwner(true);
        return;
      }
      setOwner(false);
    }
    catch(err){
      console.log(err);
      setOwner(false);
    }
  }

  return (

    <Layout>
      <div className="flex h-full">
        <div className="m-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-5 border rounded-md text-center">
                {owner? "You're owner": "You are gay bro"}
                <p>{address}</p>
              </div>
              <div className="flex flex-col px-5 py-10 border rounded-md text-center items-center">
                <h3 className="mb-6">Create new vote</h3>
                <p className="mb-1">Add a new vote topic</p>
                <button className="text-white bg-slate-800 hover:text-slate-50 active:ring-4 active:outline-none active:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 gap-3">
                  <img src={Plus} alt="Test" className="w-5 h-5" />
                  Create a topic
                </button>
            </div>
            { true ? (<div className="backdrop-blur-xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><VotedResult id="1" topic="What is the best design tool?" vote_count="3000" /></div>) : null }
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