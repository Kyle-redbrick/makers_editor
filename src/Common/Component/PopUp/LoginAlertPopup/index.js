import React, { Component } from "react";
import "./index.scss";

const LoginAlertPopup = ({ message, onSubmit, ...props }) => {
  const { dismiss } = props;
  return (
    <div className="popup-login-alert">
      <div className='popup-login-alert--contents'>
        <div className="popup-login-alert-message">
          You need to sign in to proceed.
        </div>
        <button className="popup-login-alert-confirm" onClick={async () => {
          dismiss();
        }}>Confirm</button>
      </div>
    </div>
  );
}

export default LoginAlertPopup;