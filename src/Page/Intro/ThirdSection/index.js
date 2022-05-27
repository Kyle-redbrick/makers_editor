import React, { useRef, useState } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import { FormattedMessage } from "react-intl";
import SwiperCore, { Pagination } from "swiper/core";
import VerticalImg from "../../../Image/wizlive_banner01.png";
import VerticalImg2 from "../../../Image/wizlive_banner02.png";
import VerticalImg3 from "../../../Image/wizlive_banner03.png";
import 'swiper/swiper.scss'; 
import "swiper/components/pagination/pagination.min.css";

import "./index.scss";

function ThirdSection () { 
  SwiperCore.use([Pagination]);
  
  const array = ["<p class='third-section__slide-bullet'> Learn through 36 Mission</p>", "<p className='third-section__slide-bullet'> Build your own games</p>", "<p className='third-section__slide-bullet'>Share with your classmates</p>"]; 

  return (
    <div className="third-section">
      <div className="third-section__left">
        <h3 className="third-section__title">
          <FormattedMessage id="ID_INTRO_THIRD_SECTION_TITLE" />
        </h3>
        <div className="swiper-pagination--custom"></div>
      </div>
      
      <div className="third-section__vertical-slide-wrap">
        <Swiper 
          direction={"vertical"}
          slidesPerView={1}
          allowTouchMove={false}
          loop={true}
          pagination={{
              el : ".swiper-pagination--custom",
              clickable: true,
              renderBullet: function(index, className) {
                return `<span class="${className}"><span class="third-section__bullet-number">${index + 1}</span>${array[index]}</span>`
              }
            }
          }
          modules={[Pagination]}
          className="third-section__vertical-slide"
          >

          <SwiperSlide>
            {/* TODO 비디오 삽입 영역 */}
            {/* <img src={VerticalImg} alt="" /> */}
          </SwiperSlide>
          <SwiperSlide>
            {/* TODO 비디오 삽입 영역 */}
            {/* <img src={VerticalImg2} alt="" /> */}
          </SwiperSlide>
          <SwiperSlide>
            {/* TODO 비디오 삽입 영역 */}
            {/* <img src={VerticalImg3} alt="" /> */}
          </SwiperSlide>
        </Swiper>
      </div>
      
    </div>
  )
}

export default ThirdSection ;