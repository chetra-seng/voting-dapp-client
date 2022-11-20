import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Web3Context } from "../../../contexts/Web3Provider";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../hooks/web3/useWeb3";
import SessionTopicIndicator from "../SessionTopicIndicator";
import networkConfig from "../../../assets/config/network.json";

const AddVoteOption = (props) => {
  const { getLatestTopic, addOption } = useVoteContract();
  const web3 = useWeb3();

  const { address } = useContext(Web3Context);

  const [topic, setTopic] = useState(null);
  const [option, setOption] = useState(null);

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
      if(res){
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
			console.log("tx: ", res);
      if (res) {
        const receipt = getTransactionReceipt(res);
        await sleep(200);
        if (receipt) {
          toast.success(
            "Create vote successful",
            {
              ...options,
              onClick: () => {
                window.open(`${networkConfig.blockExplorer}/tx/${res}`, "_blank");
              },
            }
          );
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
      <h1 className="inter-caption lg:inter-body2 md:inter-body2">
        Add Vote Option
      </h1>
      <div className="box-container">
        <SessionTopicIndicator
          name="In Registration"
          styles="bg-[#4CCAF0]"
          vote_title={!topic ? "Loading topic..." : web3.utils.hexToString(topic)}
        />
        <div className="w-full flex flex-col grow gap-2">
          <p className="text-sm font-md text-gray-800">Vote Options</p>
          {/* Vote option input item */}

          <input
            type="text"
            className="h-8 w-full p-5 focus:outline-none border-none caret-slate-500 rounded-md text-slate-900 bg-input hover:shadow-inner focus:outline-[1px] focus:outline-gray-300"
            onChange={(e) => {
              setOption(e.target.value);
            }}
          />
        </div>

        <button
          className={"primary-btn"}
          onClick={handleAddOption}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default AddVoteOption;
