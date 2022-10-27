import React from "react";
import Logo from "../../assets/images/blockchain.png";
import User from "../../assets/images/user.png";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <div className="basis-1/5 flex flex-col bg-black side-bar gap-10">
        <div className="flex flex-row gap-3 text-white mx-auto logo py-5">
          <img className="w-8 h-8" src={Logo} alt="App logo" />
          <h3 className="tracking-widest">Decentralize Voting</h3>
        </div>
        <div className="flex flex-col gap-3 text-white mx-auto grow my-auto tracking-wide sidebar-item">
          <div className="flex flex-row gap-3 items-center">
            <input type={"checkbox"} disabled className="w-5 h-5" />
            <h3>Dashboard</h3>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <input type={"checkbox"} disabled className="w-5 h-5" />
            <h3>On going votes</h3>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <input type={"checkbox"} disabled className="w-5 h-5" />
            <h3>Finished Votes</h3>
          </div>
        </div>
      </div>
      <div className="basis-4/5 p-20 main-content">{children}</div>
      <img src={User} alt="User icon" className={"absolute top-5 right-5 h-10 w-10"} />
    </div>
  );
};

export default Layout;
