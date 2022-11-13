import React from "react";

const CreateNewVote = () => {
  return (
    <>
        <div className="flex flex-col gap-9 border rounded-md p-9 w-[440px] h-[310px] shadow-md">
            <div className="title-wrapper">
                <div className="text-2xl font-medium">Create New Vote</div>
                <div className="text-sm font-medium">Weeeeeeee</div>
            </div>
            <div className="relative left-0 font-popin font-medium">
                <div className="font-medium text-sm">Vote Title</div>
                <input className="w-full h-[48px] focus:outline-none bg-white px-4 rounded-md shadow-md" type="text"/>
            </div>
            <div className="flex items-center justify-center w-full h-[48px] rounded-md text-slate-100 bg-[#337ee8] hover:bg-[#337ee8]/90 hover:text-white hover:shadow-md active:scale-[.99] active:bg-[#337ee8]/70 cursor-pointer">
                Create Now
            </div>
        </div>
    </>
    );
};

export default CreateNewVote;
