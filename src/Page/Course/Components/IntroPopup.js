import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import IMAGE from "./../Constants/Images";

const BREAK_POINT_PC = 1169;

const Self = styled.div`
  position: relative;
  width: 570px;
  height: 532px;
  box-shadow: 0 20px 50px 0 rgba(0, 0, 0, 0.5);
  background-color: #1c1c1c;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    width: 88.33vw;
    height: auto;
    max-height: 70vh;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
  }
`;

const Section = styled.div``

const Content = styled.div`
  padding: 40px 40px 10px;
  text-align: center;
  position: relative;

  ${(props) => props.last && `
    padding-top: 20px;
  `}

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    box-sizing: border-box;
    padding: 40px 15px 60px;
  }
`

const Count = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 16px;
  line-height: 1.56;
  color: rgba(255, 255, 255, 0.2);

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    top: 20px;
    right: 20px;
    font-size: 12px;
  }
`

const Image = styled.img`
  height: 150px;
  margin-bottom: 20px;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    height: 122px;
    margin-bottom: 15px;
  }
`

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.41;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    font-size: 20px;
    margin-bottom: 10px;
    white-space: normal;
    word-break: keep-all;
  }

  ${(props) => props.last && `
    font-size: 22px;
    margin-bottom: 30px;
    line-height: 1.45;

    @media screen and (max-width: ${BREAK_POINT_PC}px) {
      font-size: 16px;
      margin-top: 52px;
      margin-bottom: 20px;
      white-space: pre-wrap;
    }
  `}
`

const Desc = styled.div`
  font-size: 16px;
  line-height: 1.56;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 40px;
  white-space: pre-wrap;
  height: 50px;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    height: auto;
    line-height: 1.5;
    margin-bottom: 20px;
    white-space: normal;
    word-break: keep-all;
  }
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
  font-family: "Noto Sans KR";
  &:focus {
    outline: none;
  }

  ${({ disabled}) => disabled && `
    background-color: #343434;
    color: rgba(255, 255, 255, 0.3);
  `}

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 500;
  }
`

const PrevButton = styled(Button)`
  background-color: transparent;
  color: #ff6f44;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
  }
`

const ProfileImage = styled.div`
  margin: 10px auto 20px;
  background-image: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    margin: 0 auto 10px;
    width: 72px;
    height: 72px;
  }
`

const UploadButton = styled.label`
  width: 138px;
  height: 34px;
  border-radius: 8px;
  background-color: #343434;
  font-size: 14px;
  line-height: 1.57;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    margin-bottom: 20px;
  }
`

const UploadInput = styled.input`
  display: none;
`

const ProfileImageRow = styled.div`
  width: 268px;
  display: grid;
  margin: 0 auto 29px;
  grid-column-gap: 12px;
  grid-row-gap: 15px;
  grid-template-columns: repeat(5, 1fr);

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    margin-bottom: 16px;
  }
`

const ProfileImageItem = styled.div`
  width: 44px;
  height: 44px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${(props) => props.image});
  border-radius: 50%;
  cursor: pointer;
  ${(props) => props.selected &&  `border: 2px solid #fff`}
`

const ProfileText = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 1.45;
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  height: 32px;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const SectionVideoWrap = styled.div`
  height: 320px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    height: calc(88.33vw * (179 / 318));
  }
`

const Video = styled.video`
  min-width: 100%;
  height: 320px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  @media screen and (max-width: ${BREAK_POINT_PC}px) {
    width: 100%;
    height: calc(88.33vw * (179 / 318));
  }
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

const IntroPopup = ({ history }) => {
  const [page, setPage] = useState(1);
  const [profileThumbnail, setProfileThumbnail] = useState(IMAGE.CHARACTER_1);

  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleProgress);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleProgress);
      } 
    }
  }, [videoRef.current]);

  const handleProgress = useCallback(() => {
    if (videoRef.current.duration - videoRef.current.currentTime < 5) {
      setPlayed(true);
    }
  }, []);

  const goToTutorial = useCallback(
    () => {
      localStorage.setItem("didIntroPopup", true);

      Popup.hidePopUp();

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeEventListener('timeupdate', handleProgress);
        setPlaying(false);
      }    

      history.push(`/tutorial`);
    },
    [Popup.hidePopUp, videoRef]
  );

  const handleChangeProfile = useCallback((e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setProfileThumbnail(reader.result)
    };
    reader.readAsDataURL(file);
  }, []);

  const handleChangeProfileDefault = useCallback((_profile) => {
    setProfileThumbnail(_profile);
  }, []);

  const handleChangePage = useCallback((_page) => {
    setPage(_page);

    if (_page === 5) {
      setTimeout(() => {
        playVideo();
      }, 300);
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeEventListener('timeupdate', handleProgress);
      setPlaying(false);
    }    
  }, [videoRef]);

  const playVideo = useCallback(() => {
    videoRef.current.play();
    setPlaying(true);
  }, [videoRef]);

  return (
    <Self>
      {page === 1 && (
        <Section>
          <Content>
            <Count>1/5</Count>
            <Image alt="어서와요, 미래의 개발자님들 이미지" src={IMAGE.INTRO_1} />
            <Title>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_01_TITLE01" /><br />
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_01_TITLE02" />
            </Title>
            <Desc>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_01_DESC" />
            </Desc>
            <Button type="button" onClick={() => handleChangePage(2)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_NEXT" />
            </Button>
          </Content>
        </Section>
      )}
      {page === 2 && (
        <Section>
          <Content>
            <Count>2/5</Count>
            <Image alt="순서는 아무 상관 없어요 이미지" src={IMAGE.INTRO_2} />
            <Title>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_02_TITLE01" /><br />
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_02_TITLE02" />
            </Title>
            <Desc>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_02_DESC" />
            </Desc>
            <Button type="button" onClick={() => handleChangePage(3)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_NEXT" />
            </Button>
            <PrevButton type="button" onClick={() => handleChangePage(1)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_BACK" />
            </PrevButton>
          </Content>
        </Section>
      )}
      {page === 3 && (
        <Section>
          <Content>
            <Count>3/5</Count>
            <Image alt="퀘스트와 오늘의 목표를 클리어하고 친구들과 경쟁하세요! 이미지" src={IMAGE.INTRO_3} />
            <Title>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_03_TITLE01" />
            </Title>
            <Desc>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_03_DESC" />
            </Desc>
            <Button type="button" onClick={() => handleChangePage(4)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_NEXT" />
            </Button>
            <PrevButton type="button" onClick={() => handleChangePage(2)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_BACK" />
            </PrevButton>
          </Content>
        </Section>
      )}
      {page === 4 && (
        <Section>
          <Content>
            <Count>4/5</Count>
            <ProfileImage image={profileThumbnail} />
            <UploadButton>
              <UploadInput 
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={handleChangeProfile}
              />
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_04_TITLE02" />
            </UploadButton>
            <ProfileImageRow>
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_1}
                image={IMAGE.CHARACTER_1} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_1)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_3}
                image={IMAGE.CHARACTER_3} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_3)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_4}
                image={IMAGE.CHARACTER_4} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_4)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_5}
                image={IMAGE.CHARACTER_5} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_5)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_6}
                image={IMAGE.CHARACTER_6} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_6)}
              />
              <ProfileImageItem
                selected={profileThumbnail === IMAGE.CHARACTER_7}
                image={IMAGE.CHARACTER_7} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_7)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_8}
                image={IMAGE.CHARACTER_8} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_8)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_9}
                image={IMAGE.CHARACTER_9} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_9)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_10}
                image={IMAGE.CHARACTER_10} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_10)}
              />
              <ProfileImageItem 
                selected={profileThumbnail === IMAGE.CHARACTER_11}
                image={IMAGE.CHARACTER_11} 
                onClick={() => handleChangeProfileDefault(IMAGE.CHARACTER_11)}
              />
            </ProfileImageRow>
            <ProfileText><FormattedMessage id="ID_COURSE_INTRO_POPUP_04_TITLE01" /></ProfileText>
            <Button type="button" onClick={() => handleChangePage(5)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_NEXT" />
            </Button>
            <PrevButton type="button" onClick={() => handleChangePage(3)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_BACK" />
            </PrevButton>
          </Content>
        </Section>
      )}
      {page === 5 && (
        <Section>
          <SectionVideoWrap>
            <Video controls={true} ref={videoRef}>
              <VideoSource src={"/dream_tutorial.mp4".toDreamclassS3URL()} />
            </Video>
            <PlayButton playing={playing} onClick={playVideo} />
          </SectionVideoWrap>
          <Content last>
            <Title last>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_05_TITLE01" />
            </Title>
            <Button type="button" onClick={goToTutorial} disabled={!played}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_05_DESC" />
            </Button>
            <PrevButton type="button" onClick={() => handleChangePage(4)}>
              <FormattedMessage id="ID_COURSE_INTRO_POPUP_BACK" />
            </PrevButton>
          </Content>
        </Section>
      )}
      
    </Self>
  );
};

export default IntroPopup;
