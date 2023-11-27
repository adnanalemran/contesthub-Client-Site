import React from 'react';

const Sticy = () => {
    return (
        <div>
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

export default Sticy;