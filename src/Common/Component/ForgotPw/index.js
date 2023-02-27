import React, { Component } from "react";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import PopUp, { showPopUp } from "../PopUp";
import SignIn from "../SignIn";
import "./index.scss";

class ForgotPw extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", warning_email: "" };
  }

  onChangeInput = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value, warning_email: "" });
  };
  onClickSend = () => {
    const { formatMessage } = this.props.intl;
    const { email } = this.state;
    if (email && this.checkEmailFormat(email)) {
      request
        .sendPasswordMail({ email })
        .then((res) => res.json())
        .then((json) => {
          const { success } = json;
          if (success) {
            showPopUp(
              <PopUp.OneButton
                title={formatMessage({ id: "ID_FORGOTPW_SEND_TITLE" })}
                buttonName={formatMessage({ id: "ID_FORGOTPW_SEND_CONFIRM" })}
                buttonAction={() => {
                  showPopUp(<SignIn isBuilder={this.props.isBuilder} />, {
                    darkmode: !this.props.isBuilder,
                    mobileFullscreen: true,
                  });
                }}
              />,
              { darkmode: !this.props.isBuilder }
            );
          } else {
            this.setState({
              warning_email: formatMessage({ id: "ID_FORGOTPW_WARNING_NOT_EXIST_EMAIL" }),
            });
          }
        });
    } else {
      this.setState({
        warning_email: formatMessage({ id: "ID_FORGOTPW_WARNING_EMAIL_FORMAT" }),
      });
    }
  };

  checkEmailFormat = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { email, warning_email } = this.state;
    const { onChangeInput, onClickSend } = this;

    return (
      <div className="forgotpw">
        <div className="forgotpw_title">{formatMessage({ id: "ID_FORGOTPW" })}</div>
        <div className="forgotpw_desc">{formatMessage({ id: "ID_FORGOTPW_DESC" })}</div>
        <input
          className={`popup_input ${warning_email !== "" ? "popup_input-warning" : ""}`}
          id="email"
          type="email"
          placeholder={formatMessage({ id: "ID_FORGOTPW_PLACEHOLDER" })}
          value={email}
          onChange={onChangeInput}
          onKeyDown={(e) => {
            if (e.keyCode === 13) onClickSend();
          }}
        />
        <div className="popup_warning">{warning_email}</div>
        <button className="popup_button" onClick={onClickSend}>
          {formatMessage({ id: "ID_FORGOTPW_CONFIRM" })}
        </button>
      </div>
    );
  }
}

export default injectIntl(ForgotPw);
