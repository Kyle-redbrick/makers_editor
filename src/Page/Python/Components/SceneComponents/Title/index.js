import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

const Title = props => {
  const { /*currentScriptData,*/ handleNextScript, requestFullscreen, goal, intl } = props;

  return (
    <div
      className="pythonTitleWrapper"
      onClick={() => {
        requestFullscreen();
        handleNextScript();
      }}
    >
      <div className="pythonTitle">
        <div className="titleNameBox">
          <div className="titleText">{goal}</div>
        </div>
        <p className="defaultMessage">{intl.formatMessage({ id: "ID_PYTHON_CLICK_VIEW" })}</p>
      </div>
    </div>
  );
};

export default injectIntl(Title);
