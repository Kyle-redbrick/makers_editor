import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

class OneInputPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWarning: this.props.inputLimit ? undefined : false,
      warning: this.props.inputLimit ? undefined : false
    };
    this.inputRef = React.createRef();
  }
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
      if (this.state.inputWarning === false) {
        if (buttonAction) buttonAction(this.inputRef.current.value);
        if (dismiss) dismiss();
      } else {
        this.setState({ warning: true });
      }
    }
  };

  checkInputLength = e => {
    const { inputLimit } = this.props;
    this.setState({ warning: false });
    if (inputLimit) {
      if (e.target.value.length > inputLimit)
        this.setState({
          inputWarning: true
        });
      else this.setState({ inputWarning: false });
    }
  };

  render() {
    const {
      image,
      title,
      titleId,
      subtitle,
      subtitleId,
      defaultInput,
      placeholder,
      buttonName,
      buttonNameId,
      buttonAction,
      intl,
      dismiss,
      inputLimit
    } = this.props;
    const { inputWarning, warning } = this.state;
    return (
      <div className="popup_oneinput">
        {image && <img className="oneInputIcon" src={image} alt=""/>}
        <div className="popup_header">
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
        <input
          className="popup_input popup_input-oneinput"
          defaultValue={defaultInput}
          placeholder={placeholder}
          ref={this.inputRef}
          onChange={this.checkInputLength}
        />
        {inputWarning && (
          <div className="input_warning">
            {intl.formatMessage({ id: "ID_ONE_INPUT_POPUP_WARNING" }, { inputLimit: inputLimit })}
          </div>
        )}
        <button
          className="popup_button popup_button-oneinput"
          onClick={() => {
            if (inputWarning === false) {
              if (dismiss) dismiss();
              if (buttonAction) buttonAction(this.inputRef.current.value);
            } else {
              this.setState({ warning: true });
            }
          }}
        >
          {buttonName ||
            (buttonNameId
              ? intl.formatMessage({ id: buttonNameId })
              : "confirm")}
        </button>
        <button 
          className="popup_dismiss_button"
          onClick={() => {
            if (dismiss) dismiss();
            }
          }>
          {intl.formatMessage({ id: "ID_ONE_INPUT_POPUP_CANCLE_BTN"})}
        </button>
        {warning && (
          <div className="input_warning">
            {intl.formatMessage({ id: "ID_ONE_INPUT_POPUP_WARNING2"})}
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(OneInputPopUp);
