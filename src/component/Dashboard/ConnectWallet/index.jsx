import React from "react";
import Logo from "../../../assets/images/fox.png";

const ConnectWallet = ({ connectWallet }) => {
  return (
    <div className="text-center flex flex-col gap-5 p-5 border rounded-md items-center">
      <h3>Connect Your Wallet</h3>
      <p>A wallet address is required to interact with our app</p>
      <button
        onClick={connectWallet}
        className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2 gap-3"
      >
        <img src={Logo} alt="Test" className="w-5 h-5" />
        Connect Wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
