import React from "react";
import styled from "@emotion/styled";
import Slider from "react-slick";
import BannerItem from "../Components/BannerItem";

const Self = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 374px;

  @media screen and (max-width: 1169px) {
    min-height: calc(56.11vw + 40px); // image height + slick-dots height
  }
`;

const BannersWarp = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 1169px) {
    margin-top: 10px;
    .slick-track {
      height: 56.11vw !important;
      max-height: 202px !important;
      overflow: hidden;
    }
  }
`;

const Banners = ({ children, items, isMobile, ...props }) => {
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const mobileSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
    variableWidth: true,
  }

  const slideSetting = isMobile ? mobileSliderSettings : sliderSettings;

  return (
    <Self {...props}>
      <BannersWarp>
        <Slider {...slideSetting}>
          {items.map((item, index) => (
            <BannerItem key={index} item={item} />
          ))}
        </Slider>
      </BannersWarp>
    </Self>
  );
};

export default Banners;
