import React, { useCallback } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import styled from "@emotion/styled";
import * as LearnButtons from "../../../Common/Component/Button/Learn";
import * as Popup from "../../../Common/Component/PopUp";

import Button from "./Button";
import { COLOR } from "../Constants";
import { IMAGE } from "../Constants/Images";

import GamePopup from "../../CourseDetail/Components/GamePopup";

import ImgBtnLock from "../../../Image/my-lecture-btn-lock.svg";

const Self = styled.div`
  padding: 18px 16px 14px 18px;
  min-height: 86px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width:100%;

  &:first-of-type {
    border-top: none;
  }

  @media screen and (max-width: 1169px){
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
  }
`;

const LearnAgain = styled(LearnButtons.LearnAgain)`

`;
const LearnContinue = styled(LearnButtons.LearnContinue)`

`;
const LearnNow = styled(LearnButtons.LearnNow)`
  &.lock {
    &::before {
      content: '';
      display:block;
      background-repeat:no-repeat;
      background-size:cover;
      background-position:center;
      background-image:url(${ImgBtnLock});
      position:absolute;
      top:0;
      width:100%;
      height:100%;
      bottom:0;
      z-index:10;
      left:0;
    }
  }
`;

const Level = styled.div`
  font-size: 13px;
  font-weight: bold;
  line-height: 1;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  width: 80px;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  color: #fff;
  margin-bottom: 3px;

  @media screen and (max-width: 1169px){
    margin: 10px 0;
  }
`;

const ProgressWrap = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  ${(props) =>
    props.value >= 100 &&
    `
      width: 20px;
      height: 20px;
      border-radius: 10px;
      border: solid 1px rgba(255, 255, 255, 0.2);
      background-color: ${COLOR.MINT};
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
        background-color: ${COLOR.MINT};
      }
  `}
`;

const ProgressBar = styled.div``;

const ProgressText = styled.div`
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: -0.1px;
  color: rgba(255, 255, 255, 0.5);
`;

const LectureDate = styled.div`
  width: 276px;
  padding-left: 30px;
  font-size: 16px;
  line-height: 1.69;
  color: #fff;
`;

const Label = styled.span`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
`;

const JoystickButton = styled(Button)`
  width: 44px;
  margin-right: 10px;
  background-color: transparent;
  border: solid 1px ${COLOR.ORANGE};

  @media screen and (max-width: 1169px) {
    width: calc(50% - 5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const IconJoystick = styled.img`
  width: 28px;
`;

const JoystickText = styled.span`
  display: none;

  @media screen and (max-width: 1169px){
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
    font-weight: bold;
    color: #ff6f44;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  position:relative;

  @media screen and (max-width: 1169px) {
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const GameBtn = styled.img`
  margin-right: 10px;
`;

const Project = ({ project, ...props }) => {
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

  const { intl } = props;

  const progressText = `${project.progress.completed > project.progress.net
    ? project.progress.net
    : project.progress.completed
    }/${project.progress.net}`

  return (
    <Self {...props}>
      <Level>{project.label}</Level>
      <TitleWrap>
        <Title>{project.title}</Title>
        <ProgressWrap>
          <Progress value={project.progress.completed / project.progress.net * 100}>
            <ProgressBar />
          </Progress>
          {project.progress.net / project.progress.completed <= 1 ? (
            <ProgressText>
              <FormattedMessage id="ID_LMS_QUEST_ALL_CLEAR" />
            </ProgressText>
          ) : (
            <ProgressText>
              {progressText} <FormattedMessage id="ID_LMS_QUEST_CLEAR" />
            </ProgressText>
          )}
        </ProgressWrap>
      </TitleWrap>

      <LectureDate>
        <Label><FormattedMessage id="ID_LMS_QUEST_DATE" /> </Label>
        {project.unlocked
          ? project.lastStudyDate
          : "-"}
        <br />
        <Label><FormattedMessage id="ID_LMS_QUEST_STUDY_TIME" /> </Label>
        {project.unlocked
          ? project.user.studyMinute + intl.formatMessage({ id: "ID_LMS_QUEST_STUDY_TIME_MIN" })
          : "-"}
      </LectureDate>

      <GameBtn src={IMAGE.GAME_BUTTON_IMG}  onClick={handleClickGame}/>


      <ButtonWrap>
        {project.sampleGameUrl && (
          <JoystickButton type="button" onClick={handleClickGame}>
            <IconJoystick alt="조이스틱 아이콘" src={IMAGE.ICON_JOYSTICK} />
            <JoystickText><FormattedMessage id="ID_COURSE_DETAIL_PLAY_GAME" /></JoystickText>
          </JoystickButton>
        )}
        {project.progress.completed >= project.progress.net ? (
          <LearnAgain completed id={project.id} />
        ) : (
          project.progress.completed === 0 ? (
            <LearnNow  id={project.id} />
          ) : (
            <LearnContinue id={project.id} />
          )
        )}
      </ButtonWrap>
    </Self>
  );
};

export default injectIntl(Project);
