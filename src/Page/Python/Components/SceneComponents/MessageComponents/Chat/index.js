import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

import arrowImage from "../../../../../../Image/newPython/btn-script-arrow@2x.png";

const characterFaceCssPosition = num => {
  // 참고: 이미지는 0부터 시작, 5는 2번째줄 1번 이미지
  let rowNumber = Math.floor(num / 5);
  let lineNumber = Math.floor(num % 5);
  // console.log(lineNumber + 1, "번째 이미지", rowNumber, "번째 줄");
  return `${lineNumber * 25}% ${rowNumber * 33.3}%`;
};

const onClickNextArea = (targetNoti, handleNextScript) => {
  // if (targetNoti === "editor" || targetNoti === "dogam") return;
  if(!targetNoti) {
    handleNextScript();
  } else {
    console.log("highlight" , targetNoti)
  }
};

const Chat = props => {
  const {
    isDisplayOn,
    currentScriptData,
    handleNextScript,
    contentBoxFontSize,
    isShowFailScript,
    answerFailScript,
    conditionCheck
  } = props;
  const scriptData = isShowFailScript ?  answerFailScript : currentScriptData;
  const targetNoti = conditionCheck;

  return (
    <div
      className={`pythonChat ${isDisplayOn ? "show" : ""} ${
        targetNoti ? "cursorDefault" : ""
      }`}
    >
      {
        scriptData.character !== "me"
        ? (
          <div className="imgArea">
            <div className="characterImgWrapper">
              <div
                className={`characterImg ${
                  scriptData.character === "py" ? "woman" : "man"
                }`}
                style={{ backgroundPosition: characterFaceCssPosition(scriptData.characterEmotion) }}
              />
            </div>
            <p
              className="characterName"
              style={{
                fontSize: contentBoxFontSize
              }}
            >
              <span>{scriptData.character === "py" ? <FormattedMessage id="ID_PYTHON_PY" /> : <FormattedMessage id="ID_PYTHON_YTHON" />}</span>
            </p>
          </div>
        )
        : null
      }
      <div
        className={scriptData.character === "me" ? "textAreaMe" : "textArea"}
        onClick={() => onClickNextArea(targetNoti, handleNextScript)}
        style={{ fontSize: contentBoxFontSize }}
      >
        <div className="scriptText">
          {scriptData.text}
        </div>
        <img
          className={`arrowImage ${targetNoti === "dogam" ? "hide" : ""}`}
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

export default Chat;
