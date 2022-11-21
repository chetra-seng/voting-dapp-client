import React, { useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import useVoteContract from "../../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../../hooks/web3/useWeb3";
import networkConfig from "../../../../assets/config/network.json";

const CreateNewVote = ({ setShowModal, checkSession }) => {
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
      await sleep(1000);
      const receipt = await web3.eth.getTransactionReceipt(txHash);
      if (!receipt) {
        await getTransactionReceipt(txHash);
      }

      return receipt;
    } catch (err) {
      console.log(err);
      toast.error("Failed to get receipt", options);
    }
  };

  const handleAddTopic = async () => {
    const bytes32 = web3.utils.stringToHex(text);
    try {
      const res = await addTopic(bytes32.padEnd(66, "0"));
      if (res) {
        const receipt = getTransactionReceipt(res);
        await sleep(200);
        if (receipt) {
          await checkSession();
          setShowModal(false);
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
      console.log("Add topic: ", err);
      if(err?.code === 4001) {
        toast.error(err.message.slice(23), options);
        return;
      }
      toast.error(err.message, options);
    }
  };

  return (
    <div className="flex flex-col shadow-md border rounded-md">
      <div className="relative">
        <button
          onClick={() => {
            setShowModal(false);
          }}
        >
          <AiOutlineClose size={20} className={"absolute right-2 top-2"} />
        </button>
      </div>
      <div className="box-container border-0 gap-5">
        <div className="title-wrapper">
          <div className="font-semibold text-xl">New Vote</div>
          <p>Enter a voting topic to start voting</p>
        </div>
        <div className="w-full">
          <p className="text-sm">Vote title</p>
          <input
            className="w-full h-[48px] focus:outline-none bg-[#F2F1F0] px-4 rounded-md"
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <button className="primary-btn  md:w-[60%] md:self-center" onClick={handleAddTopic}>
          Create Now
        </button>
      </div>
    </div>
  );
};

export default CreateNewVote;
