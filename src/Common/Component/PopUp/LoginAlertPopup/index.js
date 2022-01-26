import React, { Component } from "react";
import "./index.scss";
import styled from "@emotion/styled";

// const CancelButton = styled.button`
//   width: 370px;
//   height: 50px;
//   border-radius: 10px;
//   background-color: #1c1c1c;
//   border: none;
//   font-size: 20px;
//   font-weight: bold;
//   line-height: 1.2;
//   letter-spacing: 0.38px;
//   cursor: pointer;
//   color: #ef7851;

//   &:focus {
//     outline: none;
//   }
// `

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
        {/* <CancelButton onClick={() => dismiss()}>취소</CancelButton> */}
      </div>
    </div>
  );
}

export default LoginAlertPopup;