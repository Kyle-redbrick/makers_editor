import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

class TwoButtonPopUp extends Component {
  componentDidMount = () => {
    window.addEventListener("keyup", this.onClickEnter);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keyup", this.onClickEnter);
  };

  onClickEnter = e => {
    const { dismiss, confirmAction } = this.props;
    if (e.keyCode === 13) {
      if (dismiss) dismiss();
      if (confirmAction) confirmAction();
    }
  };

  render() {
    const {
      title,
      titleId,
      titleValue,
      subtitle,
      subtitleId,
      cancelButtonName,
      cancelButtonNameId,
      cancelAction,
      confirmButtonName,
      confirmButtonNameId,
      confirmAction,
      isWarning,
      intl,
      dismiss,
      content
    } = this.props;

    return (
      <div className="popup_twobutton">
        <div className="popup_title">
          {title ||
            (titleId
              ? titleValue
                ? intl.formatMessage({ id: titleId }, titleValue)
                : intl.formatMessage({ id: titleId })
              : "title")}
        </div>
        {(subtitle || subtitleId) && (
          <div className="popup_subtitle">
            {subtitle ||
              (subtitleId
                ? intl.formatMessage({ id: subtitleId })
                : "subtitle")}
          </div>
        )}
        {content && <div className="popup_content">{content}</div>}
        <div className="popup_buttons">
          <button
            className="popup_button popup_button-cancel"
            onClick={() => {
              if (cancelAction) cancelAction();
              if (dismiss) dismiss();
            }}
          >
            {cancelButtonName ||
              (cancelButtonNameId
                ? intl.formatMessage({ id: cancelButtonNameId })
                : "cancel")}
          </button>
          <button
            className={`popup_button ${isWarning && "popup_button-warning"}`}
            onClick={() => {
              if (confirmAction) confirmAction();
              if (dismiss) dismiss();
            }}
          >
            {confirmButtonName ||
              (confirmButtonNameId
                ? intl.formatMessage({ id: confirmButtonNameId })
                : "confirm")}
          </button>
        </div>
      </div>
    );
  }
}

export default injectIntl(TwoButtonPopUp);
