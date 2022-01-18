import React, { Component } from "react";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import PopUp, { showPopUp } from "../PopUp";
import SignIn from "../SignIn";
import "./index.scss";

class ForgotPw extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", warning_phone: "" };
  }

  onChangeInput = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value, warning_phone: "" });
  };
  onClickSend = () => {
    const { formatMessage } = this.props.intl;
    const { phone } = this.state;
    if (phone && phone.length > 7) {
      request
        .sendEmailSMS({ phone })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            showPopUp(
              <PopUp.OneButton
                title={formatMessage({ id: "ID_FIND_EMAIL_SENT_TITLE" })}
                buttonName={formatMessage({ id: "ID_FIND_EMAIL_SENT_OK" })}
                buttonAction={() => {
                  showPopUp(<SignIn isBuilder={this.props.isBuilder} />, {
                    darkmode: !this.props.isBuilder,
                    mobileFullscreen: true
                  });
                }}
              />,
              { darkmode: !this.props.isBuilder }
            );
          } else {
            if (json.error === "SMS_LIMIT" || json.error === "IP_LIMIT") {
              showPopUp(
                <PopUp.OneButton
                  title={formatMessage({
                    id: "ID_FIND_EMAIL_SENT_LIMIT_TITLE"
                  })}
                  buttonName={formatMessage({ id: "ID_FIND_EMAIL_SENT_OK" })}
                />,
                { darkmode: !this.props.isBuilder }
              );
            } else {
              showPopUp(
                <PopUp.OneButton
                  title={formatMessage({ id: "ID_FIND_EMAIL_SENT_FAIL_TITLE" })}
                  buttonName={formatMessage({ id: "ID_FIND_EMAIL_SENT_OK" })}
                />,
                { darkmode: !this.props.isBuilder }
              );
            }
          }
        });
    } else {
      this.setState({
        warning_phone: formatMessage({ id: "ID_FIND_EMAIL_WARNING" })
      });
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { phone, warning_phone } = this.state;
    const { onChangeInput, onClickSend } = this;
    return (
      <div className="forgotpw">
        <div className="forgotpw_title">
          {formatMessage({ id: "ID_FIND_EMAIL_TITLE" })}
        </div>
        <div className="forgotpw_desc">
          {formatMessage({ id: "ID_FIND_EMAIL_DESC" })}
        </div>
        <input
          className={`popup_input ${
            warning_phone !== "" ? "popup_input-warning" : ""
          }`}
          id="phone"
          type="phone"
          placeholder={formatMessage({ id: "ID_FIND_EMAIL_PLACEHOLDER" })}
          value={phone}
          onChange={onChangeInput}
          onKeyDown={e => {
            if (e.keyCode === 13) onClickSend();
          }}
        />
        <div className="popup_warning">{warning_phone}</div>
        <button className="popup_button" onClick={onClickSend}>
          {formatMessage({ id: "ID_FORGOTPW_CONFIRM" })}
        </button>
      </div>
    );
  }
}

export default injectIntl(ForgotPw);
