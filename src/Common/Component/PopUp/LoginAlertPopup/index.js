import React, { Component } from "react";
import "./index.scss";
import { FormattedMessage } from "react-intl";

const LoginAlertPopup = ({ message, onSubmit, ...props }) => {
  const { dismiss } = props;
  return (
    <div className="popup-login-alert">
      <div className='popup-login-alert--contents'>
        <div className="popup-login-alert-message">
          <FormattedMessage id="ID_POPUP_LOGIN_ALERT" />
        </div>
        <button className="popup-login-alert-confirm" onClick={async () => {
          dismiss();
        }}>
          <FormattedMessage id="ID_POPUP_LOGIN_ALERT_BUTTON" />
        </button>
      </div>
    </div>
  );
}

export default LoginAlertPopup;