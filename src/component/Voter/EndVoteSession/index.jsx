import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const EndVoteSession = () => {
	const navgivate = useNavigate();

  return (
    <div className=" w-[450px] flex flex-col gap-5 justify-center items-start p-9 rounded-md shadow-md">
      <h1 className="font-medium text-[1.75rem] text-slate-900">
        End Vote Session
      </h1>
      <p className="font-medium text-sm text-gray-700">
        The vote session has end now click on button below to view the results.
      </p>
      <Button onClick={() => navgivate("/votes")} name="View Result" />
    </div>
  );
};

export default EndVoteSession;
