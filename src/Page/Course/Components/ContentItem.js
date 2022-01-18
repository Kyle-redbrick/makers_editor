import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import LearnNowPopup from "../../CourseDetail/Components/LearnNowPopup";
import IMAGE from "./../Constants/Images";

const Self = styled.div`
  &:focus {
    outline: none;
  }
`;

const ContentWrap = styled.div`
  padding: 0 15px;
  position: relative;

  @media screen and (max-width: 1169px) {
    padding: 0 5px;
  }
`;

const Content = styled.div`
  position: relative;
  cursor: pointer;
`;

const Image = styled.div`
  height: 360px;
  margin: 0 0 25px;
  border-radius: 16px;
  border: solid 1px rgba(255, 255, 255, 0.1);
  position: relative;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 1169px) {
    height: 56.94vw;
    margin-bottom: 15px;
  }
`;

const TypeBadge = styled.div`
  width: 53px;
  height: 53px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 0;
  left: 15px;

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

  @media screen and (max-width: 1169px) {
    left: 0;
  }
`;

const Title = styled.div`
  margin-bottom: 5px;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.18;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 1169px) {
    width: 41vw;
    font-size: 16px;
  }
`;

const Desc = styled.p`
  font-size: 20px;
  line-height: 1.1;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 1169px) {
    font-size: 14px;
    line-height: 1.29;
    width: 41vw;
  }
`;

const ContentItem = ({ item, ...props }) => {
  let history = useHistory();

  const handleClickLearnNow = useCallback(
    () => {
      Popup.showPopUp(<LearnNowPopup item={item} history={history} />, {
        dismissButton: false,
        dismissOverlay: true,
        defaultPadding: false,
        darkmode: true,
        mobileFullscreen: true,
        overflow: true,
      });
    },
    [LearnNowPopup, Popup.showPopUp]
  );

  return (
    <Self {...props}>
      <ContentWrap>
        <Content onClick={handleClickLearnNow}>
          <Image image={item.vThumbnailUrl} />
          <TypeBadge type={item.course.type} />
          <Title>{item.title}</Title>
          <Desc>{item.introduce}</Desc>
        </Content>
      </ContentWrap>
    </Self>
  );
};

export default ContentItem;
