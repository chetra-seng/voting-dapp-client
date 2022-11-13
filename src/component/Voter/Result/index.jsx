import React from "react";
const Result = (props) => {
    return (
        <div className="flex flex-row gap-2 p-4 rounded-sm shadow-primary-20 shadow-sm">
           <p className="font-md text-lg text-black">{props.title}</p>
           <p className={"font-md text-lg text-white min-w-max p-1 rounded-sm bg-primary-dark " + (props.bg)} >{props.vote_count} Votes</p>
        </div>
    );
};

export default Result;