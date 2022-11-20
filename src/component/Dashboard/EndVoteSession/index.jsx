import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const EndVoteSession = () => {
	const navgivate = useNavigate();

  return (
    <div className="min-w-min max-w-max box-container bg-slate-200 shadow-md">
      <h1 className="font-medium text-[1.75rem] text-slate-900">
        End Vote Session
      </h1>
      <p className="font-medium text-sm text-gray-700">
        The vote session has end now click on button below to view the results.
      </p>
      <div className="min-w-[90%] flex self-center">
          <Button onClick={() => navgivate("/votes")} name="View Result" />
      </div>
    </div>
  );
};

export default EndVoteSession;
