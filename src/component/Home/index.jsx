import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../../contexts/Web3Provider";
import ConnectWallet from "../ConnectWallet";
import Layout from "../Layout";
import networkConfig from "../../assets/config/network.json";
import Plus from "../../assets/images/plus.png";
import useAdminContract from "../../hooks/useAdminContract";
import useWeb3 from "../../hooks/useWeb3";
import Copy from "../../assets/images/copy.png";
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

  function copyToClipboard(address) {
    navigator.clipboard.writeText(address);
  };

  return (
    <Layout>
      <div className="flex h-full">
        <div className="m-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-5 border rounded-md text-center shadow-md">
                <h1 className="font-semibold text-sm">{owner? "You're owner": "You are gay bro"}</h1>
                <div className="flex flex-row gap-3">
                  <p className="font-md text-sm text-gray-600">{address}</p>
                  <img onClick={() => copyToClipboard(address)} src={Copy} className="w-5 h-5 p-[2px] hover:border hover:border-primary-dark hover:rounded-sm active:border-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2 px-5 py-10 border rounded-md text-center items-center shadow-md">
                <h3 className="font-semibold text-xl">Create new vote</h3>
                <p className="font-md text-sm text-slate-800">Add a new vote topic</p>
                <button className="flex items-center justify-center gap-2 w-full rounded-md text-slate-100 bg-[#337ee8] hover:bg-[#337ee8]/90 hover:text-white hover:shadow-md active:scale-[.99] active:bg-[#337ee8]/70 cursor-pointer p-2">
                  <img src={Plus} className="w-3 h-3" />
                  <span>Create a topic</span>
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
