import React from "react";
import { injectIntl } from "react-intl";
import ReactHtmlParser from "react-html-parser";
import "./index.scss";

import fileIcon from "../../../../../Image/newPython/ic-file-png@2x.png";
import successText from "../../../../../Image/newPython/sucess-top@2x.png";

const Result = (props) => {
  const {
    currentScriptData,
    onClickProjectReplay,
    onClickNextProjectPlay,
    intl,
  } = props;

  const changePointText = (text, pointText) => {
    if (text.includes(pointText)) {
      let data = text.replaceAll(
        pointText,
        `<span class="pointText">${pointText}</span>`
      );
      return ReactHtmlParser(data);
    } else {
      return text;
    }
  };

  return (
    <div className="pythonResult">
      <p className="successTitle">
        <img src={successText} alt="" />
      </p>
      <div className="resultInfoWrapper">
        <div className="resultTextWrapper">
          <div className="iconWrapper">
            <img src={fileIcon} alt="" />
            <p className="fileNum">x{currentScriptData.list.length}</p>
          </div>
          <ul className="getItemList">
            {currentScriptData.list.map((list, i) => {
              return (
                <li key={list + i}>
                  <span>{changePointText(list.text, list.pointText)}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="buttonWrapper">
          <button className="replayBtn" onClick={onClickProjectReplay}>
            {intl.formatMessage({ id: "ID_PYTHON_RESULT_REPLAY_BTN" })}
          </button>
          {/* <button className="nextQuestBtn" onClick={() => {}}>
            {intl.formatMessage({ id: "ID_PYTHON_RESULT_NEXT_QUEST_BTN" })}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(Result);
