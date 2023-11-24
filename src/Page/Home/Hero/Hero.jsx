import React from "react";

const Hero = () => {
  return (
    <div className=" mx-auto">
      <div
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
            <h1 className=" text-3xl lg:text-7xl font-bold">
              TAKE YOUR GAME TO THE NEXT LEVEL
            </h1>
            <p className="py-4 lg:text-xl">
              Browse through hundreds of gaming competitions that will help you
              pursue your goals
            </p>
            <div className="join border my-5 mx-auto ">
              <input
                className="w-[400px] bg-[#fff0] px-4 "
                placeholder="Search Contest"
              />
              <button className="btn join-item rounded ">Search</button>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto z-10 lg:sticky  ">
        <div className="   flex w-full lg:w-3/4 mx-auto   justify-around  bg-[#1b1d4d] p-8 gap-9 text-center rounded-lg lg:-mt-24">
          <div className=" ">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/counter-icon-1.png"
              alt=""
            />
            <p className="pt-4"> Games</p>
          </div>
          <div className=" ">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/counter-icon-2.png"
              alt=""
            />
            <p className="pt-4"> Pro Coaches</p>
          </div>

          <div className=" ">
            <img
              src="https://pixner.net/egamlio/main/assets/images/icon/counter-icon-3.png"
              alt=""
            />
            <p className="pt-4"> championship </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
