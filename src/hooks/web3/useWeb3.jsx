import Web3 from 'web3';
import networkConfig from "../../assets/config/network.json";

const useWeb3 = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkConfig.rpcUrl));

  return web3;
}

export default useWeb3;
