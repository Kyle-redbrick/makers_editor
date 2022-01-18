import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import { playButtonEffect } from "../../../Util/PlaySound";

const PythonAlert = props => {
  const {
    dismiss,
    textMessage,
    confirmBtnText,
    cancleBtnText,
    againAction
  } = props;

  return (
    <section className="pythonAlertPopup">
      <p className="text">{textMessage}</p>
      <div className="btnWrapper">
        <button className="cancleBtn" onClick={() => {playButtonEffect(); dismiss();}}>
          {cancleBtnText ? cancleBtnText : props.intl.formatMessage({ id: "ID_PYTHON_CANCEL_BTN" }) }
        </button>
        <button
          className="confirmBtn"
          onClick={() => {
            playButtonEffect();
            againAction && againAction(0);
            dismiss();
          }}
        >
          {confirmBtnText ? confirmBtnText : props.intl.formatMessage({ id: "ID_PYTHON_CONFIRM_BTN" })}
        </button>
      </div>
    </section>
  );
};

export default injectIntl(PythonAlert);
