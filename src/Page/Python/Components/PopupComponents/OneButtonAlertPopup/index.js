import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

const PythonOneButtonAlert = props => {
  const {
    dismiss,
    textMessage
  } = props;

  return (
    <section className="pythonOnebuttonAlert">
      <p className="text">{textMessage}</p>
      <div className="btnWrapper">
        <button className="confirmBtn" onClick={() => dismiss()}>
          {props.intl.formatMessage({ id: "ID_PYTHON_CONFIRM_BTN" })}
        </button>
      </div>
    </section>
  );
};

export default injectIntl(PythonOneButtonAlert);
