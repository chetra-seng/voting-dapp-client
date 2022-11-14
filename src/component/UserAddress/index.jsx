import React from "react";
import { MdContentCopy } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
};

const UserAddressAccount = (props) => {
    return (
        <div className="relative flex flex-col gap-3 p-5 border rounded-md text-center shadow-md">
       <FaUserCircle fontSize={30} className={"self-center text-primary-dark"} />
          <h1 className="font-semibold text-sm">
          {props.owner ? "You're owner" : props.admin? "You're admin": "You're user"}
          </h1>
          <div className="inline-flex justify-center items-center self-center gap-1 rounded-md border border-gray-400 px-2">
          <p className="font-md text-sm text-gray-600">{props.address.slice(0, 6) + "..." + props.address.slice(-10,-6) + "..."}</p>
          <MdContentCopy onClick={() => copyToClipboard(props.address)} fontSize={15} className="text-primary-dark hover:text-primary-dark/60 focus:text-primary-dark/60 active:text-primary-dark"/>
        </div>
      </div>
    );
};

export default UserAddressAccount;