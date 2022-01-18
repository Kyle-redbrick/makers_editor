import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import IMAGE from "./../Constants/Images";

const Self = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 270px;
  height: 210px;

  @media screen and (max-width: 1169px){
    width: 42.77vw;
    height: auto;
    border-radius: 16px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Desc = styled.p`
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  font-weight: 500;
  font-stretch: normal;
  line-height: 13px;
  letter-spacing: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  @media screen and (max-width: 1169px) {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Image = styled.div`
  width: 100%;
  height: 152px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 1169px) {
    height: 23.88vw;
  }
`;

const Title = styled.div`
  margin-top: 20px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;

  @media screen and (max-width: 1169px) {
    margin-top: 15px;
    line-height: 1.38;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TypeBadge = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 53px;
  height: 53px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  ${(props) =>
    props.type === "javascript" &&
    `
      background-image: url(${IMAGE.BADGE_JS});
  `}

  ${(props) =>
    props.type === "python" &&
    `
      background-image: url(${IMAGE.BADGE_PYTHON});
  `}

  ${(props) =>
    props.type === "puzzle" &&
    `
      background-image: url(${IMAGE.BADGE_PUZZLE});
  `}
`;

const CategorizedItem = ({ item, ...props }) => {
  return (
    <StyledLink to={`/course/${item.id}`}>
      <Self {...props}>
        <TypeBadge type={item.type} />
        <Image image={item.hThumbnailUrl} />
        <Title>{item.title}</Title>
        <Desc>{item.desc}</Desc>
      </Self>
    </StyledLink>
  );
};

export default CategorizedItem;
