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
            List of existing votes topic and their results. User can choose to
            views old vote topic and vote count on each option. However, voting
            remain anonymous for all user, once voted, nobody can change the
            result or manipulate vote result.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 max-h-full place-content-center place-items-center max-md:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3">
          {results.map((result, index) => (
            <div
              className="container w-60 flex flex-col gap-3 border rounded-md p-5"
              key={index}
            >
              <p>{`#${index + 1}`}</p>
              <h5>{web3.utils.hexToString(result.topic)}</h5>
              <p>{`${result.count} votes`}</p>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => {
                  navigate(`/votes/${result.topic}`);
                }}
              >
                View Result
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Votes;
