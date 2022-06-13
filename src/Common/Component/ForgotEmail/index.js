import React, { Component } from "react";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";
import PopUp, { showPopUp } from "../PopUp";
import SignIn from "../SignIn";
import "./index.scss";

class ForgotPw extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className="forgotpw">
        <div className="forgotpw_title">
          {formatMessage({ id: "ID_FIND_EMAIL_TITLE" })}
        </div>
        <div className="forgot-email__desc">
          {formatMessage({ id: "ID_FIND_EMAIL_DESC" })}
        </div>
        <ul className="forgot-email__required-info">
          <li>{formatMessage({ id: "ID_FIND_EMAIL_LIST_1" })}</li>
          <li>{formatMessage({ id: "ID_FIND_EMAIL_LIST_2" })}</li>
          <li>{formatMessage({ id: "ID_FIND_EMAIL_LIST_3" })}</li>
        </ul>
        <div className="forgot-email__contact">
          acg@mangosteems.com
        </div>
        <button className="popup_button" onClick={() => this.props.dismiss()}>
          {formatMessage({ id: "ID_COMMON_CONFIRM" })}
        </button>
      </div>
    );
  }
}

export default injectIntl(ForgotPw);
