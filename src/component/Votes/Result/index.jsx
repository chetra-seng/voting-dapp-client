import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useVoteContract from "../../../hooks/vote/useVoteContract";
import useWeb3 from "../../../hooks/web3/useWeb3";
import Layout from "../../Layout";

const Result = () => {
  const { id } = useParams();
  const web3 = useWeb3();
  const { getVoteCount, getVoters, getVoteOptions } = useVoteContract();
  const [votes, setVotes] = useState(null);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const getTotalVotes = async () => {
    try {
      const res = await getVoters(id);
      setVotes(res.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getVoteResult = async () => {
    try {
      const opts = await getVoteOptions(id);
      const voteRes = await Promise.all(
        opts.map(async (opt) => {
          const count = await getVoteCount(id, opt);
          return { option: opt, count };
        })
      );
      setResults(voteRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTotalVotes();
    getVoteResult();
  }, []);

  return (
    <Layout>
      <div className="container flex justify-center items-center w-full">
        <div className="flex flex-col gap-5 w-[50vh] border-2 shadow-md p-5">
          <div className="flex self-start">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Go back
            </button>
          </div>
          <div className="flex flex-col justify-center items-center bg-primary-80 p-10 text-white">
            <h3 className="h2">Vote Results 🎉</h3>
            <p>{`${votes} votes`}</p>
          </div>
          <p>{web3.utils.hexToString(id)}</p>
          <div className="flex flex-col gap-2">
            {results
              .sort((a, b) => b.count - a.count)
              .map((result) => (
                <div
                  key={result.option}
                  className="flex flex-row justify-between border rounded-sm p-2"
                >
                  <p>{web3.utils.hexToString(result.option)}</p>
                  <p>{`${result.count} votes`}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
