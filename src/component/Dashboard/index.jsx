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
import ReloadPageVote from "./ReloadPage";
import useVoteContract from "../../hooks/vote/useVoteContract";
import EndVoteSession from "./EndVoteSession";
const Dashboard = () => {
  const { address, chainId, connectWallet } = useContext(Web3Context);
  const navigate = useNavigate();

  const VOTE_SESSION = "Voting";
  const REGISTER_SESSION = "Registration";
  const INACTIVE_SESSION = "Inactive";

  const [session, setSession] = useState(null);
  const [owner, setOwner] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { getOwner, isAdmin } = useAdminContract();
  const { getCurrentSession } = useVoteContract();
  const web3 = useWeb3();

  useEffect(() => {
    if (chainId && chainId !== `0x${networkConfig.chainId.toString(16)}`) {
      navigate("/login");
    }
  }, [chainId, navigate]);

  useEffect(() => {
    checkOwner(address);
    checkSession();
    // eslint-disable-next-line
  }, [address]);

  const checkAdmin = async (address) => {
    try {
      const res = await isAdmin(address);
      console.log("is Admin: ", res);
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

  const checkSession = async () => {
    try {
      const res = await getCurrentSession();
      // getCurrentSession response
      // {
      //   0: "index",
      //   1: "sessionName",
      //   2: "currentBlock",
      //   3: "EndBlock"
      // }
      setSession(res["1"]);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(owner);

  return (
    <Layout>
      <div className="flex justify-center mx-auto relative w-full max-w-lg h-full md:h-auto">
          {address ? (
            <div className="flex flex-col gap-5">
              <Address
                address={address}
                admin={admin}
                owner={owner}
              />
              {owner ? ( // check if address is owner
                <>
                  <Owner checkSession={checkSession} />
                  {/*
                    if session is not inactive, show modal
                    TODO: Change modal to reside in the container
                   */}
                  {session !== INACTIVE_SESSION && (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto">
                          {/*content*/}
                          <ReloadPageVote styles="bg-slate-200"/>
                        </div>
                      </div>
                      <div className="w-screen h-screen opacity-40 fixed inset-0 z-40 bg-black"></div>
                      <div className="w-screen h-screen fixed inset-0 z-40 backdrop-blur-sm"></div>
                    </>
                  )}
                </>
              ) : admin ? ( // if address is not owner, check if it's admin
                <>
                  <Admin />
                  {/* If session is not register session, 
                    show reload page modal 
                    // TODO: change modal to reside in container  
                  */}
                  {session !== REGISTER_SESSION && (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto">
                          {/*content*/}
                          <ReloadPageVote styles="bg-slate-200" />
                        </div>
                      </div>
                      <div className="w-screen h-screen opacity-40 fixed inset-0 z-40 bg-black"></div>
                      <div className="w-screen h-screen fixed inset-0 z-40 backdrop-blur-sm"></div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <User />
                  {session !== VOTE_SESSION && (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <EndVoteSession/>
                      </div>
                      <div className="w-screen h-screen opacity-40 fixed inset-0 z-40 bg-black"></div>
                      <div className="w-screen h-screen fixed inset-0 z-40 backdrop-blur-sm"></div>
                    </>
                  )}
                </>
              )}
            </div>
          ) : (
            <ConnectWallet connectWallet={connectWallet} />
          )}
      </div>
    </Layout>
  );
};

export default Dashboard;
