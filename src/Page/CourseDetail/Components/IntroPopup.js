import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import IMAGE from "./../Constants/Images";
// import { Bar } from "recharts";

const Self = styled.div`
  position: relative;
  width: 570px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  border-radius: 16px;
`;

const Content = styled.div`
  padding: 30px 20px 40px;
  text-align: center;
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
`

const LearnVideoWrap = styled.div`
  height: 321px;
  position: relative;
  overflow: hidden;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`

const Video = styled.video`
  min-width: 100%;
  height: 321px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  outline: none;
`

const VideoSource = styled.source``

const PlayButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: 64px;
  height: 64px;
  background-image: url(${IMAGE.ICON_PLAY});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  top: 50%;
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;

  ${(props) => props.playing && `
    display: none;
  `} 
`

const IntroPopup = ({ redirectURL ,id, url, type }) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    playVideo();

    return () => {
      setPlaying(false);
    }
  }, []);

  const goToLearn = useCallback(
    () => {
      Popup.hidePopUp();
      window.open(redirectURL, "_blank");
    },
    [Popup.hidePopUp]
  );

  const playVideo = useCallback(() => {
    videoRef.current.play();
    setPlaying(true);
  }, [videoRef]);

  // const endVideo = useCallback(
  //   () => {
  //     Popup.hidePopUp();
  //     //window.open(url, "_blank");
  //     window.open(redirectURL, "_blank");
  //   },
  //   [Popup.hidePopUp]
  // );

  
  const videoSrc = (type) => {
    if (type === "oobc") return "/oobc_intro.mp4";
    if (type === "javascript") return "/js_intro.mp4";
    if (type === "python") return "/python_intro.mp4";
    if (type === "learning_oobc_c1") return "/oobc_outro.mp4"; 
    if (type === "learning_js_c1") return "/js_outro.mp4"; 
    if (type === "learning_python_c1") return "/python_outro.mp4"; 
    return "";
  }

  const buttonText = () => {
    if (type === "learning_oobc_c1") return <FormattedMessage id="ID_COURSE_DETAIL_SKIP_LEAVE_BTN" />
    if (type === "learning_js_c1") return <FormattedMessage id="ID_COURSE_DETAIL_SKIP_LEAVE_BTN" />
    if (type === "learning_python_c1") return <FormattedMessage id="ID_COURSE_DETAIL_SKIP_LEAVE_BTN" />
    return <FormattedMessage id="ID_COURSE_DETAIL_SKIP_BTN" />
  }

  return (
    <Self>
      <LearnVideoWrap>
        <Video controls={true} ref={videoRef} >
          <VideoSource src={url} />
        </Video>
        <PlayButton playing={playing} onClick={playVideo} />
      </LearnVideoWrap>
      <Content>
          <Button type="button" onClick={goToLearn}>{buttonText()}</Button>
      </Content>
    </Self>
  );
};

export default IntroPopup;
