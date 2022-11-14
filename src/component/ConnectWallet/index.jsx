import React from "react";
import Logo from "../../assets/images/fox.png";

const ConnectWallet = ({connectWallet}) => {
  return (
    <div className="text-center flex flex-col gap-5 p-5 border rounded-md items-center shadow-md">
      <h3>Connect Your Wallet</h3>
      <p>A wallet address is required to interact with our app</p>
      <button onClick={connectWallet} className="w-full text-white bg-secondary-100 hover:opacity-90 active:scale-[1.005] active:opacity-100 font-medium rounded-lg text-sm px-5 py-2.5 gap-3 shadow-md">
        <div className=" items-center inline-flex gap-3">
          <img src={Logo} alt="Test" className="w-5 h-5" />
          Connect Wallet
        </div>
      </button>
    </div>
  );
};

export default ConnectWallet;
