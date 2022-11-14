import useWeb3 from "../web3/useWeb3";
import contractConfig from "../../assets/config/contract.json";
import adminAbi from "./admin.json";

const useAdminContract = () => {
  const web3 = useWeb3();
  const contractAddr = contractConfig.admin;
  const adminContract = new web3.eth.Contract(adminAbi.abi, contractAddr);

  const getOwner = async () => {
    return await adminContract.methods.owner().call();
  }

  const addAdmin = async (address) => {
    return await adminContract.addAdmin(address, 1);
  }

  const isAdmin = async (address) => {
    return await adminContract.methods.isExisted(address).call();
  }

  return {getOwner, addAdmin, isAdmin}
}

export default useAdminContract;