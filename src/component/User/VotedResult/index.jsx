import React from "react";
const VotedResult = (props) => {
    return (
        <div className="w-[270px] flex flex-col justify-start items-centere gap-3 p-4 rounded-md shadow-primary-20 shadow-sm">
           <p className="font-md text-lg text-black">#{props.id}</p>
           <p className="basis-full font-md text-lg text-black overflow-clip">{props.topic}</p>
           <p className={"font-md text-sm text-black "} >{props.vote_count} Votes</p>
           <button className="w-full font-semibold border text-secondary-60 p-2 shadow-secondary-20 shadow-sm hover:scale-[1.005] hover:text-secondary-100 hover:border-secondary-100 rounded-md">View</button>
        </div>
    );
};

export default VotedResult;