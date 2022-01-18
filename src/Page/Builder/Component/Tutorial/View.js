import React from "react";
import {
  VideoClassStageType as StageType,
  VideoClassEgoType as EgoType
} from "../../../../Common/Util/Constant";
import "./index.scss";

import hintImg from "../../../../Image/btn-hint-normal.svg";
import answImg from "../../../../Image/btn-answer-normal.svg";
import prevImg from "../../../../Image/btn-back-normal.svg";
import nextImg from "../../../../Image/btn-front-normal.svg";

export default function(props) {
  const {
    stage,
    isStart,
    isEnd,
    isEgoSaying,
    egoMessages,
    level,
    title,
    isFullscreen,
    handleChangeZIndex
  } = props;
  const {
    animationRef,
    setVideoRef,
    onClickPrev,
    onClickOverlay,
    onClickHint,
    onClickAnsw,
    onClickNext,
    onClickEgo,
    onClickEgoBubble,
    onClickChangeLevel
  } = props;

  let content;
  if (stage) {
    switch (stage.type) {
      case StageType.START:
      case StageType.CODE:
      case StageType.PLAY:
      case StageType.TEST:
      case StageType.END:
      case StageType.IMAGE:
        content = (
          <div className="Tutorial_content Tutorial_content-start">
            <img className="Tutorial_background" src={stage.imgSrc} alt="bg" />
          </div>
        );
        break;
      case StageType.VIDEO:
        content = (
          <div className="Tutorial_content Tutorial_content-video">
            <video
              key={stage.videoSrc}
              ref={setVideoRef}
              playsInline
              controls
              controlsList="nodownload"
            >
              <source src={stage.videoSrc} />
            </video>
          </div>
        );
        break;
      default:
        content = `Unhandled Stage Type: ${stage.type}`;
    }
  } else {
    content = <div>empty videoclass stages</div>;
  }

  return (
    <div
      className={`Tutorial ${isFullscreen && "Tutorial_full"}`}
      onMouseDown={() => handleChangeZIndex("tutorial")}
    >
      {/* title */}
      <div className="TutorialTitleLine handle">
        <div className="TutorialTitle">
          1-{level} {title}
        </div>
      </div>

      {/* content */}
      <div ref={animationRef} className="TutorialContent">
        {content}
        <div className="Tutorial_header">
          <div className="Tutorial_header_section Tutorial_header_section-right">
            {stage.hint && (
              <FloaterButton
                className="hint"
                imgSrc={hintImg}
                onClick={onClickHint}
                isActive={true}
              />
            )}
            {stage.answer && (
              <FloaterButton
                className="answ"
                imgSrc={answImg}
                onClick={onClickAnsw}
                isActive={true}
              />
            )}
            {(stage.hint || stage.answer) && (
              <div className="Tutorial_header_divider" />
            )}
            <FloaterButton
              className="prev"
              imgSrc={prevImg}
              onClick={onClickPrev}
              isActive={!isStart}
            />
            {isEnd && level !== 10 ? (
              <button
                className="Tutorial_button Tutorial_button-nextStage Tutorial_button-active"
                onClick={onClickChangeLevel}
              >
                다음 단계로
              </button>
            ) : (
              <FloaterButton
                className="next"
                imgSrc={nextImg}
                onClick={onClickNext}
                isActive={!isEnd}
              />
            )}
          </div>
        </div>
        <div id="Tutorial_sidebar" className="Tutorial_sidebar">
          <div className="Tutorial_sidebar_overlay" onClick={onClickOverlay} />
          <div className="Tutorial_sidebar_container" />
        </div>
        {stage.type !== "VIDEO" && (
          <div className="Tutorial_ego">
            <div
              className={`Tutorial_ego_bubble ${isEgoSaying &&
                `Tutorial_ego_bubble-visible`}`}
              onClick={onClickEgoBubble}
            >
              {/* <div className="Tutorial_ego_bubble_name">에고</div> */}
              <EgoBubbleContent egoMessages={egoMessages} />
            </div>
            <img
              className="Tutorial_ego_image"
              src={
                "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/assets/24a20d5b7568f14c424a3c1704ed3b75.png"
              }
              alt="ego"
              onClick={onClickEgo}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function EgoBubbleContent(props) {
  const { egoMessages } = props;
  return (
    <div className="Tutorial_ego_bubble_contents">
      {egoMessages.length > 0 &&
        egoMessages.map((message, index) => {
          switch (message.type) {
            case EgoType.TEXT:
              return (
                <div key={index} className="Tutorial_ego_bubble_message">
                  {message.data}
                </div>
              );
            case EgoType.IMAGE:
              return (
                <img
                  key={index}
                  className="Tutorial_ego_bubble_image"
                  src={message.data}
                  alt={message.type}
                />
              );
            default:
              return null;
          }
        })}
    </div>
  );
}

function FloaterButton(props) {
  const { className, imgSrc, onClick, isActive } = props;
  return (
    <button
      className={`Tutorial_button Tutorial_button-${className} Tutorial_button-${
        isActive ? "active" : "inactive"
      }`}
      onClick={() => {
        if (isActive) onClick();
      }}
    >
      <img src={imgSrc} alt="title" />
    </button>
  );
}
