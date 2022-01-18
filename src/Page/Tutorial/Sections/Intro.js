import React, { useCallback, useRef, useState} from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "@emotion/styled";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  padding-bottom: 39.5px;

  @media screen and (max-width: 1169px){
    width: calc(100vw - 44px);
    margin: 19px auto 0;
    padding-bottom: 29.5px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.2);
    margin-bottom: 30.5px;
  }
`;

const VideoWrap = styled.div`
  height: 432px;
  position: relative;
  overflow: hidden;
  margin-bottom: 31px;
  border-radius: 16px;

  @media screen and (max-width: 1169px){
    height: calc((100vw - 44px) * (178 / 316));
    margin-bottom: 23px;
  }
`

const Video = styled.video`
  width: 100%;
  min-height: 432px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  outline: none;

  @media screen and (max-width: 1169px){
    min-height: unset;
    max-height: calc((100vw - 44px) * (178 / 316));
  }
`

const VideoSource = styled.source``

const PlayButton = styled.div`
  position: absolute;
  cursor: pointer;
  width: 64px;
  height: 64px;
  top: 50%;
  left: 50%;
  margin-left: -32px;
  margin-top: -32px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.playing && `
    display: none;
  `}

  @media screen and (max-width: 1169px){
    width: 40px;
    height: 40px;
    margin-left: -20px;
    margin-top: -20px;
  }
`

const PlayButtonIcon = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${IMAGE.ICON_PLAY});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 1169px){
    width: 28px;
    height: 28px;
  }
`

const Title = styled.h2`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  color: #fff;
  margin-bottom: 20px;

  @media screen and (max-width: 1169px){
    font-size: 24px;
    margin-bottom: 4px;
  }
`

const Desc = styled.p`
  font-size: 16px;
  line-height: 1.56;
  color: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 1169px){
    font-size: 16px;
    line-height: 1.63;
  }
`

const Intro = (props) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);

  const playVideo = useCallback(() => {
    videoRef.current.play();
    setPlaying(true);
  }, [videoRef]);

  return (
    <Self {...props}>
      <VideoWrap>
        <Video
          controls={true}
          autoPlay={true}
          ref={videoRef}
          onPlay={()=> setPlaying(true)}
          onPause={()=> setPlaying(false)}
        >
          <VideoSource src={"/dream_OT.mp4".toDreamclassS3URL()} />
        </Video>
        <PlayButton playing={playing} onClick={playVideo}>
          <PlayButtonIcon />
        </PlayButton>
      </VideoWrap>
      <Title><FormattedMessage id="ID_TUTORIAL_TITLE" /></Title>
      <Desc><FormattedMessage id="ID_TUTORIAL_DESC01" /><br />
      <FormattedMessage id="ID_TUTORIAL_DESC02" /><br />
      <FormattedMessage id="ID_TUTORIAL_DESC03" /><br />
      <FormattedMessage id="ID_TUTORIAL_DESC04" /></Desc>
    </Self>
  );
};

export default injectIntl(Intro);
