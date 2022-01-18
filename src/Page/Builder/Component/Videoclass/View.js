import React from "react";
import ReactToolTip from "react-tooltip";
import { VCTYPE } from "../../../../Common/Util/Constant";
import Ego from "./ego";
// import Navigation from "./navigation";
import "./index.scss";

// import listImg from "../../../../Image/videoclass/btn-list-normal.svg";
import hintImg from "../../../../Image/videoclass/btn-hint-normal.svg";
import answImg from "../../../../Image/videoclass/btn-answer-normal.svg";
import prevImg from "../../../../Image/videoclass/btn-back-normal.svg";
import nextImg from "../../../../Image/videoclass/btn-front-normal.svg";

import videoPauseImg from "../../../../Image/videoclass/video-pause.svg";
import videoPlayImg from "../../../../Image/videoclass/video-play.svg";

import stageImg from "../../../../Image/videoclass/step-current.svg";
import stageBranchImg from "../../../../Image/videoclass/stepIcon-branch.svg";
import stageCodeImg from "../../../../Image/videoclass/stepIcon-code.svg";
import stageQuizImg from "../../../../Image/videoclass/stepIcon-quiz.svg";
import stageSpriteImg from "../../../../Image/videoclass/stepIcon-sprite.svg";
import stageVideoImg from "../../../../Image/videoclass/stepIcon-video.svg";
import closeImg from "../../../../Image/icon-close_list.svg";

// import successImg from "../../../../Image/videoclass/success-step.png";

function isAndroid() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return true;
  }
  return false;
}

export default function(props) {
  const {
    intl,
    fixed,
    fullScreen,
    handleChangeZIndex,
    currentStage,
    isSidebarHidden,
    isVideoPlaying,
    isVideoUIHidden,
    // isSuccessHidden,
    customContent,
    stages,
    currentStageNum,
    isStartStage,
    isEndStage,
    onClickNext,
    onClickPrev,
    // onClickList,
    onClickHint,
    onClickAnsw,
    onClickStage,
    onClickSidebarOverlay,
    setVideoRef,
    // onClickSuccessNext,
    // onClickSuccessMore,
    setEgoRef,
    onClickEgo,
    endStageButtonAction,
    endStageButtonId,
    classTitle,
    maxOcpLevel,
    currentOcpLevel,
    handleOcpLevelChange,
    // isNavOpen,
    // toggleNav,
    isPlaying,
    // handleNavInteraction,
    isOpenWizclassGame,
    closeWizClassGame,
    wizclassGameUrl
  } = props;
  const { formatMessage } = intl;
  ReactToolTip.rebuild();
  let content;
  switch (currentStage.type) {
    case VCTYPE.STEP.VIDEO:
      content = currentStage.videoSrc && (
        <>
          <video
            className="vc_content_video"
            key={currentStage.videoSrc}
            ref={setVideoRef}
            playsInline
            controls
            controlsList="nodownload"
          >
            <source src={currentStage.videoSrc} />
          </video>
          <img
            className={`vc_content_video_playpause ${
              isVideoUIHidden ? "vc_content_video_playpause-hidden" : ""
            }`}
            src={isVideoPlaying ? videoPauseImg : videoPlayImg}
            alt="play"
          />
        </>
      );
      break;
    default:
      content = (currentStage.img || currentStage.imgSrc) && (
        <img
          className="vc_content_image"
          src={currentStage.img || currentStage.imgSrc}
          alt={currentStage.type}
        />
      );
      break;
  }

  return (
    <div
      id="vc"
      className={`vc ${fullScreen ? " vc-fullscreen" : ""} ${isAndroid() &&
        "vc_android"} ${isPlaying && "vc-playing"}`}
      onClick={handleChangeZIndex}
    >
      <ReactToolTip id="vc_tooltip" place="bottom" />
      {/* title */}
      {fixed || (
        <div className="vc_titleLine handle">
          <div className="vc_title">{classTitle}</div>
          <div className="vc_ocprow_wrap">
            {maxOcpLevel &&
              [...Array(10)].map((element, index) => {
                const level = index + 1;
                const active = level <= maxOcpLevel;
                return (
                  <div
                    className={`vc__ocprow__level ${
                      !active ? "vc__ocprow__level-todo" : null
                    } ${
                      currentOcpLevel === index + 1 ? "vc__ocpow-active" : null
                    }`}
                    key={index}
                    onClick={() => {
                      if (active && level !== currentOcpLevel) {
                        handleOcpLevelChange(level);
                      }
                    }}
                  >
                    {level}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {/* container */}
      <div className="vc_container">
        {/* header */}
        <div className="vc_header">
          {/* <HeaderButton
            buttonId="list"
            tip={formatMessage({ id: "ID_VIDEOCLASS_TOOLTIP_LIST" })}
            isActive={true}
            imgSrc={listImg}
            onClick={onClickList}
          /> */}
          {currentStage.hint && (
            <HeaderButton
              buttonId="hint"
              tip={formatMessage({ id: "ID_VIDEOCLASS_TOOLTIP_HINT" })}
              isActive={true}
              imgSrc={hintImg}
              onClick={onClickHint}
            />
          )}
          {currentStage.answer && (
            <HeaderButton
              buttonId="answ"
              tip={formatMessage({ id: "ID_VIDEOCLASS_TOOLTIP_ANSW" })}
              isActive={true}
              imgSrc={answImg}
              onClick={onClickAnsw}
            />
          )}
          {fixed || (
            <>
              <HeaderButton
                buttonId="prev"
                tip={formatMessage({ id: "ID_VIDEOCLASS_TOOLTIP_PREV" })}
                isActive={!isStartStage}
                imgSrc={prevImg}
                onClick={onClickPrev}
              />
              {isEndStage && endStageButtonAction ? (
                <button
                  className="vc_header_button vc_header_button-custom"
                  onClick={endStageButtonAction}
                >
                  {formatMessage({
                    id: endStageButtonId || "ID_VIDEOCLASS_ENDSTEP_DEFAULT"
                  })}
                </button>
              ) : (
                <HeaderButton
                  buttonId="next"
                  tip={formatMessage({ id: "ID_VIDEOCLASS_TOOLTIP_NEXT" })}
                  isActive={!isEndStage}
                  imgSrc={nextImg}
                  onClick={onClickNext}
                />
              )}
            </>
          )}
        </div>
        {/* sidebar */}
        <div
          className={`vc_sidebar ${isSidebarHidden ? "vc_sidebar-hidden" : ""}`}
        >
          <div className="vc_sidebar_overlay" onClick={onClickSidebarOverlay} />
          <div className="vc_sidebar_container">
            <div id="vc_steps" className="vc_steps">
              {stages.map((stage, index) => {
                return (
                  <SidebarStage
                    key={index}
                    index={index}
                    stage={stage}
                    title={
                      stage.title ||
                      formatMessage({ id: "ID_VIDEOCLASS_STEP_" + stage.type })
                    }
                    isCurrent={index === currentStageNum}
                    onClickStage={onClickStage}
                  />
                );
              })}
            </div>
            <div className="vc_steps_bar" />
          </div>
        </div>
        {/* success */}
        {/* <div
          className={`vc_success ${isSuccessHidden ? "vc_success-hidden" : ""}`}
        >
          <div className="vc_success_overlay" />
          <div className="vc_success_container">
            <img src={successImg} alt="success" />
            <div className="vc_success_buttons">
              <div
                className="vc_success_button vc_success_button-more"
                onClick={onClickSuccessMore}
              >
                <span>
                  {formatMessage({ id: "ID_VIDEOCLASS_SUCCESS_MORE" })}
                </span>
              </div>
              <div
                className="vc_success_button vc_success_button-next"
                onClick={onClickSuccessNext}
              >
                <span>
                  {formatMessage({ id: "ID_VIDEOCLASS_SUCCESS_NEXT" })}
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {/* content */}
        <div
          className={`vc_content vc_content-${currentStage.type.toLowerCase()}`}
        >
          {content}
          {customContent}
        </div>
        {/* ego */}
        {currentStage.type !== VCTYPE.STEP.VIDEO && (
          <Ego ref={setEgoRef} onClickEgo={onClickEgo} />
        )}
      </div>
      {/* <Navigation
        isOpen={isNavOpen}
        toggleNav={toggleNav}
        maxOcpLevel={maxOcpLevel}
        currentOcpLevel={currentOcpLevel}
        currentStageNum={currentStageNum}
        stages={stages}
        classTitle={classTitle}
        handleInteraction={handleNavInteraction}
      /> */}
      {isOpenWizclassGame && (
        <div className="wizclass__game">
          <iframe
            src={wizclassGameUrl}
            className="wizclass__game__Iframe"
            title="wizlab"
            scrolling="no"
            frameBorder="0"
          />
          <img
            className="close_btn"
            src={closeImg}
            alt="img"
            onClick={closeWizClassGame}
          />
        </div>
      )}
    </div>
  );
}

const HeaderButton = ({ buttonId, tip, imgSrc, onClick, isActive }) => {
  return (
    <button
      className={`vc_header_button vc_header_button-${buttonId} vc_header_button-${
        isActive ? "active" : "inactive"
      }
      `}
      onClick={() => {
        if (isActive) onClick();
      }}
      data-tip={tip}
      data-for="vc_tooltip"
    >
      <img src={imgSrc} alt={buttonId} />
    </button>
  );
};

const SidebarStage = ({ index, stage, title, isCurrent, onClickStage }) => {
  const { type, isOpen } = stage;
  let icon;
  switch (type) {
    case VCTYPE.STEP.BRANCH:
      icon = stageBranchImg;
      break;
    case VCTYPE.STEP.CODE:
      icon = stageCodeImg;
      break;
    case VCTYPE.STEP.QUIZ:
      icon = stageQuizImg;
      break;
    case VCTYPE.STEP.EDIT_MAP:
      icon = stageSpriteImg;
      break;
    case VCTYPE.STEP.VIDEO:
      icon = stageVideoImg;
      break;

    // wizlab 2
    case VCTYPE.STEP.IMAGE:
      icon = stageSpriteImg;
      break;
    case VCTYPE.STEP.END:
      icon = stageBranchImg;
      break;
    case VCTYPE.STEP.START:
      icon = stageBranchImg;
      break;
    default:
      break;
  }
  return (
    <div className="vc_step_wrapper" key={index}>
      <div
        className={`vc_step_indicator ${
          isCurrent ? "vc_step_indicator-current" : ""
        }`}
      >
        {isCurrent && <img src={stageImg} alt="current" />}
      </div>
      <div
        id={`vc_step-${index}`}
        className={`vc_step ${
          isCurrent ? "vc_step-current" : isOpen ? "vc_step-open" : ""
        }`}
        onClick={() => {
          if (isCurrent || isOpen) onClickStage(index);
        }}
      >
        <div className="vc_step_icon">
          <img src={icon} alt={type} />
        </div>
        <div className="vc_step_title">{title}</div>
      </div>
    </div>
  );
};
