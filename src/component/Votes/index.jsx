import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVoteContract from "../../hooks/vote/useVoteContract";
import useWeb3 from "../../hooks/web3/useWeb3";
import Layout from "../Layout";

const Votes = () => {
  const web3 = useWeb3();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const { getAllVotes, getVoters } = useVoteContract();


  const getAllTopics = async () => {
    try {
      const res = await getAllVotes();
      const result = await Promise.all(
        res.map(async (topic) => {
          const count = await getVoteCount(topic);
          return { topic, count };
        })
      );
      setResults(result);
    } catch (err) {
      console.log(err);
    }
  };

  const getVoteCount = async (topic) => {
    try {
      const res = await getVoters(topic);
      return res.length;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllTopics();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="inter-heading2">All Vote Topics</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse ab
            facere eos? Officia excepturi consequuntur iste minus asperiores ex
            alias at laboriosam ipsum molestiae. Dolorum quasi porro illo
            aliquam quam? Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Voluptas esse omnis amet optio nulla nobis velit porro
            aspernatur eum illum.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 max-h-full max-lg:grid-cols-2 max-md:grid-cols-1 ">
          {results.map((result, index) => (
            <div
              className="container w-60 flex flex-col gap-3 border rounded-md p-5"
              key={index}
            >
              <p>{`#${index + 1}`}</p>
              <h5>{web3.utils.hexToString(result.topic)}</h5>
              <p>{`${result.count} votes`}</p>
              <button className="primary-btn" onClick={() => {
                navigate(`/votes/${result.topic}`)
              }}>View Result</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Votes;
