import React, { useMemo, useState } from "react";

import SessionTopicIndicator from "../../owner/SessionTopicIndicator";
import Button from "../../Button";
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
	const {getLatestTopic, getVoteOptions, addVote} = useVoteContract();

	const {address} = useContext(Web3Context);

	const web3 = useWeb3();

	const getData = async () => {
		try {
			const res = await getLatestTopic();
			setTopic(res);
			if(res) {
				const opts = await getVoteOptions(res);
				setOptions(opts);
			}
		}
		catch(err){
			console.log(err);
		}
	}

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

	const handleAddVote = async (e) => {
		e.preventDefault();
		try {
      const res = await addVote(topic, value, address);
			console.log("res: ", res);
      if (res) {
        const receipt = await getTransactionReceipt(res);
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
      if(err?.code === 4001) {
        toast.error(err.message.slice(23), options);
        return;
      }
      toast.error(err.message, options);
    }
	}
	
	useEffect(() => {
		getData();
	}, [])

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-start rounded-md border border-gray-300 p-8">
      <SessionTopicIndicator
        name="Vote Session"
        styles="bg-[#4CCAF0]"
        vote_title={topic? web3.utils.hexToAscii(topic): "Loading ..."}
      />
      <div className="w-full flex flex-col grow gap-2">
        {/* Select vote item */}
        <form onSubmit={handleAddVote}>{topic && options? options.map((opt) => (
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
				</form>
      </div>
    </div>
  );
};

export default SubmitVote;
