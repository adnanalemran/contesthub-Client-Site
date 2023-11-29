import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const Slider = () => {
  return (
    <>
      <div className="pt-32 pb-2">
        {" "}
        <h4 data-aos="fade-right" className="text-2xl text-blue-500 text-center">
          Our Top Winning Game 
        </h4>
        <h2 data-aos="fade-left" className="text-5xl font-bold text-center">EXPLORE OUR COACHES</h2>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}  
        autoplay={{ delay: 1000, }} 
        loop={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://i.ibb.co/1d5zRJ9/card-game-1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/qgh43bc/card-game-2.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/Wg83TC5/card-game-3.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/ZzqRbdZ/card-game-4.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="
https://i.ibb.co/q9DgFGN/card-game-5.png
 "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/Wg83TC5/card-game-3.png" />
        </SwiperSlide>{" "}
        <SwiperSlide>
          <img
            src="
https://i.ibb.co/q9DgFGN/card-game-5.png
 "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
