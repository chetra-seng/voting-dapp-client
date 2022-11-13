import useWeb3 from "./useWeb3";
import contractConfig from "../assets/config/contract.json";
import adminAbi from "../contract/admin/admin.json";

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

  const isExisted = async (address) => {
    return await adminContract.isExisted(address);
  }

  return {getOwner, addAdmin, isExisted}
}

export default useAdminContract;