import React, { useEffect, useState } from "react";
import useVoteContract from "../../hooks/vote/useVoteContract";
import useWeb3 from "../../hooks/web3/useWeb3";
import Layout from "../Layout";
import VotedResult from "../User/VotedResult";

const FinishedVote = () => {
  const [topic, setTopic] = useState(null);

  const {getLatestTopic} = useVoteContract();

  const getTopic = async () => {
    try {
      const res = await getLatestTopic();
      if(res){
				setTopic(res);
			}
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTopic();
  }, [])

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        <div className="bg-primary-100">

        </div>
        <p className="text1">{topic}</p>
        <div className=""></div>
      </div>
    </Layout>
  );
};

export default FinishedVote;
