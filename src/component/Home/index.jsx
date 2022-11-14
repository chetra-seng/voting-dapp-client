import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../../contexts/Web3Provider";
import ConnectWallet from "../ConnectWallet";
import Layout from "../Layout";
import networkConfig from "../../assets/config/network.json";
import useAdminContract from "../../hooks/admin/useAdminContract";
import useWeb3 from "../../hooks/web3/useWeb3";
import Copy from "../../assets/images/copy.png";
import OwnerOption from "./OwnerOption";
import AddVoteOption from "../Admin/AddVoteOption"
import SubmitVote from "../Admin/SubmitVote";
const Home = () => {
  const { address, chainId, connectWallet } = useContext(Web3Context);
  const navigate = useNavigate();

  const [owner, setOwner] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { getOwner, isAdmin } = useAdminContract();
  const web3 = useWeb3();

  useEffect(() => {
    if (chainId && chainId !== `0x${networkConfig.chainId.toString(16)}`) {
      navigate("/login");
    }
  }, [chainId, navigate]);

  

  useEffect(() => {
    const checkAdmin = async (address) => {
      try {
        const res = await isAdmin(address);
        console.log("is Admin: ", res);
        setAdmin(res);
      }
      catch(err){
        console.log(err);
        setAdmin(false);
      }
    }
    const checkOwner = async (address) => {
      try {
        const res = await getOwner(address);
        if (
          web3.utils.toChecksumAddress(res) ===
          web3.utils.toChecksumAddress(address)
        ) {
          setOwner(true);
          return;
        }
        setOwner(false);
        await checkAdmin(address);
      } catch (err) {
        console.log(err);
        setOwner(false);
      }
    };
    checkOwner(address);

    // eslint-disable-next-line
  }, [address]);

  function copyToClipboard(address) {
    navigator.clipboard.writeText(address);
  }

  return (
    <Layout>
      <div className="flex h-full">
      
        <div className="m-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col p-5 border rounded-md text-center shadow-md">
                <h1 className="font-semibold text-sm">
                  {owner ? "You're owner" : admin? "You're admin": "You're user"}
                </h1>
                <div className="flex flex-row gap-3">
                  <p className="font-md text-sm text-gray-600">{address}</p>
                  <img
                    alt="copy"
                    onClick={() => copyToClipboard(address)}
                    src={Copy}
                    className="w-5 h-5 p-[2px] hover:border hover:border-primary-dark hover:rounded-sm active:border-none"
                  />
                </div>
              </div>
              {owner? <OwnerOption />: admin? <AddVoteOption />: <SubmitVote />}
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
