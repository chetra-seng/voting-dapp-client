import React from "react";
import Button from "../../Button"
import SessionTopicIndicator from "../../owner/SessionTopicIndicator";
import X from "../../../assets/images/x.svg";

const AddVoteOption = (props) => {
    return (
        <div className={"flex flex-col gap-5 justify-center items-start rounded-md border-gray-300 shadow-md p-8 " + (props.disable ? "opacity-50" : null)}>
            <h1 className="font-medium text-[1.75rem] text-slate-900">Add Vote Option</h1>
            <p className="font-medium text-sm text-gray-700">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ex doloremque iure voluptatibus perspiciatis provident!</p>
            <div className="w-full flex flex-col gap-5 justify-center items-start rounded-md border border-gray-300 p-8">
                <SessionTopicIndicator name="In Registration" styles="bg-[#4CCAF0]" vote_title={props.vote_title}/>
                <div className="w-full flex flex-col grow gap-2">
                    <p className="text-sm font-md text-gray-800">Vote Options</p>
                    {/* Vote option input item */}
                    <div className="relative w-full">
                        <img onClick={() => {}} src={X} className="absolute z-10 top-1/2 -translate-y-1/2 right-2 text-sm w-4 h-4 hover:cursor-pointer" />
                        <input disabled={props.disable} type="text" className="h-8 w-full p-5 focus:outline-none border-none caret-slate-500 rounded-sm text-slate-900 bg-input hover:bg-secondary-20 focus:bg-secondary-20" />
                    </div>
                   
                    <Button onClick={ props.disable ? () => {} : props.onClick } name="Add Option"/>
                </div>
            </div>
        </div>
    );
};

export default AddVoteOption;