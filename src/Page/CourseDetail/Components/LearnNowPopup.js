import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  position: relative;
  width: 570px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  border-radius: 16px;

  @media screen and (max-width: 1169px) {
    width: 88.33%;
    box-shadow: 0 11px 28px 0 rgba(0, 0, 0, 0.5);
    margin: auto;
  }
`;

const CloseButton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: rgba(237, 237, 237, 0.8);
  position: absolute;
  top: 0;
  right: -44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 1169px) {
    top: 10px;
    right: 10px;
    z-index: 1;
  }
`
const CloseButtonIcon = styled.div`
  width: 22px;
  height: 22px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${IMAGE.ICON_CLOSE});
`

const LearnImage = styled.div`
  height: 320px;
  border-radius: 16px 16px 0 0;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;

  @media screen and (max-width: 1169px) {
    height: 49.44vw;
  }
`

const TypeBadge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 54px;
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
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.BADGE_PUZZLE});
  `}
`;

const Content = styled.div`
  padding: 20px 20px 30px;
  text-align: center;

  @media screen and (max-width: 1169px) {
    padding: 20px 15px 15px;
  }
`

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 10px;
`

const Info = styled.div`
  font-size: 16px;
  line-height: 1.25;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;

  @media screen and (max-width: 1169px) {
    margin-bottom: 15px;
  }
`

const Desc = styled.div`
  font-size: 16px;
  line-height: 1.56;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 20px;
`

const Button = styled.button`
  width: 370px;
  height: 56px;
  border-radius: 10px;
  background-color: #ff6f44;
  border: none;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 0.38px;
  cursor: pointer;
  color: #fff;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 1169px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
  }
`

const LearnNowPopup = ({ item, history }) => {
  const closePopup = useCallback(
    () => {
      Popup.hidePopUp();
    },
    [Popup.hidePopUp]
  );

  const goToCourseDetail = useCallback(
    () => {
      
      history.push(`/course/${item.id}`)
      Popup.hidePopUp();
    },
    [Popup.hidePopUp, history]
  );

  return (
    <Self>
      <CloseButton onClick={closePopup}>
        <CloseButtonIcon />
      </CloseButton>
      <LearnImage image={item.hThumbnailUrl}>
        <TypeBadge  type={item.course.type} />
      </LearnImage>
      <Content>
        <Title>{item.title}</Title>
        <Info>{item.course.title}  |  {item.course.displayType}</Info>
        <Desc>{item.introduce || item.introduction}</Desc>
        <Button type="button" onClick={goToCourseDetail}><FormattedMessage id="ID_COURSE_DETAIL_STUDY" /></Button>
      </Content>
    </Self>
  );
};

export default LearnNowPopup;
