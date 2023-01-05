import React, { useRef, useState } from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import { FormattedMessage,injectIntl } from "react-intl";
import SwiperCore, { Pagination } from "swiper/core";
import ImgVertical1 from "../../../Image/img-vertical-1.PNG";
import ImgVertical2 from "../../../Image/img-vertical-2.PNG";
import ImgVertical3 from "../../../Image/img-vertical-3.PNG";
import ImgVerticalJa1 from "../../../Image/ImgVerticalJa1.png";
import ImgVerticalJa2 from "../../../Image/ImgVerticalJa2.png"; 
import ImgVerticalJa3 from "../../../Image/ImgVerticalJa3.png";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.min.css";

import "./index.scss";

function ThirdSection (props) {
  SwiperCore.use([Pagination]);

  const lang = localStorage.getItem("lang"); 
  const array = [`<p class='third-section__slide-bullet'>${props.intl.formatMessage({id: "ID_INTRO_THIRD_SECTION_BUTTON_TEXT_1"})}</p>`, `<p className='third-section__slide-bullet'>${props.intl.formatMessage({id: "ID_INTRO_THIRD_SECTION_BUTTON_TEXT_2"})}</p>`, `<p className='third-section__slide-bullet'>${props.intl.formatMessage({id: "ID_INTRO_THIRD_SECTION_BUTTON_TEXT_3"})}</p>`]; 

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
            <img src={lang === "en" ? ImgVertical1 : ImgVerticalJa1 } alt="Learn through 36 Mission" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={lang === "en" ? ImgVertical2 : ImgVerticalJa2} alt="Build your own games" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={lang === "en" ? ImgVertical3 : ImgVerticalJa3} alt="Share with your classmates" />
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  )
}

export default injectIntl(ThirdSection) ;