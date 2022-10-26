import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useWeb3 from "../hooks/useWeb3";
import networkConfig from "../assets/config/network.json";

export const Web3Context = createContext();
const Web3Provider = ({ children }) => {
  const web3 = useWeb3();
  const [address, setAddress] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [chainId, setChainId] = useState(null);

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
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
      });
      window.ethereum.on("chainChanged", (chainId) => {
        setChainId(chainId);
      });
    } else {
      setHasMetaMask(false);
    }

    return () => {
      window.removeEventListener("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
      });
      window.removeEventListener("chainChanged", (chainId) => {
        setChainId(chainId);
      });
    };
  }, [hasMetaMask]);

  const isUnlocked = async () => {
    try {
      const addresses = await web3.eth.accounts.getAccounts();
      return addresses.length > 0;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (hasMetaMask) {
      getChainId();
      isUnlocked();
      setTimeout(() => {
        const addr = window.ethereum.selectedAddress;
        setAddress(addr);
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChainId = async () => {
    if (hasMetaMask) {
      try {
        const res = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const connectWallet = async () => {
    if (hasMetaMask) {
      try {
        const addresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addresses.length > 0) {
          setAddress(addresses[0]);
        }
        toast.success("Connect wallet successful", options);
      } catch (err) {
        console.log(err);
        if (err?.code) {
          toast.error(err.message, options);
          return;
        }
        toast.error(err.message, options);
      }
    } else {
      toast.error("Please install MetaMask", {
        ...options,
        onClick: () => {
          window.open("https://metamask.io/download/", "_blank");
        },
      });
    }
  };

  const addNetwork = async () => {
    if (hasMetaMask) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${networkConfig.chainId.toString(16)}`,
              chainName: networkConfig.chainName,
              nativeCurrency: {
                name: networkConfig.currencyName,
                symbol: networkConfig.currencySymbol,
                decimals: networkConfig.currencyDecimals,
              },
              rpcUrls: [networkConfig.rpcUrl],
              blockExplorerUrls: [networkConfig.blockExplorer],
            },
          ],
        });
      } catch (err) {
        toast.err(err.message, options);
      }
    }
  };

  const switchToCamDLNetwork = async () => {
    if (hasMetaMask) {
      await addNetwork();
      const camdlChain = web3.utils.toHex(networkConfig.chainId);
      try {
        const res = await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: camdlChain }],
        });
        console.log(res);
        toast.success("Login Successful", options);
      } catch (err) {
        console.log(err);
        toast.error("Login Failed", options);
      }
    } else {
      toast.error("Please install MetaMask", {
        ...options,
        onClick: () => {
          window.open("https://metamask.io/download/", "_blank");
        },
      });
    }
  };

  return (
    <Web3Context.Provider
      value={{
        hasMetaMask,
        connectWallet,
        chainId,
        address,
        switchToCamDLNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
