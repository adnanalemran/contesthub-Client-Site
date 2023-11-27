import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const SkeletonLoader = () => {
  return (
    <div className="md:w-[768px] lg:w-[1280px] mx-auto">
      <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="card w-full bg-[#0000005d] rounded-lg shadow-xl animate-pulse"
            >
              <h2 className="text-xl font-semibold text-center pt-4 animate-pulse"></h2>
              <figure className="m-4">
                <div className="h-44 w-[500px] rounded-xl bg-base-300 animate-pulse"></div>
              </figure>
              <div className="card-body p-4">
                <p>
                  Category: Loading... <br />
                  Quantity: Loading... <br />
                </p>
                <p className="text-lg font-bold">BDT: Loading... Tk</p>
                <div className="card-actions flex justify-end grid-cols-3">
                  <button className="text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800 bg-gray-300 animate-pulse">
                    Loading...
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const AllContest = () => {
  const [contest, setContest] = useState([]);
  const { count } = useLoaderData();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numberOfPages = parseInt(Math.ceil(count / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/contest?page=${currentPage}&size=${itemsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => setContest(data));
  }, [currentPage]);

  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    fetch(`http://localhost:5000/contest/search/${text}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error searching  ", error));
  };
  return (
    <div className="pb-28 pt-10 md:w-[768px] lg:w-[1280px] mx-auto">
      <Helmet>
        <title>Contest || All contest page</title>
      </Helmet>
<p className="py-2 font-bold text-xl">Find contest type or tags</p>
<hr />
      <div className="w-full py-8">
        <ul className="flex gap-4">
          <li className="btn">
            <button onClick={() => handleSearch("Gaming")}>Gaming</button>
          </li>
          <li className="btn">
            <button onClick={() => handleSearch("Business")}>Business</button>
          </li>
          <li className="btn">
            <button onClick={() => handleSearch("Medical")}>Medical</button>
          </li>
          <li className="btn">
            <button onClick={() => handleSearch("Article")}>Article</button>
          </li>
        </ul>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {searchResults.length > 0 ? (
          searchResults.map((contest) => (
            <div
              key={contest?._id}
              className="card w-full bg-[#0000005d] rounded-lg shadow-xl"
            >
              <h2 className="text-xl font-semibold text-center pt-4"></h2>
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
                {contest?.name}
              </h2>
              <div className="card-body p-4">
                <p>
                  Category: {contest?.Category} <br />
                  Quantity: {contest?.Quantity} <br />
                </p>
                <p className="text-lg font-bold">BDT: {contest?.price} Tk</p>
                <div className="card-actions flex justify-end grid-cols-3">
                  <Link to={`/food/${contest?._id}`}>
                    <button className="text-white bg-blue-700 hover-bg-blue-800 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark-bg-blue-600 dark-hover-bg-blue-700 dark-focus-ring-blue-800">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : contest.length === 0 ? (
          <SkeletonLoader />
        ) : (
          contest.map((contest) => (
            <div
              key={contest?._id}
              className="card w-full bg-[#0000005d] rounded-lg shadow-xl"
            >
              <h2 className="text-xl font-semibold text-center pt-4"></h2>
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
                  Description:  {contest?.contestDescription.slice(0, 20)}... <br />
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
          ))
        )}
      </div>
      <div className="flex justify-center space-x-1 pagination">
        <button
          onClick={handlePrevPage}
          title="previous"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark-bg-gray-900 dark-border-gray-800"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            key={page}
            type="button"
            title={`Page ${page + 1}`}
            className={currentPage === page ? "selected" : undefined}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          title="next"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark-bg-gray-900 dark-border-gray-800"
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AllContest;
