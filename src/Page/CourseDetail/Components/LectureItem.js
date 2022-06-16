import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import styled from "@emotion/styled";
import * as Popup from "../../../Common/Component/PopUp";

import * as LearnButtons from "../../../Common/Component/Button/Learn";
import IMAGE from "./../Constants/Images";
import { URL } from "../../../Common/Util/Constant";
import GamePopup from "./GamePopup";
import lockImg from "../../../Image/course-content--lock.svg"

const Self = styled.div`
  display: flex;
  border-radius: 16px;
  background-color: #1c1c1c;
  margin-bottom: 20px;

  @media screen and (max-width: 1169px) {
    flex-direction: column;
  }
`;

const LearnAgain = styled(LearnButtons.LearnAgain)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => (props.completed ? "#5b5b5b" : "#ff6f44")};
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #fff;
  font-family: "Noto Sans KR", sans-serif;
  outline: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px) {
    position: absolute;
    width: 48.2%;
    height: 40px;
    bottom: 20px;
  }
`;

const LearnContinue = styled(LearnButtons.LearnContinue)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => (props.completed ? "#5b5b5b" : "#ff6f44")};
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px) {
    position: static;
    width: 48.2%;
    height: 40px;
  }
`;

const LearnNow = styled(LearnButtons.LearnNow)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => (props.completed ? "#5b5b5b" : "#ff6f44")};
  border: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.3px;
  color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px) {
    position: static;
    width: 48.2%;
    height: 40px;
  }
`;

const Command = styled.div`
  font-size: 16px;
  line-height: 1.56;
  color: #fff;
  margin-bottom: 11px;
`;

const Content = styled.div`
  padding: 20px 30px;
  position: relative;
  flex: 1;

  @media screen and (max-width: 1169px) {
    padding: 20px;
  }
`;

const Desc = styled.p`
  font-size: 16px;
  line-height: 1.56;
  letter-spacing: -0.1px;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 25px;

  @media screen and (max-width: 1169px) {
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: normal;
    margin-bottom: 21px;
  }
`;

const Image = styled.div`
  position: relative;
  width: 370px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 16px 0 0 16px;


  ${({unlocked}) => unlocked==false && `
  .project-item__overlay {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 20;
      background: #000000;
      opacity: 0.7;
      border-radius: 16px 0 0 16px;
  }
  `}

  ${({unlocked, symbol}) => unlocked==false && symbol==="BLOCKED" && `
    .project-item__lock {
      position: absolute;
      display: block;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      background: no-repeat center/contain url(${lockImg});
      z-index: 21;
    }
  `}

  @media screen and (max-width: 1169px) {
    width: 100%;
    height: 50vw;
    border-radius: 16px 16px 0 0;
    ${({unlocked}) => unlocked==false && `
      .project-item__overlay {
        border-radius: 16px 16px 0 0;
      }
    `}
    ${({unlocked, symbol}) => unlocked==false && symbol==="BLOCKED" && `
      .project-item__lock {
        width: 125px;
        height: 125px;
      }
    }`
}`;

const Label = styled.span`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
`;

const Level = styled.div`
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
`;

const PlayButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 119px;
  height: 34px;
  border-radius: 10px;
  border: solid 1px #ff6f44;
  white-space: pre-wrap;
  background-color: transparent;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  color: #ff6f44;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", sans-serif;
  outline: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 1169px) {
    position: relative;
    left: 0px;
    bottom: 0;
    top: unset;
    right: unset;
    width: 48.2%;
    height: 40px;
  }
`;

const PlayButtonIcon = styled.img`
  width: 28px;
  margin-right: 3px;
`;

const Progress = styled.div`
  ${(props) =>
    props.value >= 100 &&
    `
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: solid 1px rgba(255, 255, 255, 0.2);
      background-color: #2fc180;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5px;

      div {
        background: no-repeat center/contain url(${IMAGE.ICON_CHECK});
        width: 15px;
        height: 15px;
      }
  `}

  ${(props) =>
    props.value >= 0 &&
    props.value < 100 &&
    `
      width: 120px;
      height: 10px;
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.1);
      margin-right: 10px;

      div {
        width: ${props.value}%;
        height: 10px;
        border-radius: 3px;
        background-color: #2fc180;
      }
  `}
`;

const ProgressBar = styled.div``;

const ProgressText = styled.div`
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.5);
`;

const ProgressWrap = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1169px){
    margin-bottom: 20px;
  }
`;

const Tag = styled.div`
  border-radius: 7px;
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 11px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  padding: 0 5px;
  margin-right: 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  color: #fff;
  margin-bottom: 10px;

  @media screen and (max-width: 1169px) {
    margin-bottom: 6px;
  }
`;

const ButtonWrap = styled.div`
  @media screen and (max-width: 1169px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Layer = styled.div`


`;

const LectureItem = ({ project, ...props }) => {
  
  const handleClickGame = useCallback(
    () => {
      Popup.showPopUp(<GamePopup url={project.resources.gameURL} />, {
        dismissButton: false,
        dismissOverlay: true,
        defaultPadding: false,
        darkmode: true,
        mobileFullscreen: true,
        overflow: true,
      });
    },
    [GamePopup, Popup.showPopUp]
  );

  return (
    <Self {...props}>
      <Image image={URL.S3_DREAMCLASS + project.resources.thumbnailURL} unlocked={project.unlocked} symbol={project.symbol}>
        <div className="project-item__lock" />
        <div className="project-item__overlay" />
      </Image>
      <Content>
        <Level>{project.label}</Level>
        <Title>{project.title}</Title>
        <Desc>{project.intro}</Desc>
        <Tags>
          {project.tag.programmingConcept.split(',').map((tag, index) => <Tag key={index}>{tag}</Tag> )}
        </Tags>
        <Command>
          <Label><FormattedMessage id="ID_COURSE_DETAIL_KEY_COMMAND" /> </Label>
          {project.tag.apiCommand.split(',').map(tag => tag).join(", ")}
        </Command>
        {project.unlocked &&
          <ProgressWrap>
            <Progress value={project.progress.completed/project.progress.net * 100}>
              <ProgressBar />
            </Progress>
            {project.progress.net === project.progress.completed && (
              <ProgressText><FormattedMessage id="ID_LEARN_ALL_STEPS_CLEAR" /></ProgressText>
            )}
            { project.progress.net !== project.progress.completed  && (
              <ProgressText>
                {project.progress.completed}/{project.progress.net} <FormattedMessage id="ID_COURSE_DETAIL_STEP_COMPLETE" />
              </ProgressText>
            )}
          </ProgressWrap>
        }
        <ButtonWrap>
          {project.resources.gameURL && (
            <PlayButton type="button" onClick={handleClickGame}>
              <PlayButtonIcon src={IMAGE.ICON_JOYSTICK} alt="조이스틱 아이콘" />
              <FormattedMessage id="ID_COURSE_DETAIL_PLAY_GAME" />
            </PlayButton>
          )}
          {project.unlocked && <>
          {project.progress.completed === project.progress.net ? (
            <LearnAgain completed id={project.id} videoURL={project.resources.videoURL} isShowVideo={false} />
          ) : (
            project.progress.completed === 0 ? (
              <LearnNow id={project.id} videoURL={project.resources.videoURL} isShowVideo={true} />
            ) : (
              <LearnContinue id={project.id} videoURL={project.resources.videoURL} isShowVideo={false} />
            )
          )}
          </>}
        </ButtonWrap>
      </Content>
    </Self>
  );
};

export default LectureItem;
