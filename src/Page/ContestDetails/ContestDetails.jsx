import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Helmet } from "react-helmet";
const ContestDetails = () => {
  const [contest, setContest] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://b8a12-server-side-adnanalemran.vercel.app/contest/${id}`)
        .then((response) => response.json())
        .then((data) => setContest(data))
        .catch((error) =>
          console.error("Error fetching product data: ", error)
        );
    }
  }, [id]);

  return (
    <div className="my-32">
      <Helmet>
        <title>Contest hub || details page</title>
      </Helmet>
      <div className="card lg:card-side shadow-xl">
        <figure className="w-full md:w-1/3 p-8">
          <img
            className=" rounded-xl mx-auto"
            src={contest?.image}
            alt="Album"
          />
        </figure>
        <div className="card-body w-full lg:w-2/3">
          <h2 className="card-title text-4xl py-4">{contest?.contestName}</h2>{" "}
          <p>● Attempted count/ participation count: {contest?.Quantity}</p>
          <p>● Category: {contest?.Category}</p>
          <p>● Prize Money: {contest?.prizeMoney}</p>
          <p>● Contest Winner Name and image: {contest?.chiefNames}</p>
          <p>● Deadline   : {contest?.contestDeadline}</p>
          <p>● Description of Contest : {contest?.contestDescription}</p>
          <div className="card-actions justify-end">
            <Link to={`/contest/registration/${contest?._id}`}>
              <button className="btn btn-warning">Registration </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
