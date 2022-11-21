import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../../contexts/Web3Provider";
import ConnectWallet from "./ConnectWallet";
import Layout from "../Layout";
import networkConfig from "../../assets/config/network.json";
import useAdminContract from "../../hooks/admin/useAdminContract";
import useWeb3 from "../../hooks/web3/useWeb3";
import Owner from "./Owner";
import Admin from "./Admin";
import User from "./User";

import Address from "./Address";
const Dashboard = () => {
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
    checkOwner(address);
    // eslint-disable-next-line
  }, [address]);

  const checkAdmin = async (address) => {
    try {
      const res = await isAdmin(address);
      setAdmin(res);
    } catch (err) {
      console.log(err);
      setAdmin(false);
    }
  };
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

  return (
    <Layout>
      <div className="container flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="inter-heading2">Dashboard</h2>
          <p>
            <ol className="list-decimal list-inside">
              The flow of vote is shown as below:
              <li>Owner create a topic, and the voting session start.</li>
              <li>Admins will provide voting option for users to vote.</li>
              <li>User can vote to each option they want.</li>
            </ol>
          </p>
        </div>
        <div className="flex justify-center mx-auto relative w-full max-w-lg h-full md:h-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <Address address={address} admin={admin} owner={owner} />
              {owner ? ( // check if address is owner
                <Owner />
              ) : admin ? ( // if address is not owner, check if it's admin
                <Admin />
              ) : (
                <User />
              )}
            </div>
          ) : (
            <ConnectWallet connectWallet={connectWallet} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
