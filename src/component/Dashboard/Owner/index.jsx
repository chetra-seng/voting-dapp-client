import React, { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import CreateNewVote from "./CreateNewVote";

const INACTIVE_SESSION = "Inactive";
const OwnerOption = () => {
  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState(null);

  const { getCurrentSession } = useVoteContract();
  const checkSession = async () => {
    try {
      const res = await getCurrentSession();
      // getCurrentSession response
      // {
      //   0: "index",
      //   1: "sessionName",
      //   2: "currentBlock",
      //   3: "EndBlock"
      // }
      setSession(res["1"]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  });

  return (
    <>
      <div className="box-container">
        <span className={session === INACTIVE_SESSION? "green-badge": "red-badge"}>{session}</span>
        <h3 className="font-semibold text-xl">New Vote</h3>
        <p>
          Please click on create a topic, enter a topic for other to vote, and
          the voting session will begin. Once the vote is started, it can't be
          stopped until the vote is complete.
        </p>
        <div className="flex self-center">
          <button
            disabled={session !== INACTIVE_SESSION}
            onClick={() => {
              setShowModal(true);
            }}
            className={
              session !== INACTIVE_SESSION ? "disabled-btn" : "primary-btn"
            }
          >
            <AiOutlinePlusSquare size={20} />
            <span>Create a topic</span>
          </button>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <CreateNewVote
                  setShowModal={setShowModal}
                  checkSession={checkSession}
                />
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
