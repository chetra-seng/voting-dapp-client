import React from "react";
import Result from "../Result";
const VoteResults = (props) => {
    return (
        <div className=" w-[560px] flex flex-col gap-5 justify-center items-start p-5 rounded-md shadow-md">
           <div className="w-full flex flex-col items-center justify-center gap-2 bg-primary-100 p-5 rounded-md">
                <div className="font-semibold text-[2.5rem] text-white ">Vote results 🎉 </div>
                <p className="font-light text-sm text-white">35 votes</p>
           </div>
           <p className="font-light text-sm text-white">{props.vote_title}</p>
            <div className="flex flex-wrap flex-row justify-center gap-5 items-center">
                <Result title="Figma" vote_count="20" />
                <Result title="Figmo" vote_count="2000" bg="bg-primary-100"/>
                <Result title="Figsmeow" vote_count="20" />
                <Result title="Figmu" vote_count="20" />
                <Result title="Figme" vote_count="20" />
            </div>
        </div>
    );
};

export default VoteResults;