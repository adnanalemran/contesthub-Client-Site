import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Hero = () => {
  const { register, handleSubmit } = useForm();
  const [searchResults, setSearchResults] = useState([]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://b8a12-server-side-adnanalemran.vercel.app/contest/search/${data.search}`);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error("Error searching: ", error);
    }
  };

  return (
    <div className=" mx-auto">
      <div
      data-aos="fade-right"
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co/0rCgkbZ/index-overlay.png)",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse container">
          <img
            src="https://pixner.net/egamlio/main/assets/images/banner-illus.png"
            className="lg:pb-32 w-1/2 rounded-lg  "
          />

          <div className="lg:w-1/2 ">
            <h1 data-aos="fade-down" className=" text-3xl lg:text-7xl font-bold">
              TAKE YOUR CONTEST SKILLS TO THE NEXT LEVEL
            </h1>
            <p  data-aos="fade-up" className="py-4 lg:text-xl">
              Browse through hundreds of gaming competitions that will help you
              pursue your goals
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="join border my-5 mx-auto ">
                <input
                  required
                  type="text"
                  name="search"
                  className=" w-[200px] lg:w-[400px] bg-[#fff0] px-4 "
                  placeholder="Search Type/Tag, like: Gaming, Business, Medical"
                  {...register("search")}
                />
                <button type="submit" className="btn join-item rounded">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* searchResults */}
      <div className="grid grid-cols-3 gap-4">
        {searchResults.length > 0 &&
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
                    alt={`Contest: ${contest?.name}`}
                  />
                </div>
              </figure>
              <h2 className="text-xl font-semibold text-center pt-4">
                {contest?.contestName}
              </h2>
              <div className="card-body p-4">
                <p>
                  tag: {contest?.contestType} <br />
                  Attempted count: {contest?.Quantity} <br />
                  Description: {contest?.contestDescription} <br />
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

export default Hero;
