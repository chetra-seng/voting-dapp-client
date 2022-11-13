import React, { useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../hooks/web3/useWeb3";
import networkConfig from "../../../assets/config/network.json";

const CreateNewVote = ({ setShowModal }) => {
  const [text, setText] = useState(null);
  const web3 = useWeb3();
  const { addTopic } = useVoteContract();

  const options = useMemo(() => {
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
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      sleep(200);
      if (!receipt) {
        await getTransactionReceipt(txHash);
      }

      return receipt;
    } catch (err) {
      console.log("failed to get receipt: ", err);
      toast.error("Failed to get receipt", options);
    }
  };

  const handleAddTopic = async () => {
    const bytes32 = web3.utils.asciiToHex(text);
    try {
      const res = await addTopic(bytes32.padEnd(66, "0"));
      if (res) {
        const receipt = await getTransactionReceipt(res);
        console.log(receipt);
        if (receipt) {
          toast.success(
            <a href={`${networkConfig.blockExplorer}/tx/${res}`}>
              Add vote success
            </a>,
            options
          );
          return;
        }
      }
    } catch (err) {
      console.log("Add topic: ", err);
      if(err?.code === 4001) {
        toast.error(err.message.slice(23), options);
        return;
      }
      toast.error(err.message, options);
    }
  };

  return (
    <div className="flex flex-col gap-3 shadow-md border rounded-md">
      <div className="relative">
        <button
          onClick={() => {
            setShowModal(false);
          }}
        >
          <AiOutlineClose size={20} className={"absolute right-2 top-2"} />
        </button>
      </div>
      <div className="flex flex-col gap-9 p-9 w-[440px] h-[310px]">
        <div className="title-wrapper">
          <div className="text-2xl font-medium">Create New Vote</div>
          <div className="text-sm font-medium">Weeeeeeee</div>
        </div>
        <div className="relative left-0 font-popin font-medium">
          <div className="font-medium text-sm">Vote Title</div>
          <input
            className="w-full h-[48px] focus:outline-none bg-white px-4 rounded-md shadow-md"
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <button className="primary-btn" onClick={handleAddTopic}>
          Create Now
        </button>
      </div>
    </div>
  );
};

export default CreateNewVote;
