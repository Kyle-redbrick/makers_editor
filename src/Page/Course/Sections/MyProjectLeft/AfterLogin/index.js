import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";
import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "../index.scss";
import { URL } from "../../../../../Common/Util/Constant"
import "./index.scss";

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
        <Swiper
          spaceBetween={15}
          slidesPerView="auto"
          pagination={{ 
            clickable: true,
            type : "fraction"
          }}
          onSwiper={(s) => { setSwiper(s) }}
          onSlideChange={(e) => {props.setSlideIndex(e.activeIndex)}}
        >
        {
          props.curriculum.map( (item,index) => 
            <SwiperSlide key={index}>
              <div className={`content-slide__thumbnail-wrap content-slide__thumbnail-wrap--user ${!item.course.unlocked && "lock" }`}>
                <img alt="강의 썸네일" src={URL.S3_DREAMCLASS + item.course.posterURL} />
                <span className="content-slide__course-length">{item.course.label}</span>
              </div>
            </SwiperSlide>
          )
        }
        </Swiper>
      </div>

      <button type="button" className="swiper-button-next swiper-button-next--after-next" onClick={nextTo} />
      <button type="button" className="swiper-button-prev swiper-button-next--after-prev" onClick={prevTo} />
    </div>
  )
}

export default AfterLogin;