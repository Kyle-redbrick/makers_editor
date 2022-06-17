import React from 'react'
import { useEffect } from 'react';
import { connect } from "react-redux";
import { GOOGLE_SIGNIN_CLIENT_ID } from '../../Util/Constant';
import { loginByGoogle } from '../../Util/HTTPRequest';
import * as userInfoActions from "../../Store/Reducer/UserInfo";
import * as TrackingUtil from "../../Util/TrackingUtil";
import "./index.scss";

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
      const res = await loginByGoogle(params);
      const json = await res.json();
      localStorage.setItem("wizToken", json.token);
      props.updateUserInfo(json.user);
    } catch (e) {
      console.error(e);
    }
      TrackingUtil.sendGTMEvent("Login_Success");
      window.location = "/learn";
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
