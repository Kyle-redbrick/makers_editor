import React, {useEffect, useRef, useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "./index.scss";

function MyProjectLeft () {
  return (
    <div className="LeftSlide">
      { true ? <BeforeLogin /> : <AfterLogin /> }
    </div>
  )
}

export default MyProjectLeft ;


/* TODO 로그인 전 슬라이드 배너 */
const BeforeLogin = () => {
  const [swiper, setSwiper] = React.useState(null);

  const nexTo = () => {
    swiper.slideNext();
  };

  const prevTo = () => {
    swiper.slidePrev();
  };

  return (
    <>
      <h3 className="page-title">원하는 코스를 무료로 체험해보세요</h3>
      <div className="content-slide">
        <div className="content-slide__slide">
          <Swiper 
            spaceBetween={15}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
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
                <img alt="" src="" />
              </div>
              <p className="content-slide__explan">
                Learns for students new to coding. Learn to code by creating simple games with block coding. 최대 3줄 까지.
              </p>
              <button type="button" className="content-slide__experience-btn">Experience</button>
            </SwiperSlide>
            <SwiperSlide>slide2</SwiperSlide>
          </Swiper>
        </div>

        <button type="button" className="swiper-button-next" onClick={nexTo} />
        <button type="button" className="swiper-button-prev" onClick={prevTo} />
      </div>
    </>
  )
}
/* // 로그인 후 슬라이드 배너 */

/* TODO 로그인 후 슬라이드 배너 */
const AfterLogin = () => {
  return (
    <div className="content-slide">
      <span className="content-slide__course-number">Coures 1</span>
      <h3 className="content-slide__course-title">OOBC - Elementary</h3>

      <div className="content-slide__slide">
        <Swiper 
          spaceBetween={15}
          slidesPerView={1}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>slide1</SwiperSlide>
          <SwiperSlide>slide2</SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

/* // 로그인 후 슬라이드 배너 */