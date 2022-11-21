import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Web3Context } from "../../../contexts/Web3Provider";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../hooks/web3/useWeb3";
import networkConfig from "../../../assets/config/network.json";

const REGISTER_SESSION = "Registration";
const AddVoteOption = (props) => {
  const { getLatestTopic, addOption, getCurrentSession } = useVoteContract();
  const web3 = useWeb3();

  const { address } = useContext(Web3Context);

  const [topic, setTopic] = useState(null);
  const [option, setOption] = useState(null);
  const [session, setSession] = useState(null);

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

  useEffect(() => {
    checkSession();
  });

  const options = useMemo(() => {
    return {
      autoClose: 2000,
      hideProgressBar: true,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: true,
      progress: 0.2,
    };
  }, []);

  useEffect(() => {
    getTopic();
    // eslint-disable-next-line
  }, []);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getTransactionReceipt = async (txHash) => {
    try {
      await sleep(1000);
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      if (!receipt) {
        await getTransactionReceipt(txHash);
      }

      return receipt;
    } catch (err) {
      toast.error("Failed to get receipt", options);
    }
  };

  const getTopic = async () => {
    try {
      const res = await getLatestTopic();
      if (res) {
        setTopic(res);
      }
    } catch (err) {
      console.log(err);
      toast.error("Get lastest topic failed", options);
    }
  };

  const handleAddOption = async () => {
    try {
      const optionName = web3.utils.stringToHex(option).padEnd(66, "0");
      const res = await addOption(topic, optionName, address);
      if (res) {
        const receipt = getTransactionReceipt(res);
        await sleep(200);
        if (receipt) {
          toast.success("Create vote successful", {
            ...options,
            onClick: () => {
              window.open(`${networkConfig.blockExplorer}/tx/${res}`, "_blank");
            },
          });
          return;
        }
      }
    } catch (err) {
      console.log("Add option: ", err);
      if (err?.code === 4001) {
        toast.error(err.message.slice(23), options);
        return;
      }
      toast.error(err.message, options);
    }
  };

  return (
    <div className="box-container">
      <h1 className="ont-semibold text-xl">Add Vote Option</h1>
      <span
        className={session === REGISTER_SESSION ? "green-badge" : "red-badge"}
      >
        {session}
      </span>
      <p className="text-sm font-md text-gray-800">Vote Options</p>
      {/* Vote option input item */}

      <input
        disabled={session !== REGISTER_SESSION}
        type="text"
        className="h-8 w-full p-5 focus:outline-none border-none caret-slate-500 rounded-md text-slate-900 bg-input hover:shadow-inner focus:outline-[1px] focus:outline-gray-300"
        onChange={(e) => {
          setOption(e.target.value);
        }}
      />

      <div className="flex self-center justify-center w-[50%] max-md:w-full">
        <button
          className={
            session === REGISTER_SESSION
              ? "primary-btn w-full"
              : "disabled-btn w-full"
          }
          onClick={handleAddOption}
          disabled={session !== REGISTER_SESSION}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default AddVoteOption;
