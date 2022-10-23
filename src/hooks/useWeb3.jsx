import Web3 from 'web3';

const useWeb3 = () => {
  const web3 = new Web3(Web3.providers.HttpProvider(process.env.REACT_APP_RPC_URL));

  return web3;
}

export default useWeb3;
