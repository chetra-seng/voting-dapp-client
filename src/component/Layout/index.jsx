import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Logo from "../../assets/images/blockchain.png";
import User from "../../assets/images/user.png";

const Layout = ({ children }) => {

  const [toggle, setToggle] = useState(true);

  return (
    <div className="relative flex flex-row min-h-screen">
      <div className={"absolute w-9 h-5 left-5 top-5 hover:cursor-pointer md:hidden " + (toggle ? null : "left-1/2")} onClick={() => setToggle(!toggle)}>
        <div className="absolute top-0 w-full h-1 bg-slate-800"></div>
        <div className="absolute top-1/2 w-full h-1 bg-slate-800"></div>
        <div className="absolute top-full w-full h-1 bg-slate-800"></div>
      </div>
      <div className={"basis-1/5 h-screen flex flex-col gap-10 bg-black " + (toggle ? "max-md:hidden" : null)}>
        <div className="flex flex-row min-w-max gap-3 text-white logo mx-5 py-5">
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
      <div className="basis-4/5 p-20 max-md:basis-full main-content">{children}</div>
      <img src={User} alt="User icon" className={"absolute top-5 right-5 h-10 w-10"} />
    </div>
  );
};

export default Layout;
