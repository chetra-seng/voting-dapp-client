import React from "react";
import Logo from "../../assets/images/logo.png";

const AppLogo = () => {
    return (<div className="flex flex-row min-w-max gap-3 text-white logo mx-5 py-5">
    <img className="w-8 h-8" src={Logo} alt="App logo" />
    <h3 className="tracking-widest">Decentralize Vote</h3>
</div>
);
};

export default AppLogo;