import config from "../../assets/config/contract.json";
import useWeb3 from "../web3/useWeb3";
import voteAbi from "./vote.json";

const useVoteContract = () => {
  const web3 = useWeb3();
  const contractAddr = config.vote;
  const contract = new web3.eth.Contract(voteAbi.abi, contractAddr);

  const addTopic = async (name) => {
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

  const getLatestTopic = async () => {
    return await contract.methods.getLatestTopic().call();
  };

  const getVoteOptions = async (topicName) => {
    return await contract.methods.getVoteOptions(topicName).call();
  };

  const addOption = async (topicName, optionName, address) => {
    const method = await contract.methods.addOption(topicName, optionName);
    const estGas = await method.estimateGas({ from: address });
    const res = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: address,
          to: contractAddr,
          data: method.encodeABI(),
          gas: `0x${Math.ceil(estGas * 1.05).toString(16)}`,
        },
      ],
    });
    return res;
  };

  const addVote = async (topicName, optionName, address) => {
    const method = await contract.methods.addVote(topicName, optionName);
    const estGas = await method.estimateGas({ from: address });

    const res = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: address,
          to: contractAddr,
          data: method.encodeABI(),
          gas: `0x${Math.ceil(estGas * 1.05).toString(16)}`,
        },
      ],
    });
    return res;
  };

  const getCurrentSession = async () => {
    return await contract.methods.getCurrentSesson().call();
  };

  const getAllVotes = async () => {
    return await contract.methods.getTopics().call();
  };

  const getVoteCounts = async () => {
    return await contract.methods.getVoteCounts().call();
  };

  return {
    addTopic,
    getLatestTopic,
    addOption,
    getVoteOptions,
    addVote,
    getAllVotes,
    getVoteCounts,
  };
};

export default useVoteContract;
