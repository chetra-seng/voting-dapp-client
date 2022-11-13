import config from "../../assets/config/contract.json";
import useWeb3 from "../web3/useWeb3";
import voteAbi from "./vote.json";

const useVoteContract = () => {
  const web3 = useWeb3();
  const contractAddr = config.vote;
  const contract = new web3.eth.Contract(voteAbi.abi, contractAddr);
  const addTopic = async (name) => {
    console.log("contract: ", contractAddr);
    const method = await contract.methods.addTopic(name);
    const estGas = await method.estimateGas({ from: config.ownerAdd });
    const res = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: config.ownerAdd,
          to: contractAddr,
          data: method.encodeABI(),
          gas: `0x${Math.ceil(estGas * 1.05).toString(16)}`,
        },
      ],
    });
    return res;
  };

  return { addTopic };
};

export default useVoteContract;
