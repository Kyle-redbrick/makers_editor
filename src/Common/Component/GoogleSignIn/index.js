import React from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { GOOGLE_SIGNIN_CLIENT_ID } from '../../Util/Constant';
import * as request from "../../Util/HTTPRequest";
import * as userInfoActions from "../../Store/Reducer/UserInfo";
import "./index.scss";
import PopUp, { showPopUp } from '../PopUp';

const GoogleSignIn = (props) => {
  const google = window.google;
  useEffect(() => {
    start();
  }, []);

  const handleCredentialResponse = (response) => {
    const idToken = response.credential;
    handleLoginByGoogle(idToken);
  }

  const handleLoginByGoogle = async (idToken) => {
    const params = {
      "idToken": idToken,
    }

    try {
      const json = await request.loginByGoogle(params);

      if(json.success) {
        localStorage.setItem("wizToken", json.body.token);
        props.updateUserInfo(json.user);
        window.location = "/learn";
      } else {
        showPopUp(
          <PopUp.OneButton
            title={`Astro Coding Go에 \n 등록되지 않은 계정입니다. \n 관리자에게 문의해주세요.`}
            buttonName="확인"
          />,
          {
            darkmode: true,
            dismissButton: false,
            dismissOverlay: true,
          }
        );
      }
    } catch(e) {
      console.error(e);
   }
  }

  const start = () => {
    google.accounts.id.initialize({
      client_id: GOOGLE_SIGNIN_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.querySelector('.signin__google-btn'),
      { theme: 'outline', width: '310px' }
    );
    google.accounts.id.prompt();
  }

  return (
    <button className='signin__google-btn'/>
  )
}

export default connect(
  null,
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(GoogleSignIn);
