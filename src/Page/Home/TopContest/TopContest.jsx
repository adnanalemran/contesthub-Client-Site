import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopContest = () => {
  const [contest, setContest] = useState([]);

  useEffect(() => {
    axios
      .get(`https://b8a12-server-side-adnanalemran.vercel.app/contestTop6`)
      .then((res) => {
        setContest(res.data);
      })
      .catch((error) => {
        console.error("Error fetching contest data:", error);
      });
  }, []);

  return (
    <div className="pt-16">
     
      <h4 data-aos="fade-right" className="text-2xl text-blue-500 text-center">Top #6 Contest</h4>
      <h2 data-aos="fade-left" className="text-5xl font-bold text-center">Top popular Contest </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {contest.map((contest) => (
          <div
          data-aos="fade-up"
            key={contest?._id}
            className="card w-full bg-[#0000005d] rounded-lg shadow-xl"
          >
            <h2 className="text-xl font-semibold text-center pt-4">
              {contest?.contestName}
            </h2>
            <figure className="m-4">
              <div className="h-44 w-[500px] rounded-xl bg-base-300">
                <img
                  className="h-44 rounded-xl mx-auto"
                  src={contest?.image}
                  alt={contest?.name}
                />
              </div>
            </figure>
            <h2 className="text-xl font-semibold text-center pt-4">
              {contest?.contestName}
            </h2>
            <div className="card-body p-4">
              <p>
                Category: {contest?.contestType} <br />
                Attempted count: {contest?.Quantity} <br />
                Description: {contest?.contestDescription.slice(0, 20)}...{" "}
                <br />
              </p>

              <div className="card-actions flex justify-end grid-cols-3">
                <Link to={`/contest/${contest?._id}`}>
                  <button className="text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContest;
