import React, { Component } from "react";
import "./index.scss";

class OneButtonPopUp extends Component {
  componentDidMount = () => {
    if (this.props.enterToConfirm) {
      window.addEventListener("keyup", this.onClickEnter);
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener("keyup", this.onClickEnter);
  };

  onClickEnter = e => {
    const { dismiss, buttonAction } = this.props;
    if (e.keyCode === 13) {
      if (dismiss) dismiss();
      if (buttonAction) buttonAction();
    }
  };

  render() {
    const {
      image,
      title,
      titleId,
      subtitle,
      subtitleId,
      buttonName,
      buttonNameId,
      buttonAction,
      intl,
      dismiss,
      buttonColor,
      content
    } = this.props;

    return (
      <div className="popup_onebutton">
        {image && <img src={image} alt=""/>}
        <div className="popup_title">
          {title || (titleId ? intl.formatMessage({ id: titleId }) : "title")}
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
        <button
          style={{ background: `${buttonColor ? buttonColor : ""}` }}
          className="popup_button"
          onClick={() => {
            if (dismiss) dismiss();
            if (buttonAction) buttonAction();
          }}
        >
          {buttonName ||
            (buttonNameId
              ? intl.formatMessage({ id: buttonNameId })
              : "confirm")}
        </button>
      </div>
    );
  }
}

export default OneButtonPopUp;
