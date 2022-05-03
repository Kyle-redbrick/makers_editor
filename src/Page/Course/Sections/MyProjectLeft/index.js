import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "./index.scss";

import Thumbnail from "../../../../Image/course_thumbnail.png";

function MyProjectLeft () {
  return (
    <div className="left-slide">
      { false ? <BeforeLogin /> : <AfterLogin /> }
    </div>
  )
}

export default MyProjectLeft ;

/* TODO 로그인 전 슬라이드 배너 */
const BeforeLogin = () => {
  SwiperCore.use([Pagination]);

  const [swiper, setSwiper] = React.useState(null);

  const nextTo = () => {
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
            pagination={{ 
              clickable: true, 
              type : "fraction"
            }}
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
    </>
  )
}
/* // 로그인 전 슬라이드 배너 */

/* TODO 로그인 후 슬라이드 배너 */
const AfterLogin = () => {
  SwiperCore.use([Pagination]);

  const [swiper, setSwiper] = React.useState(null);

  const nextTo = () => {
    swiper.slideNext();
  };

  const prevTo = () => {
    swiper.slidePrev();
  };
  return (
   <>
    <div className="left-slide__title-box">
      <h3 className="page-title--child">OOBC - Elementary</h3>
      <div className="left-slide__child-title-box">
        <span className="left-slide__child-title-left">Learns for students new to coding. Learn to code by creating simple games with block coding.</span>
        <span className="left-slide__child-title-right"><b>3</b> / 15 Missions assigned</span>
      </div>
    </div>
    <div className="content-slide content-slide--user">
      <div className="content-slide__slide content-slide__slide--user">
        <Swiper 
          spaceBetween={15}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            type : "fraction"
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(s) => {
            setSwiper(s);
          }}
        >
          <SwiperSlide>
            <div className="content-slide__thumbnail-wrap content-slide__thumbnail-wrap--user">
              {/* TODO 썸네일 */}
              <img alt="강의 썸네일" src={Thumbnail} />
              <span className="content-slide__course-length">Course 1</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>slide2</SwiperSlide>
        </Swiper>
      </div>

      <button type="button" className="swiper-button-next" onClick={nextTo} />
      <button type="button" className="swiper-button-prev" onClick={prevTo} />
    </div>
   </>
  )
}

/* // 로그인 후 슬라이드 배너 */
