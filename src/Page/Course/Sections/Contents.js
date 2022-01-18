import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import Slider from "react-slick";

import TitleLabel from "../Components/TitleLabel";
import Title from "../Components/Title";
import Container from "../Components/Container";
import ContentItem from "../Components/ContentItem";

const Self = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  min-height: 510px;
  @media screen and (max-width: 1169px) {
    min-height: unset;
  }
`;

const ContentsWarp = styled.div`
  margin: 30px -15px 0;

  @media screen and (max-width: 1169px) {
    margin-top: 20px;

    .slick-slider {
      margin-left: calc((154 / 360) * 100vw * -1);
    }
  }
`;

const Contents = ({ children, items, ...props }) => {
  const sliderSettings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: items.length > 4 ? true : false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1169,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          dots: false,
          infinite: true,
          autoplay: true,
          centerMode: true,
          variableWidth: true, // mobile slide 최소 너비 설정
          adaptiveHeight: true // 높이 값에 여백 생김 제거
        }
      }
    ]
  };

  return (
    <Self {...props}>
      <Container>
        <TitleLabel><FormattedMessage id="ID_DREAM_CONTENT_TITLE"/></TitleLabel>
        <Title><FormattedMessage id="ID_DREAM_CONTENT_SUBTITLE"/></Title>
        <ContentsWarp>
          <Slider className="slick-contents" {...sliderSettings}>
            {items.map((item) => (
              <ContentItem key={item.id} item={item} style={{ width: "calc((154 / 360) * 100vw)" }}/>
            ))}
          </Slider>
        </ContentsWarp>
      </Container>
    </Self>
  );
};

export default Contents;
