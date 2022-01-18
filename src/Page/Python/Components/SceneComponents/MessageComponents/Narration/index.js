import React from "react";
import PopUp, { showPopUp } from "../../../../../../Common/Component/PopUp";
import "./index.scss";

import arrowImage from "../../../../../../Image/newPython/btn-script-arrow@2x.png";

const onClickNextArea = (targetNoti, handleNextScript, handleClueBtn) => {
  if (targetNoti === "editor" || targetNoti === "dogam") return;
  if (targetNoti === "clue")
    return showPopUp(
      <PopUp.PythonClue
        onClickFunction={handleNextScript}
        handleClueBtn={handleClueBtn}
      />,
      {
        defaultPadding: false,
        pythonPopup: true
      }
    );
  handleNextScript();
};

const Narration = props => {
  const {
    isDisplayOn,
    handleNextScript,
    currentScriptData,
    contentBoxFontSize,
    handleClueBtn,
    conditionCheck
  } = props;

  const targetNoti = conditionCheck;

  return (
    <div
      className={`pythonNarration ${isDisplayOn ? "show" : ""} ${
        targetNoti && targetNoti !== "clue" ? "cursorDefault" : ""
      }`}
      onClick={() =>
        onClickNextArea(targetNoti, handleNextScript, handleClueBtn)
      }
    >
      <div
        className="textArea"
        onClick={() => {}}
        style={{ fontSize: contentBoxFontSize + "px" }}
      >
        <p>{currentScriptData.text}</p>
        <img
          className="arrowImage"
          src={arrowImage}
          alt=""
          style={{
            width: `${contentBoxFontSize + 8}px`,
            height: `${contentBoxFontSize + 8}px`
          }}
        />
      </div>
    </div>
  );
};

export default Narration;
