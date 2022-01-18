import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import { URL } from "../../../../../Common/Util/Constant";

const PythonClue = props => {
  const { clueMedia, dismiss, onClickFunction, handleClueBtn } = props;

  return (
    <section className="pythonCluePopup">
      <div className="clueContentBox">
        <div className="clueContent">
          {
            clueMedia.includes(".mp4")
            ? (
              <video
              autoPlay
              loop={true}
              width="100%"
              height="100%"
              src={`${URL.S3_DREAMCLASS}/${clueMedia}`}
              >
              </video>
            )
            : (
              <div
              className="imageBg"
              style={{
                background: `url(${URL.S3_DREAMCLASS}/${clueMedia}) no-repeat center/cover`
              }}
              />
            )
          }
        </div>
      </div>
      <button
        className="confirmBtn"
        onClick={() => {
          dismiss();
          if (onClickFunction) onClickFunction();
          if (handleClueBtn) handleClueBtn();
        }}
      >
        {props.intl.formatMessage({ id: "ID_PYTHON_CONFIRM_BTN" })}
      </button>
    </section>
  );
};

export default injectIntl(PythonClue);
