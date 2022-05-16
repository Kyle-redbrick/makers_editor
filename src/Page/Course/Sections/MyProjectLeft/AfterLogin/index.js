import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import Thumbnail from "../../../../../Image/course_thumbnail.png";
import "../index.scss";

function AfterLogin (props) {
  SwiperCore.use([Pagination]);

  const [swiper, setSwiper] = React.useState(null);

  const nextTo = () => {
    swiper.slideNext();
  };

  const prevTo = () => {
    swiper.slidePrev();
  };

  return (
    <div className="content-slide content-slide--user">
      <div className="content-slide__slide content-slide__slide--user">
        {console.log(1111123123123)}
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            type : "fraction"
          }}
          onSwiper={(s) => {
            setSwiper(s);
          }}
        >
          <SwiperSlide>
            {
              console.log(111111122222,props)
              // props.curriculum.map((item,index) => {
              //   <div className="content-slide__thumbnail-wrap content-slide__thumbnail-wrap--user">
              //   {/* TODO 썸네일 */}
              //   <img alt="강의 썸네일" src={Thumbnail} />
              //   <span className="content-slide__course-length">Course 1</span>
              // </div>
              // })
            }
          </SwiperSlide>
          <SwiperSlide>slide2</SwiperSlide>
        </Swiper>
      </div>

      <button type="button" className="swiper-button-next" onClick={nextTo} />
      <button type="button" className="swiper-button-prev" onClick={prevTo} />
    </div>
  )
}

export default AfterLogin;