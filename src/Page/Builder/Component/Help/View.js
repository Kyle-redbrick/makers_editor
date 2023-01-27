import React, { useEffect } from "react";
import "./index.scss";

import helpMainImg from "../../../../Image/builder/help/help_main.png";
import helpEndImg from "../../../../Image/builder/help/help_end.png";

export default function(props) {
  const {
    animOn,
    currentStepNum,
    totalStepNum,
    currentStep,
    darkmode,
    onClickNext,
    onClickSkip
  } = props;
  const language = localStorage.getItem("lang");

  const getText = (type) => {
    const language = localStorage.getItem("lang"); ;

    if(language === "ko") {
      return currentStep[type]
    } else {
      if(!currentStep[`${type}_localized`]){
        return ""
      } if(currentStep[`${type}_localized`][language] === undefined) {
        return currentStep[type]
      } else {
        return currentStep[`${type}_localized`][language]
      }
    }
  }

  const getSubModalButtonText = (type) => {
    const language = localStorage.getItem("lang"); 
    const subModalButtonText = {
      "next" : {
        "ko" : "다음",
        "ja" : "次へ",
        "zh" : "下一页",
        "en" : "Next"
      },
      "skip" : {
        "ko" : "스킵하기",
        "ja" : "スキップする",
        "zh" : "跳过",
        "en" : "Skip"
      }
    }

    return subModalButtonText[type][language]
  }

  return (
    <div className="Help">
      {currentStep.type === "main" ? (
        <MainModal
          title={getText("title")}
          subtitle={getText("subtitle")}
          activeButtonTitle={getText("activeButtonTitle")}
          inactiveButtonTitle={getText("inactiveButtonTitle")}
          onClickNext={onClickNext}
          onClickSkip={onClickSkip}
          animOn={animOn}
          currentStep={currentStep}
        />
      ) : (
        <SubModal
          title={getText("title")}
          subtitle={getText("subtitle")}
          progress={`${currentStepNum}/${totalStepNum - 2}`}
          activeButtonTitle={getSubModalButtonText("next")}
          inactiveButtonTitle={getSubModalButtonText("skip")}
          onClickNext={onClickNext}
          onClickSkip={onClickSkip}
          modalStyle={currentStep.modalStyle}
          anchorStyle={currentStep.anchorStyle}
          animOn={animOn}
        />
      )}
      {currentStep.imageStyle && (
        <div
          className="help_imgModal"
          style={{
            ...currentStep.imageStyle,
            darkImg_ko: undefined,
            darkImg_ja: undefined,
            darkImg_en: undefined,
            img: undefined
          }}
        >
          <img
            src={
              currentStepNum == 1 ? ( darkmode
                ? (language === "ja" ? 
                    currentStep.imageStyle.darkImg_ja
                  :
                    currentStep.imageStyle.darkImg_en
                )
                : currentStep.imageStyle.img ) 
                : (darkmode ?  currentStep.imageStyle.darkImg  : currentStep.imageStyle.img )
            }
            alt={currentStep.title}
          />
        </div>
      )}
    </div>
  );
}

const MainModal = props => {
  const {
    title,
    subtitle,
    activeButtonTitle,
    inactiveButtonTitle,
    onClickNext,
    onClickSkip,
    animOn,
    currentStep,
  } = props;
  return (
    <div className={`help_mainModal ${animOn ? "help_mainModal-anim" : ""}`}>
      <img className={`help_mainModal_img ${currentStep.display === "end" ? "help_mainModal_img_end" : "" }` } src={currentStep.display === "start" ? helpMainImg : helpEndImg } alt="helpMainImg" />
      <div className="help_mainModal_frame">
        <div className="help_mainModal_content">
          <div className="help_mainModal_title">{title}</div>
          <div className="help_mainModal_subtitle">{subtitle}</div>
          <button
            className="help_button help_button-active"
            onClick={onClickNext}
          >
            {activeButtonTitle}
          </button>
          {inactiveButtonTitle && (
            <button
              className="help_button help_button-inactive"
              onClick={onClickSkip}
            >
              {inactiveButtonTitle}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const SubModal = props => {
  const {
    title,
    subtitle,
    progress,
    activeButtonTitle,
    inactiveButtonTitle,
    onClickNext,
    onClickSkip,
    modalStyle,
    anchorStyle,
    animOn
  } = props;
  return (
    <div
      className={`help_subModal ${animOn ? "help_subModal-anim" : ""}`}
      style={modalStyle}
    >
      <div
        className={`help_subModal_anchor help_subModal_anchor-${
          anchorStyle.type
        }`}
        style={{ ...anchorStyle, type: undefined }}
      />
      <div className="help_subModal_frame">
        <div className="help_subModal_progress">{progress}</div>
        <div className="help_subModal_title">{title}</div>
        <div className="help_subModal_subtitle">{subtitle}</div>
        <button
          className="help_button help_button-inactive"
          onClick={onClickSkip}
        >
          {inactiveButtonTitle}
        </button>
        <button
          className="help_button help_button-active"
          onClick={onClickNext}
        >
          {activeButtonTitle}
        </button>
      </div>
    </div>
  );
};
