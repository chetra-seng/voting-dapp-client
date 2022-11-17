import React, { useMemo, useState } from "react";

import SessionTopicIndicator from "../../owner/SessionTopicIndicator";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../hooks/web3/useWeb3";
import { useEffect } from "react";
import { useContext } from "react";
import { Web3Context } from "../../../contexts/Web3Provider";
import { toast } from "react-toastify";
import networkConfig from "../../../assets/config/network.json";

const SubmitVote = () => {
  const [topic, setTopic] = useState(null);
  const [options, setOptions] = useState(null);
  const [value, setValue] = useState(null);
  const { getLatestTopic, getVoteOptions, addVote } = useVoteContract();

  const { address } = useContext(Web3Context);

  const web3 = useWeb3();

  const getData = async () => {
    try {
      const res = await getLatestTopic();
      setTopic(res);
      if (res) {
        const opts = await getVoteOptions(res);
        setOptions(opts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toastOpt = useMemo(() => {
    return {
      autoClose: 2000,
      hideProgressBar: true,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: true,
      progress: 0.2,
    };
  }, []);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getTransactionReceipt = async (txHash) => {
    try {
      await sleep(1000);
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      console.log("receipt, ", receipt);
      if (!receipt) {
        await getTransactionReceipt(txHash);
      }

      return receipt;
    } catch (err) {
      console.log("failed to get receipt: ", err);
      await getTransactionReceipt(txHash);
      toast.error("Failed to get receipt", options);
    }
  };

  const handleAddVote = async () => {
    try {
      const res = await addVote(topic, value, address);
      console.log("res: ", res);
      if (res) {
        const receipt = getTransactionReceipt(res);
        await sleep(200);
        if (receipt) {
          toast.success(
            <a href={`${networkConfig.blockExplorer}/tx/${res}`}>
              Add vote success
            </a>,
            toastOpt
          );
          return;
        }
      }
    } catch (err) {
      if (err?.code === 4001) {
        toast.error(err.message.slice(23), options);
        return;
      }
      toast.error(err.message, options);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="box-container">
      <SessionTopicIndicator
        name="Vote Session"
        styles="bg-[#4CCAF0]"
        vote_title={topic ? web3.utils.hexToString(topic) : "Loading ..."}
      />
      <div className="w-full flex flex-col grow gap-2">
        {/* Select vote item */}
        {/* <form onSubmit={handleAddVote}>{topic && options? options.map((opt) => (
          <div
            className="w-full p-5 focus:outline-none border-none caret-slate-500 rounded-sm text-slate-900 hover:bg-secondary-20 focus:bg-secondary-20"
						key={opt}
          >
            <label
              htmlFor={`Figma ${opt}`}
              className={"mr-10"}
            >{web3.utils.hexToAscii(opt)}</label>
            <input
              id={`Figma ${opt}`}
              type="radio"
              value={`${opt}`}
              name="vote"
							onClick={(e) => {
								setValue(e.target.value);
							}}
            />
          </div>
        )): null}
				<button className="primary-btn mt-5" type="submit">Submit Vote</button>
				</form> */}
        <div className="pb-5 justify-center flex">
          <div className="bg-white rounded-md -space-y-px">
            {topic && options
              ? options.map((opt) => (
                  <div
                    key={opt}
                    className="relative border rounded-tl-md rounded-tr-md p-4 flex flex-row-reverse justify-between"
                  >
                    <div className="flex items-center h-5">
                      <input
                        id={opt}
                        x-ref="radio"
                        value={opt}
                        x-model="value"
                        name="privacy_setting"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
                        checked={value === opt}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                    <label
                      htmlFor={opt}
                      className="ml-3 flex flex-col cursor-pointer mr-20"
                    >
                      <span className="block text-sm font-medium">
                        {web3.utils.hexToString(opt)}
                      </span>
                    </label>
                  </div>
                ))
              : null}
          </div>
        </div>
        <button className="primary-btn" onClick={handleAddVote}>
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default SubmitVote;
