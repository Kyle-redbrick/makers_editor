import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from "swiper/core";
import { URL } from "../../../../../Common/Util/Constant"

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import Thumbnail from "../../../../../Image/course_thumbnail.png";
import "../index.scss";
import { IEView } from "react-device-detect";
import * as LearnButtons from "../../../../../Common/Component/Button/Learn";


function BeforeLogin(props) {
  SwiperCore.use([Pagination]);

  const [swiper, setSwiper] = React.useState(null);

  const nextTo = () => {
    swiper.slideNext();
  };

  const prevTo = () => {
    swiper.slidePrev();
  };

  const linkToLearn = (id) => {
    window.open(`/dreamclass/${id}/37da860b-2eca-4ea6-8c36-d6b5dd700437`);
  }

  return (
    <div className="content-slide">
      <div className="content-slide__slide">
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          pagination={{
            clickable: true,
            type: "fraction"
          }}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          onSlideChange={(e) => { props.setSlideIndex(e.activeIndex) }}
        >
          {
            props.curriculum.map((item, index) =>
              <SwiperSlide key={index}>
                <span className="content-slide__course-number">{item.course.label}</span>
                <h3 className="content-slide__course-title">{item.course.title}</h3>
                <div className="content-slide__thumbnail-wrap">
                  <img alt="강의 썸네일" src={URL.S3_DREAMCLASS + item.course.posterURL} />
                </div>
                <p className="content-slide__explan">
                  {item.course.intro}
                </p>
                {
                  item.course.freeProjectId &&
                  // <button type="button" className="content-slide__experience-btn" onClick={()=>{linkToLearn(item.course.freeProjectId)}}>Experience</button>
                  <LearnButtons.LearnExperience learnWidth={true} id={item.course.freeProjectId} />

                }
              </SwiperSlide>
            )
          }
        </Swiper>
      </div>

      <button type="button" className="swiper-button-next" onClick={nextTo} />
      <button type="button" className="swiper-button-prev" onClick={prevTo} />
    </div>
  )
}

export default BeforeLogin;