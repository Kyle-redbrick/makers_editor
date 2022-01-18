import React, { Component } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";

class TwoInputPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputWarning1: this.props.inputLimit1 ? undefined : false,
      inputWarning2: this.props.inputLimit2 ? undefined : false,
      warning:
        this.props.inputLimit1 || this.props.inputLimit2 ? undefined : false
    };
    this.oneInputRef = React.createRef();
    this.twoInputRef = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener("keyup", this.onClickEnter);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keyup", this.onClickEnter);
  };

  onClickEnter = e => {
    const { dismiss, buttonAction } = this.props;
    if (e.keyCode === 13) {
      if (
        this.state.inputWarning1 === false &&
        this.state.inputWarning2 === false
      ) {
        if (buttonAction)
          buttonAction(
            this.twoInputRef.current.value,
            this.oneInputRef.current.value
          );
        if (dismiss) dismiss();
      } else {
        this.setState({ warning: true });
      }
    }
  };

  checkInputLength = e => {
    const { inputLimit1, inputLimit2 } = this.props;
    this.setState({ warning: false });
    if (inputLimit1 && e.target.name === "input1") {
      if (e.target.value.length > inputLimit1)
        this.setState({
          inputWarning1: true
        });
      else
        this.setState({
          inputWarning1: false
        });
    }

    if (inputLimit2 && e.target.name === "input2") {
      if (e.target.value.length > inputLimit2)
        this.setState({
          inputWarning2: true
        });
      else
        this.setState({
          inputWarning2: false
        });
    }
  };

  render() {
    const {
      title,
      titleId,
      subtitle,
      subtitleId,
      inputTitle1,
      inputTitle2,
      placeholder,
      buttonName,
      buttonNameId,
      buttonAction,
      intl,
      dismiss,
      inputLimit1,
      inputLimit2
    } = this.props;
    const { inputWarning1, inputWarning2, warning } = this.state;
    return (
      <div className="popup_twoInput">
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
        <div className="input-wrapper">
          <div className="input-title">
            {inputTitle1 ? inputTitle1 : "input1"}
          </div>
          <input
            className="popup_input popup_input-twoInput"
            placeholder={placeholder}
            ref={this.oneInputRef}
            onChange={this.checkInputLength}
            name="input1"
          />
        </div>
        {inputWarning1 && (
          <div className="twoInput_warning">
            {intl.formatMessage({ id: "ID_TWO_INPUT_POPUP_WARNING" }, {inputTitle: inputTitle1, inputLimit: inputLimit1} )}
          </div>
        )}
        <div className="input-wrapper">
          <div className="input-title">
            {inputTitle2 ? inputTitle2 : "input2"}
          </div>
          <input
            className="popup_input popup_input-twoInput"
            placeholder={placeholder}
            ref={this.twoInputRef}
            onChange={this.checkInputLength}
            name="input2"
          />
        </div>
        {inputWarning2 && (
          <div className="twoInput_warning">
            {intl.formatMessage({ id: "ID_TWO_INPUT_POPUP_WARNING" }, {inputTitle: inputTitle2, inputLimit: inputLimit2} )}
          </div>
        )}

        <button
          className="popup_button popup_button-twoInput"
          onClick={() => {
            if (inputWarning1 === false && inputWarning2 === false) {
              if (buttonAction)
                buttonAction(
                  this.twoInputRef.current.value,
                  this.oneInputRef.current.value
                );
              if (dismiss) dismiss();
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
        {warning && (
          <div className="twoInput_warning">
            {intl.formatMessage({ id: "ID_TWO_INPUT_POPUP_WARNING2"})}
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(TwoInputPopUp);
