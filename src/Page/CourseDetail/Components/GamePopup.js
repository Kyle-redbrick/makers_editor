import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  position: relative;
  width: ${props => props.isHidden ? 0 : props.isHorizontal ? (1051 / 1334 * 100) : (334 / 1334 * 100)}vw;
  padding-top: ${props => props.isHorizontal
    ? 720 / 1280 * 100
    : 1280 / 720 * 100
  }%;

  @media screen and (max-width: 1169px) { 
    width: ${props => props.isHidden ? 0 : 100}vw;
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
  right: -47px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => props.isHidden ? 0 : 1};

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

const Content = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-color: #1c1c1c;

  @media screen and (max-width: 1169px) { 
    border-radius: 0;
  }
`

const Iframe = styled.iframe`
  border: none;
`

const GamePopup = ({ url }) => {
  const closePopup = useCallback(
    () => {
      Popup.hidePopUp();
    },
    [Popup.hidePopUp]
  );

  const [screenMode, setScreenMode] = useState(null);

  const onWindowMessage = useCallback(e => {
    if(e.data.type === "screenMode") {
      const { screenMode } = e.data.payload;
      setScreenMode(screenMode);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onWindowMessage);
    return () => {
      window.removeEventListener("message", onWindowMessage);
    }
  }, [onWindowMessage])

  return (
    <Self isHorizontal={screenMode === "HORIZONTAL"} isHidden={!screenMode}>
      <CloseButton onClick={closePopup} isHidden={!screenMode}>
        <CloseButtonIcon />
      </CloseButton>
      <Content>
        <Iframe src={url} width="100%" height="100%" />
      </Content>      
    </Self>
  );
};

export default GamePopup;
