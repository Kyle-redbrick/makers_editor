import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import LearnNowPopup from "../../CourseDetail/Components/LearnNowPopup";
import IMAGE from "./../Constants/Images";

const Self = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 270px;
  height: 210px;
  cursor: pointer;

  @media screen and (max-width: 1169px) {
    width: 42.7vw;
    height: auto;
  }
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   cursor: pointer;
// `;

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
    width: 41vw;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    width: 42.7vw;
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
    width: 41vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.BADGE_PUZZLE});
  `}
`;

const CategorizedItem = ({ item, ...props }) => {
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
    <Self {...props} onClick={handleClickLearnNow}>
      <TypeBadge type={item.type} />
      <Image image={item.hThumbnailUrl} />
      <Title>{item.title}</Title>
      <Desc>{item.introduction}</Desc>
    </Self>
  );
};

export default CategorizedItem;
