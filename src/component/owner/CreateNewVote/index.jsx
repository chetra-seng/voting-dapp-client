import React from "react";
import Button from "../../Button";


const CreateNewVote = (props) => {
  return (
    <>
        <div className={"flex flex-col gap-4 border rounded-md p-9 shadow-md " + (props.disable ? "opacity-50" : null)}>
            <div className="title-wrapper">
                <div className="text-2xl font-medium">Create New Vote</div>
                <div className="text-sm font-medium">Weeeeeeee</div>
            </div>
            <div className="relative left-0 font-popin font-medium">
                <div className="font-medium text-sm mb-1">Vote Title</div>
                <input disabled={props.disable!=null ? props.disable:false} className="w-full h-[48px] focus:outline-none px-4 rounded-md shadow-md bg-input" type="text"/>
            </div>
            <Button onClick={props.onClick} name="Create Now"/>
        </div>
    </>
    );
};

export default CreateNewVote;
