import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import Thumbnail from "../../../../../Image/course_thumbnail.png";
import "../index.scss";

function BeforeLogin () {
  SwiperCore.use([Pagination]);

  const [swiper, setSwiper] = React.useState(null);

  const nextTo = () => {
    swiper.slideNext();
  };

  const prevTo = () => {
    swiper.slidePrev();
  };

  return (
    <div className="content-slide">
      <div className="content-slide__slide">
        <Swiper 
          spaceBetween={15}
          slidesPerView="auto"
          pagination={{ 
            clickable: true, 
            type : "fraction"
          }}
          onSwiper={(s) => {
            setSwiper(s);
          }}
        >
          <SwiperSlide>
            {/* TODO course 횟수 */}
            <span className="content-slide__course-number">Coures 1</span>
            {/* TODO 강의명 */}
            <h3 className="content-slide__course-title">OOBC - Elementary</h3>
            <div className="content-slide__thumbnail-wrap">
              {/* TODO 썸네일 */}
              <img alt="강의 썸네일" src={Thumbnail} />
            </div>
            <p className="content-slide__explan">
              Learns for students new to coding. Learn to code by creating simple games with block coding. 최대 3줄 까지.
            </p>
            <button type="button" className="content-slide__experience-btn">Experience</button>
          </SwiperSlide>
          <SwiperSlide>slide2</SwiperSlide>
        </Swiper>
      </div>

      <button type="button" className="swiper-button-next" onClick={nextTo} />
      <button type="button" className="swiper-button-prev" onClick={prevTo} />
    </div>
  )
}

export default BeforeLogin;