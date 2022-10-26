import React, { createContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useWeb3 from "../hooks/useWeb3";

export const Web3Context = createContext();
const Web3Provider = ({ children }) => {
  const web3 = useWeb3();
  const [address, setAddress] = useState(null);
  const [hasMetaMask, setHasMetaMask] = useState(true);
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
    } else {
      setHasMetaMask(false);
    }

    return () => {
      window.removeEventListener("accountsChanged", (accounts) => {
        setAddress(accounts[0]);
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
      isUnlocked();
      setTimeout(() => {
        const addr = window.ethereum.selectedAddress;
        setAddress(addr);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chainId = async () => {
    if (hasMetaMask) {
      try {
        return await window.ethereum.request({ method: "eth_chainId" });
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

  const switchToCamDLNetwork = async () => {
    if (hasMetaMask) {
      const camdlChain = web3.utils.toHex(process.env.REACT_APP_CHAIN_ID);
      try {
        const res = await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: camdlChain }],
        });
        console.log(res);
      } catch (err) {
        console.log(err);
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
