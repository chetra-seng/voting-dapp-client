import React from "react";
import { useNavigate } from "react-router-dom";

const ReloadPageVote = (props) => {
  const navigate = useNavigate();

  return (
    <div className={"box-container " + props.styles}>
      <h1 className="font-medium text-[1.75rem] text-slate-900 tracking-wider">
        Vote is On Going!
      </h1>
      <p className="font-medium text-sm text-gray-700">
        The registeration session has end! Please reload the page.
      </p>
      <button
        className="primary-btn"
        onClick={() => navigate(0)}
        name="Reload Page"
      />
    </div>
  );
};

export default ReloadPageVote;
