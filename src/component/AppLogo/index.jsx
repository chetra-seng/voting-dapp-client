import React from "react";
import Logo from "../../assets/images/logo.svg";

const AppLogo = () => {
  return (
    <div className="w-full flex flex-row justify-start items-center min-w-max gap-2 text-white logo p-3 max-md:justify-center">
      <img className="max-md:w-6 max-md:h-6 w-9 h-9" src={Logo} alt="App logo" />
      <div className="flex flex-col gap-1 relative max-md:hidden">
        <p className="text-sm font-semibold leading-none">Decentralize</p>
        <p className="text-lg font-semibold -tracking-tighter leading-none">Voting</p> 
      </div>
    </div>
  );
};

export default AppLogo;
