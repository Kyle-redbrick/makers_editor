import React from "react";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import ImgHorizontal1 from "../../../Image/img-horizontal-1.png";
import "swiper/swiper.scss"; 
import "swiper/components/navigation/navigation.min.css";
import "./index.scss";

function HorizontalSlide () {
  return (
    <div className="learn-coding">
      <h3 className="learn-coding__title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_TITLE" /></h3>
      <div className="learn-coding__slide-wrap">
        <Swiper navigation={true} 
                modules={[Navigation]} 
                spaceBetween={70}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                className="learn-coding__slide">
          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 1" src={ImgHorizontal1} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_1" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_1" /></p>
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 1</SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default HorizontalSlide ;