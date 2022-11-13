import useWeb3 from "./useWeb3";
import contractConfig from "../assets/config/contract.json";

const useSendTransaction = async (method) => {
  const web3 = useWeb3();
  const adminAcc = web3.eth.accounts.privateKeyToAccount(
    contractConfig.ownerKey
  );
  const estGas = method.estimateGas();

  try {
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractConfig.admin,
        data: method.encodeABI(),
        gas: Math.ceil(estGas * 1.05),
      },
      adminAcc.privateKey
    );

    const res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return res;
    
  } catch (err) {
    console.log(err);
  }
};

export default useSendTransaction;
