import React from "react";
import { BiMenuAltLeft } from 'react-icons/bi';
import { BiArrowFromRight } from 'react-icons/bi';
import { useState } from "react";
import Logo from "../../assets/images/blockchain.png";
import User from "../../assets/images/user.png";
import dashboard from "../../assets/images/dashboard.png";
import graph from "../../assets/images/graph.png";

const Layout = ({ children }) => {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [menuIndicator, setMenuIndicator] = useState(false);
  return (
    <div className="relative flex flex-row h-screen w-full">
      <div className="absolute left-3 top-3 md:hidden">
        { toggleMenu 
           ? null
           : <BiMenuAltLeft fontSize={50} className='text-primary-dark cursor-pointer' onClick={() => setToggleMenu(true)} />
        }
      </div>
      { toggleMenu && (
      <div className={"absolute left-0 top-0 z-10 rounded-r-md basis-1/5 bg-primary-dark md:hidden h-screen flex flex-col gap-10 animate-slide"}>
        <BiArrowFromRight fontSize={35} className='absolute -right-8 top-1 text-primary-dark  cursor-pointer' onClick={() => setToggleMenu(false)} />
        <div className="flex flex-row min-w-max gap-3 text-white logo mx-5 py-5">
          <img className="w-8 h-8" src={Logo} alt="App logo" />
          <h3 className="tracking-widest">Decentralize Voting</h3>
        </div>
        <div className="flex flex-col gap-3 text-white grow sidebar-item">
          <div onClick={() => setMenuIndicator(true) } className={"flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all" + (menuIndicator ? " bg-primary-100" : null)}>
            <img src={dashboard} className="w-4 h-4" alt="Dashboard icon"/>
            <h3>Dashboard</h3>
          </div>
          <div onClick={() => setMenuIndicator(false) } className={"flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all" + (menuIndicator ? null : " bg-primary-100")}>
          <img src={graph} className="w-5 h-5" alt="Vote icon"/>
            <h3>Finished Votes</h3>
          </div>
        </div>
      </div>
      )}

      <div className={"basis-1/5 h-screen max-md:hidden flex flex-col gap-10 bg-black "}>
        <div className="flex flex-row min-w-max gap-3 text-white logo mx-5 py-5">
          <img className="w-8 h-8" src={Logo} alt="App logo" />
          <h3 className="tracking-widest">Decentralize Voting</h3>
        </div>
        <div className="flex flex-col gap-3 text-white grow sidebar-item">
          <div onClick={() => setMenuIndicator(true) } className={"flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all" + (menuIndicator ? " bg-primary-100" : null)}>
            <img src={dashboard} className="w-4 h-4" alt="Dashboard icon"/>
            <h3>Dashboard</h3>
          </div>
          <div onClick={() => setMenuIndicator(false) } className={"flex flex-row justify-start gap-3 h-10 items-center px-3 transition-all" + (menuIndicator ? null : " bg-primary-100")}>
          <img src={graph} className="w-5 h-5" alt="Vote icon" />
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
