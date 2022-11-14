import React from "react";

import SessionTopicIndicator from "../../owner/SessionTopicIndicator";
import Button from "../../Button";

const SubmitVote = (props) => {
    return (
        <div className="w-full flex flex-col gap-5 justify-center items-start rounded-md border border-gray-300 p-8">
                <SessionTopicIndicator name="On Going Vote Session" styles="bg-[#4CCAF0]" vote_title={props.vote_title}/>
                <div className="w-full flex flex-col grow gap-2">
                    {/* Select vote item */}
                    <div className="relative w-full">
                        <input type="radio" id="Figma1" name="option" className="absolute z-10 top-1/2 -translate-y-1/2 right-2"/>
                        <input disabled type="text" value="Figma1" className="h-8 w-full p-5 focus:outline-none border-none caret-slate-500 rounded-sm text-slate-900 bg-input hover:bg-secondary-20 focus:bg-secondary-20" />
                    </div>
                    
                    <Button onClick={props.onClick } name="Submit Vote"/>
                </div>
            </div>
    );
};

export default SubmitVote;