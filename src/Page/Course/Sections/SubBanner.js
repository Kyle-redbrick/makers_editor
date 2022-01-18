import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Container from "../Components/Container";
// import IMAGE from "../Constants/Images";

const Self = styled.div`
  width: 100%;
  min-height: 174px;

  @media screen and (max-width: 1169px) {
    width: 88.33vw;
    height: 30.55vw;
    max-height: 110px;
    min-height: unset;
    margin: 0 auto;
  }
`;

// const Arrow = styled.div`
//   background: no-repeat center/contain url(${IMAGE.ARROW_LINK});
//   width: 38px;
//   height: 38px;
//   position: absolute;
//   right: 20px;
//   top: 50%;
//   margin-top: -19px;

//   @media screen and (max-width: 1169px) {
//     display: none;
//   }
// `;

const Desc = styled.div`
  margin-top: 20px;
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  line-height: 22px;
  letter-spacing: normal;

  @media screen and (max-width: 1169px) {
    display: none;
  }
`;

const BannerLink = styled(Link)`
  text-decoration: none;
`;

const Image = styled.div`
  width: 100%;
  height: 170px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background-image: url(${(props) => props.pcImgURL});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 29px;
  padding-left: 30px;
  cursor: pointer;
  position: relative;

  @media screen and (max-width: 1169px) {
    background-position: right;
    height: 30.55vw;
    max-height: 110px;
    padding-top: 15px;
    padding-left: 15px;
  }

  @media screen and (max-width: 768px) {
    background-image: url(${(props) => props.mobileImgURL});
  }
`;

const Label = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0.8px;
  @media screen and (max-width: 1169px) {
    font-size: 14px;
    letter-spacing: 0.5px;
  }
`;

const Title = styled.div`
  margin-top: 10px;
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  line-height: 40px;
  letter-spacing: normal;

  @media screen and (max-width: 1169px) {
    margin-top: 5px;
    font-size: 22px;
    line-height: 1.36;
    white-space: pre-wrap;
    word-break: keep-all;
  }
`;

const SubBanner = ({ items, ...props }) => {
  return (
    <Self {...props}>
      <Container>
        {items.map((item, index) => (
          <BannerLink to={item.link} key={index}>
            <Image pcImgURL={item.background} mobileImgURL={item.mobileBackground} key={index}>
              <Label>{item.label}</Label>
              <Title>{item.title}</Title>
              <Desc>{item.introduction}</Desc>
            </Image>
          </BannerLink>
        ))}
      </Container>
    </Self>
  );
};

export default SubBanner;
