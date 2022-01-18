import React, { useCallback, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";

import IMAGE from "./../Constants/Images";

const Self = styled.div`
  padding-top: 19.5px;
  padding-bottom: 39.5px;
  border-top: solid 1px rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 1169px){
    padding-top: 0;
    padding-bottom: 40px;
    width: calc(100vw - 44px);
    margin: 0 auto;
    border: none;
  }
`;

const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;
  overflow: hidden;
`

const VideoWrap = styled.div`
  height: 433px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1169px){
    width: 100%;
    height: calc((100vw - 44px) * (178 / 316));
  }
`

const Video = styled.video`
  min-width: 100%;
  min-height: 433px;
  height: 100%;
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

const TitleWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;

  ${(props) => props.playing && `
    display: none;
  `}

  @media screen and (max-width: 1169px){
    padding: 15px;
  }
`

const Title = styled.h4`
  font-size: 32px;
  font-weight: bold;
  line-height: 35px;;
  color: #fff;
  margin-bottom: 10px;

  @media screen and (max-width: 1169px) {
    font-size: 20px;
    line-height: 1;
    margin-bottom: 5px;
  }
`

const LectureIntro = styled.div`
  font-size: 22px;
  font-weight: 500;
  line-height: 22px;
  color: #fff;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1169px){
    font-size: 16px;
    line-height: normal;
  }
`

const TypeBadge = styled.div`
  width: 33px;
  height: 33px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  margin-right: 10px;

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
      background-image: url(${IMAGE.BADGE_OOBC});
  `}
`;

const ContentWrap = styled.div`
  padding: 30px 30px 40px;

  @media screen and (max-width: 1169px){
    padding: 20px 15px 15px;
  }
`

const Desc = styled.div`
  font-size: 16px;
  line-height: 25px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;
  white-space: pre-wrap;
  line-height: 1.56;
`

const LectureWrap = styled.div`
  border-top: solid 1px rgba(255, 255, 255, 0.1);
  padding-top: 29px;
  text-align: center;
`

const LectureIcon = styled.div`
  width: 83px;
  height: 83px;
  margin: 0 auto 20px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  ${(props) =>
    props.type === "javascript" &&
    `
      background-image: url(${IMAGE.ICON_JS});
  `}

  ${(props) =>
    props.type === "python" &&
    `
      background-image: url(${IMAGE.ICON_PYTHON});
  `}

  ${(props) =>
    props.type === "oobc" &&
    `
      background-image: url(${IMAGE.ICON_OOBC});
  `}

  @media screen and (max-width: 1169px) {
    width: 60px;
    height: 60px;
    margin: 0 auto 15px;
  }
`

const LectureTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 22px;
  color: #fff;
  margin-bottom: 10px;

  @media screen and (max-width: 1169px){
    font-size: 20px;
    line-height: 1;
  }
`

const LectureDesc = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 30px;

  @media screen and (max-width: 1169px){
    line-height: 1;
    margin-bottom: 20px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  width: 370px;
  height: 56px;
  border-radius: 10px;
  background-color: #ff6f44;
  border: none;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.38px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px){
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: normal;
  }
`

const Course = ({ item, ...props }) => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);

  const playVideo = useCallback(() => {
    videoRef.current.play();
    setPlaying(true);
  }, [videoRef]);


  return (
    <Self {...props}>
      <Card>
        <VideoWrap>
          <Video
            controls={true}
            ref={videoRef}
            poster={item.poster}
            onPlay={()=> setPlaying(true)}
            onPause={()=> setPlaying(false)}
          >
            <VideoSource src={item.video} />
          </Video>
          <PlayButton playing={playing} onClick={playVideo}>
            <PlayButtonIcon />
          </PlayButton>
          <TitleWrap playing={playing}>
            <Title>{item.phrase}</Title>
            <LectureIntro>
              <TypeBadge type={item.type} />
              {item.title}
            </LectureIntro>
          </TitleWrap>
        </VideoWrap>
        <ContentWrap>
          <Title>{item.phrase2}</Title>
          <Desc>{item.introduction}</Desc>
          <LectureWrap>
            <LectureIcon type={item.type} />
            <LectureTitle>{item.title}</LectureTitle>
            <LectureDesc>{item.phrase2}</LectureDesc>
            <StyledLink to={{ pathname: item.startLink }}>
              <Button type="button">
                <FormattedMessage id="ID_DREAM_TUTORIAL_START" />
              </Button>
            </StyledLink>
          </LectureWrap>
        </ContentWrap>
      </Card>
    </Self>
  );
};

export default Course;
