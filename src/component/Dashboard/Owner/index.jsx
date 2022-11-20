import React, { useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import CreateNewVote from "./CreateNewVote";

const OwnerOption = ({checkSession}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="box-container text-center items-center">
        <h3 className="font-semibold text-xl">Create new vote</h3>
        <p className="font-md text-sm text-slate-800">Add a new vote topic</p>
        <button onClick={() => {setShowModal(true)}} className="max-w-[70%] min-w-max flex items-center justify-center gap-2 w-full rounded-md text-slate-100 bg-[#337ee8] hover:bg-[#337ee8]/90 hover:text-white hover:shadow-md active:scale-[.99] active:bg-[#337ee8]/70 cursor-pointer p-2">
            <AiOutlinePlusSquare size={20} />
            <span>Create a topic</span>
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <CreateNewVote setShowModal={setShowModal} checkSession={checkSession} />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default OwnerOption;
