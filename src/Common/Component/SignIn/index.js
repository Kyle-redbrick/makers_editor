import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as userInfoActions from "../../Store/Reducer/UserInfo";
import * as request from "../../Util/HTTPRequest";
import sha256 from "../../Util/SHA256";
import { showPopUp } from "../PopUp";
import SignUp from "../SignUp";
import ForgotPw from "../ForgotPw";
import ForgotEmail from "../ForgotEmail";
import logoImg from "../../../Image/wizlab_logo.svg";
import * as TrackingUtil from "../../Util/TrackingUtil";
import IconGoogle from "../../../Image/icon-google.svg";
import { GoogleLogin } from 'react-google-login';

import "./index.scss";
const CLIENT_ID = '451745919454-7ga3u82oe852pukhe4esubr6crb67rmq.apps.googleusercontent.com';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      warning: ""
    };
    if (this.props.isBuilder) {
      require("./index_builder.scss");
    }
  }

  onChangeInput = e => {
    const { id, value } = e.target;
    this.setState({ [id]: value, warning: "" });
  };
  onClickSignIn = () => {
    const { formatMessage } = this.props.intl;
    this.setState({ warning: "" }, () => {
      const { email, password } = this.state;
      const params = { email, password: sha256(password) };

      request
        .login(params)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            TrackingUtil.sendGTMEvent("Login_Success");

            localStorage.setItem("wizToken", json.body.token);
            this.props.updateUserInfo(json.body.user);

            window.location = "/learn";
          } else {
            this.setState({
              warning: formatMessage({ id: "ID_SIGNIN_CHECK_EMAILPW" })
            });
          }
        });
    });
  };
  onClickForgotPw = () => {
    showPopUp(<ForgotPw isBuilder={this.props.isBuilder} />, {
      darkmode: !this.props.isBuilder,
      mobileFullscreen: true
    });
  };
  onClickSignUp = () => {
    showPopUp(<SignUp isBuilder={this.props.isBuilder} />, {
      darkmode: !this.props.isBuilder,
      scrollable: true,
      mobileFullscreen: true
    });
  };
  onClickForgotEmail = () => {
    showPopUp(<ForgotEmail isBuilder={this.props.isBuilder} />, {
      darkmode: !this.props.isBuilder,
      mobileFullscreen: true
    });
  };


  responseGoogle = (response) => {
    // request.loginByGoogle().then((rep)=> rep.json()).
    // then((json)=> console.log(json))
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { email, password, warning } = this.state;
    const {
      onChangeInput,
      onClickSignIn,
      onClickForgotPw,
      onClickSignUp,
      onClickForgotEmail
    } = this;

    return (
      <div className="signin">
        <div className="signin_title">
          {/* <img className="signin_logo" src={logoImg} alt="logo" /> */}
          {formatMessage({ id: "ID_SIGNIN" })}
        </div>
        <div className="signin_input_wrapper">
          <div className="signin_input_title">
            {formatMessage({ id: "ID_SIGNIN_EMAIL" })}
          </div>
          <input
            className={`popup_input ${warning !== "" ? "popup_input-warning" : ""
              }`}
            id="email"
            placeholder={formatMessage({ id: "ID_SIGNIN_EMAIL_PLACEHOLDER" })}
            value={email}
            onChange={onChangeInput}
            onKeyDown={e => {
              if (e.keyCode === 13) onClickSignIn();
            }}
            type="text"
            autoComplete="off"
          />
        </div>
        <div className="signin_input_wrapper">
          <div className="signin_input_title">
            {formatMessage({ id: "ID_SIGNIN_PW" })}
          </div>
          <input
            className={`popup_input ${warning !== "" ? "popup_input-warning" : ""
              }`}
            id="password"
            type="password"
            placeholder={formatMessage({ id: "ID_SIGNIN_PW_PLACEHOLDER" })}
            value={password}
            onChange={onChangeInput}
            onKeyDown={e => {
              if (e.keyCode === 13) onClickSignIn();
            }}
          />
        </div>
        <button className="popup_button" onClick={onClickSignIn}>
          {formatMessage({ id: "ID_SIGNIN_CONFIRM" })}
        </button>
        <div className="siginin__link-box">
          <div className="signin_link" onClick={onClickForgotEmail}>
            {formatMessage({ id: "ID_SIGNIN_FORGOT_EMAIL" })}
          </div>
          <div className="signin_link" onClick={onClickForgotPw}>
            {formatMessage({ id: "ID_SIGNIN_FORGOTPW" })}
          </div>
          {/* <div className="signin_link" onClick={onClickSignUp}>
            {formatMessage({ id: "ID_SIGNIN_SIGNUP" })}
          </div> */}
        </div>
        {/* 
        <button type="button" className="sign-in__width-google-btn">
          <img alt="아이콘 구글" src={IconGoogle} />
          Sign in width Google
        </button> */}

        {/* <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        /> */}
        <div className="popup_warning">{warning}</div>
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(SignIn));
