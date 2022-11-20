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

const topicShorthen = (topic) => {
  if (topic.length > 20)
    return topic.slice(0, 20) + '...'
    return topic
}


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
        <div className="grid gap-4 1840px:grid-cols-5 1500px:grid-cols-4 max-1500px:grid-cols-3 max-900px:grid-cols-2 max-670px:grid-cols-1 ">
          {results.map((result, index) => (
            <div
              className="container flex flex-col gap-3 border rounded-md p-5 shadow-md"
              key={index}
            >
              <p>{`#${index + 1}`}</p>
              <h5 className="overflow-hidden">{topicShorthen(web3.utils.hexToString(result.topic))}</h5>
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
