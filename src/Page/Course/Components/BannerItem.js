import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Self = styled.div``;

const BannerLink = styled(Link)`
  text-decoration: none;
`;

const BannerWrap = styled.div`
  padding: 0 15px;  

  @media screen and (max-width:1169px){
    padding: 0 5px;

    .slick-track {
      height: 56.11vw !important;
      max-height: 202px !important;
    }
  }
`;

const Banner = styled.div`
  position: relative;
  background-image: url("${({pcImgURL}) => pcImgURL}");
  background-size: cover;
  height: 330px;
  border-radius: 16px;
  padding: 29px 30px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 267px;
    background-image: linear-gradient(168deg, rgba(0, 0, 0, 0.6) -3%, rgba(0, 0, 0, 0) 48%);
  }

  @media screen and (max-width: 1169px) {
    background-position: right;
    width: 88.33vw;
    height: 56.11vw;
    max-height: 202px;
    padding: 15px;
    border: solid 1px rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &::before {
      width: 88.33vw;
      height: calc(56.11vw * 0.6633);
      background-image: linear-gradient(173deg, rgba(0, 0, 0, 0.6) -13%, rgba(0, 0, 0, 0) 60%);
    }
  }

  @media screen and (max-width: 768px) {
    background-image: url("${({mobileImgURL}) => mobileImgURL}");
  }
`;

const SubTitle = styled.div`
  position: relative;
  text-shadow: 0 2px 5px #000000;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 0.8px;
  color: #bbbbbb;
  margin-bottom: 10px;
  z-index: 1;

  @media screen and (max-width:1169px) {
    font-size: 14px;
  }
`;

const Title = styled.h5`
  position: relative;
  text-shadow: 0 2px 20px #000000;
  font-size: 36px;
  font-weight: bold;
  line-height: 1.11;
  color: #fff;
  margin-bottom: 27px;
  z-index: 1;

  @media screen and (max-width:1169px) {
    font-size: 22px;
    margin-bottom: 5px;
    line-height: 1.36;
  }
`;

const Desc = styled.p`
  position: relative;
  text-shadow: 0 2px 4px #000000;
  font-size: 20px;
  line-height: 1.4;
  color: #fff;
  z-index: 1;

  @media screen and (max-width:1169px) {
    margin-top: 10px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    font-size: 14px;
    line-height: 1.29;
    white-space: pre-wrap;
  }
`;

const BannerItem = ({ item, ...props }) => {
  return (
    <Self {...props}>
      <BannerWrap>
        <BannerLink to={item.link}>
          <Banner pcImgURL={item.background} mobileImgURL={item.mobileBackground}>
            <SubTitle>{item.label}</SubTitle>
            <Title>{item.title}</Title>
            <Desc>{item.introduction}</Desc>
          </Banner>
        </BannerLink>
      </BannerWrap>
    </Self>
  );
};

export default BannerItem;
