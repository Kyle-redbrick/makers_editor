import React from "react";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation} from "swiper/core";
import ImgHorizontal1 from "../../../Image/img-horizontal-1.png";
import ImgHorizontal2 from "../../../Image/img-horizontal-2.png";
import ImgHorizontal3 from "../../../Image/img-horizontal-3.png";
import ImgHorizontal4 from "../../../Image/img-horizontal-4.png";
import ImgHorizontal5 from "../../../Image/img-horizontal-5.png";
import "swiper/swiper.scss"; 
import "swiper/components/navigation/navigation.min.css";
import "./index.scss";
 
function HorizontalSlide () {
  SwiperCore.use([Navigation]);

  const [swiper, setSwiper] = React.useState(null)

  return (
    <div className="learn-coding">
      <h3 className="learn-coding__title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_TITLE" /></h3>
      <div className="learn-coding__slide-wrap">
        <Swiper 
          centeredSlides={true}
          centeredSlidesBounds={true}
          slidesPerView={1.9}
          spaceBetween={120}
          loop={true}
          freeMode={false}
          onSwiper={(s) => {
            setSwiper(s);
          }}
          className="learn-coding__slide"
        >
          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 1" src={ImgHorizontal1} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_1" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_1" /></p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 2" src={ImgHorizontal2} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_2" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_2" /></p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 3" src={ImgHorizontal3} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_3" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_3" /></p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 4" src={ImgHorizontal4} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_4" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_4" /></p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="learn-coding__item">
              <img alt="슬라이드 아이템 이미지 5" src={ImgHorizontal5} />
              <h3 className="learn-coding__item-title"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_TITLE_5" /></h3>
              <p className="learn-coding__item-content"><FormattedMessage id="ID_ABOUT_HORIZONTAL_SLIDE_ITEM_CHILD_TITLE_5" /></p>
            </div>
          </SwiperSlide>
        </Swiper>

        <button type="button" onClick={() => swiper.slideNext()}  className="swiper-button-next" ></button>
        <button type="button" onClick={() => swiper.slidePrev()} className="swiper-button-prev" ></button>
      </div>
    </div>
  )
}

export default HorizontalSlide ;
