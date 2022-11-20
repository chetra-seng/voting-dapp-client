import React from "react";
import { MdContentCopy } from "react-icons/md";
import { faker } from "@faker-js/faker";

const copyToClipboard = (address) => {
  navigator.clipboard.writeText(address);
};

const UserAddressAccount = (props) => {
  return (
    <div
      className={
        "relative flex flex-col gap-2 p-5 border rounded-md text-center shadow-md " +
        props.styles
      }
    >
      <img
        className="w-14 h-14 rounded-full self-center"
        src={faker.image.cats()}
        alt="avator"
      />
      <h1 className="inter-caption lg:inter-body2 md:inter-body2">
        {props.owner
          ? "You're owner"
          : props.admin
          ? "You're admin"
          : "You're user"}
      </h1>
      <div className="inline-flex justify-center items-center self-center gap-1 rounded-md border border-gray-400 px-2">
        <p className="inter-caption text-gray-600 lg:inter-body md:inter-body">
          {props.address.slice(0, 10) + "..." + props.address.slice(-11, -1)}
        </p>
        <MdContentCopy
          onClick={() => copyToClipboard(props.address)}
          fontSize={15}
          className="text-primary-dark hover:text-primary-dark/60 focus:text-primary-dark/60 active:text-primary-dark"
        />
      </div>
    </div>
  );
};

export default UserAddressAccount;
