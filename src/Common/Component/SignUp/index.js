import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import Markdown from "react-markdown";

import { loadReCaptcha } from "react-recaptcha-google";
import { ReCaptcha } from "react-recaptcha-google";

import sha256 from "../../Util/SHA256";
import * as request from "../../../Common/Util/HTTPRequest";

import * as TrackingUtil from "../../Util/TrackingUtil";
import { DEFAULT_PROFILE_IMAGES } from "../../Util/Constant";
import * as userInfoActions from "../../Store/Reducer/UserInfo";
import PopUp, { showPopUp } from "../PopUp";
import SignIn from "../SignIn";
import "./index.scss";

import terms from "./Agreements/terms";
import terms_jp from "./Agreements/terms-jp";
import terms_en from "./Agreements/terms-en";
import privacy from "./Agreements/privacy";
import privacy_jp from "./Agreements/privacy-jp";
import privacy_en from "./Agreements/privacy-en";
import advertisement from "./Agreements/advertisement";
import advertisement_jp from "./Agreements/advertisement-jp";
import advertisement_en from "./Agreements/advertisement-en";
import arrowImg from "../../../Image/signup_arrow.svg";
import PhoneDropDown from "../QRPopup/PhoneDropDown";


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email:"",
      name:"",
      fristName:"",
      nickName:"",
      password:"",

      warning_email: "",
      warning_name: "",
      warning_first: "",
      warning_nickName: "",
      warning_password: ""
    };
  }

  componentDidMount = () => {
    this.setState({email:this.props.userEmail})
  };

  checkEmailFormat = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.state.email);
  };
    checkNameFormat = () => {
    return this.state.name.length >= 2;
  };
  checkFirstNameFormat = () => {
    return this.state.name.length >= 2;
  };
  checkNickNameFormat = () => {
    return this.state.name.length >= 2;
  };
  checkPasswordFormat = () => {
    return this.state.password.length >= 6;
  };

  onChangeInput = e => {
    const { formatMessage } = this.props.intl;
    const { id, value } = e.target;
    console.log(id)
    this.setState({ [id]: value }, () => {
      console.log(id)
      switch (id) {
        case "email":
          if (this.checkEmailFormat() || value === "") {
            this.setState({ warning_email: "" ,email: value});
          } else {
            this.setState({
              warning_email: formatMessage({
                id: "ID_SIGNUP_WARNING_EMAIL_FORMAT"
              })
            });
          }
          break;
        case "name":
          if (this.checkNameFormat() || value === "") {
            this.setState({ warning_name: "" ,name: value});
          } else {
            this.setState({
              warning_name: formatMessage({
                id: "ID_SIGNUP_WARNING_NAME_FORMAT"
              })
            });
          }
          break;
        case "fristName":
          if (this.checkNameFormat() || value === "") {
            this.setState({ warning_fristName: "" ,fristName: value});
          } else {
            this.setState({
              warning_fristName: formatMessage({
                id: "ID_SIGNUP_WARNING_NAME_FORMAT"
              })
            });
          }
          break;
        case "nickName":
          if (this.checkNickNameFormat() || value === "") {
            this.setState({ warning_nickName: "" ,nickName: value});
          } else {
            this.setState({
              warning_nickName: formatMessage({
                id: "ID_SIGNUP_WARNING_NAME_FORMAT"
              })
            });
          }
          break;
        case "password":
          if (this.checkPasswordFormat()) {
            this.setState({ warning_password: "" ,password: value});
          } else {
            this.setState({
              warning_password: formatMessage({
                id: "ID_SIGNUP_WARNING_PW_FORMAT"
              })
            });
          }
          break;
        default:
          break;
      }
    });
  };

  // onClickSignUp = e => {
  //   e.preventDefault();
  //   const { formatMessage } = this.props.intl;
  //   const {
  //     email,
  //     password,
  //     password_re,
  //     name,
  //     countryCode,
  //     phone,
  //     smsSent,
  //     smsConfirmed,
  //     agreed_terms,
  //     agreed_privacy,
  //     agreed_advertisement,
  //     recaptchaToken
  //   } = this.state;
  //   if (email === "") {
  //     this.setState({
  //       warning_email: formatMessage({ id: "ID_SIGNUP_WARNING_EMAIL_EMPTY" })
  //     });
  //     return;
  //   }
  //   if (password === "") {
  //     this.setState({
  //       warning_password: formatMessage({ id: "ID_SIGNUP_WARNING_PW_EMPTY" })
  //     });
  //     return;
  //   }
  //   if (password_re === "") {
  //     this.setState({
  //       warning_password: formatMessage({
  //         id: "ID_SIGNUP_WARNING_PW_RE_EMPTY"
  //       })
  //     });
  //     return;
  //   }
  //   if (name === "") {
  //     this.setState({
  //       warning_name: formatMessage({ id: "ID_SIGNUP_WARNING_NAME_EMPTY" })
  //     });
  //     return;
  //   }
  //   if (!smsSent) {
  //     this.setState({
  //       warning_phone: formatMessage({ id: "ID_SIGNUP_WARNING_PHONE_EMPTY" })
  //     });
  //     return;
  //   }
  //   if (!smsConfirmed) {
  //     this.setState({
  //       warning_phone: formatMessage({ id: "ID_SIGNUP_WARNING_SMSCODE_EMPTY" })
  //     });
  //     return;
  //   }
  //   if (!agreed_terms || !agreed_privacy) {
  //     this.setState({
  //       warning_agreement: formatMessage({ id: "ID_SIGNUP_WARNING_AGREEMENT" })
  //     });
  //     return;
  //   }
  //   if (!recaptchaToken) {
  //     this.setState({
  //       warning_recaptchaToken: true
  //     });
  //     return;
  //   }

  //   if (
  //     this.checkEmailFormat() &&
  //     this.checkPasswordFormat() &&
  //     this.checkPasswordIdentical() &&
  //     this.checkNameFormat() &&
  //     this.checkPhoneFormat() &&
  //     this.checkSmsCodeFormat()
  //   ) {
  //     let params = {
  //       email,
  //       password: sha256(password),
  //       phone,
  //       name,
  //       countryCode,
  //       icon:
  //         DEFAULT_PROFILE_IMAGES[
  //         Math.floor(
  //           Math.random() * Math.floor(DEFAULT_PROFILE_IMAGES.length)
  //         )
  //         ],
  //       isMarketingAgreement: agreed_advertisement,
  //       recaptchaToken
  //     };
  //     if (this.state.recommendCodeConfirmed) {
  //       params.recommendCode = this.state.recommendCode;
  //     }
  //     request
  //       .signup(params)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.status === 409) {
  //           this.setState({
  //             warning_email: formatMessage({
  //               id: "ID_SIGNUP_WARNING_EMAIL_USED"
  //             })
  //           });
  //         } else if (json.status === 401) {
  //           this.setState({
  //             warning_recaptchaToken: true
  //           });
  //         } else if (json.status === 406) {
  //           this.setState({
  //             warning_name: formatMessage({
  //               id: "ID_MYPAGE_NAME_USERNAME_OFFICIAL_WARNING"
  //             })
  //           });
  //         } else if (json.user) {
  //           // TrackingUtil.sendGAEvent(
  //           //   { category: "Signup", action: "Signup_Success" },
  //           //   email
  //           // );
  //           // TrackingUtil.kakaoPixelEvent("signup");
  //           TrackingUtil.kakaoPixelPageView("completeRegistration");
  //           TrackingUtil.sendGTMEvent("Signup_Success");

  //           /*
  //           author : john@wizscool.io
  //           date : 2020.07.01
  //           */
  //           /* test Case1 */
  //           // let bizSpring = document.createElement("script");
  //           // bizSpring._TRK_PI = "RGR";
  //           // bizSpring._TRK_SX = "";
  //           // bizSpring._TRK_AG = "";

  //           /* test Case2 */
  //           // window.setBizSpring();

  //           request
  //             .login({ email, password: sha256(password) })
  //             .then(res => res.json())
  //             .then(json => {
  //               // TrackingUtil.sendGAEvent(
  //               //   { category: "Login", action: "Login_Success" },
  //               //   email
  //               // );
  //               TrackingUtil.sendGTMEvent("Login_Success");
  //               localStorage.setItem("wizToken", json.token);
  //               this.props.updateUserInfo(json.user);
  //             });

  //           showPopUp(
  //             <PopUp.OneButton
  //               title={formatMessage({ id: "ID_SIGNUP_SIGNED_TITLE" })}
  //               buttonName={formatMessage({ id: "ID_SIGNUP_SIGNED_CONFIRM" })}
  //             />,
  //             { darkmode: !this.props.isBuilder }
  //           );
  //         }
  //       });
  //   }
  // };


  onClickSignUp = e => {

    const params = {
      email:this.state.email,
      name:this.state.name,
      fristName:this.state.fristName,
      nickName:this.state.nickName,
      password: sha256(this.state.password),
    }

    console.log(params)

    request.inviteSignup({...params},{"authorityKey":this.props.activateToken}).
    then(res => res.json()).
    then(res => {
      if(res.success) {
        request.loginByToken({token:res.body.token})
        .then(res => res.json)
        .then(json => {
          localStorage.setItem("wizToken",  json.token);
          this.props.updateUserInfo(json.user);
        })
      }
    })
  }

  // setRecaptchaRef = recaptcha => {
  //   this.recaptcha = recaptcha;
  // };

  // onLoadRecaptcha = () => {
  //   if (this.recaptcha) {
  //     this.recaptcha.reset();
  //   }
  // };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      email,
      name,
      fristName,
      nickName,
      password,
      
      warning_email,
      warning_name,
      warning_fristName,
      warning_nickName,
      warning_password,

      agreement

    } = this.state;
    const {
      onChangeInput,
      onClickAgree,
      onClickSignUp,
      onClickSignIn
    } = this;

    return agreement ? (
      <div className="agreement">
        <div className="agreement_title">{agreement.title}</div>
        <div className={`agreement_text agreement_text-${agreement.id}`}>
          <Markdown source={agreement.text} />
        </div>
        <button
          className="popup_button"
          onClick={() => {
            onClickAgree(agreement.id);
          }}
        >
          {formatMessage({ id: "ID_SIGNUP_AGREE" })}
        </button>
      </div>
    ) : (
      <div className="signup">
        <form autoComplete="off">
          <div className="signup_title">
            {formatMessage({ id: "ID_SIGNUP_CREATE_TITLE" })}
          </div>

          {/* ===== 이메일 =================================== */}
          <div className="signup_input_wrapper">
            <div className="signup_input_title">
              {formatMessage({ id: "ID_SIGNUP_EMAIL" })}
              <span className="signup_input_title_dot">*</span>
            </div>
            <div className="signup__input__right">
              <input
                className={`popup_input ${warning_email !== "" ? "popup_input-warning" : ""
                  }`}
                id="email"
                placeholder={formatMessage({ id: "ID_SIGNIN_EMAIL_PLACEHOLDER" })}
                value={email}
                onChange={onChangeInput}
                type="text"
                autoComplete="off"
              />
              <div className="popup_warning">{warning_email}</div>
            </div>
          </div>

          {/* ===== 이름 ===================================== */}
          <div className="signup_input_wrapper">
            <div className="signup_input_title">
              {formatMessage({ id: "ID_SIGNUP_NAME" })}
              <span className="signup_input_title_dot">*</span>
            </div>
            <div className="signup__input__right">
              <input
                className={`popup_input ${warning_name !== "" ? "popup_input-warning" : ""
                  }`}
                id="name"
                placeholder={formatMessage({ id: "ID_SIGNUP_WARNING_NAME_EMPTY" })}
                value={name}
                onChange={onChangeInput}
                type="text"
                autoComplete="off"
              />
              <div className="popup_warning">{warning_name}</div>
            </div>
          </div>

          {/* ===== 성 =================================== */}
          <div className="signup_input_wrapper">
            <div className="signup_input_title">
              {formatMessage({ id: "ID_SIGNUP_FIRST_NAME" })}
              <span className="signup_input_title_dot">*</span>
            </div>
            <div className="signup__input__right">
              <input
                className={`popup_input ${warning_fristName !== "" ? "popup_input-warning" : ""
                  }`}
                id="fristName"
                placeholder={formatMessage({ id: "ID_SIGNUP_FIRST_NAME_PLACEHOLDER" })}
                value={fristName}
                onChange={onChangeInput}
                type="text"
                autoComplete="off"
              />
              <div className="popup_warning">{warning_fristName}</div>
            </div>
          </div>

          {/* ===== 닉네임 =================================== */}
          <div className="signup_input_wrapper">
            <div className="signup_input_title">
              닉네임
              {/* {formatMessage({ id: "ID_SIGNUP_NAME" })} */}
              <span className="signup_input_title_dot">*</span>
            </div>
            <div className="signup__input__right">
              <input
                className={`popup_input ${warning_nickName !== "" ? "popup_input-warning" : ""
                  }`}
                id="nickName"
                placeholder={formatMessage({ id: "ID_SIGNUP_NAME_PLACEHOLDER" })}
                value={nickName}
                onChange={onChangeInput}
                type="text"
                autoComplete="off"
              />
              <div className="popup_warning">{warning_nickName}</div>
            </div>
          </div>

          {/* ===== 비밀번호 =================================== */}
          <div className="signup_input_wrapper">
            <div className="signup_input_title">
              {formatMessage({ id: "ID_SIGNUP_PW" })}
              <span className="signup_input_title_dot">*</span>
            </div>
            <div className="signup__input__right">
              <input
                className={`popup_input ${warning_password !== "" ? "popup_input-warning" : ""
                  }`}
                id="password"
                type="password"
                placeholder={formatMessage({ id: "ID_SIGNIN_PW_PLACEHOLDER" })}
                value={password}
                onChange={onChangeInput}
                autoComplete="off"
              />
              <div className="popup_warning">{warning_password}</div>
            </div>
          </div>

          <div className="popup__btn-box">
            {/* TODO 취소 버튼 */}
            <button type="button" className="popup_button popup-button--close">
              {formatMessage({ id: "ID_COMMENT_CANCEL_BUTTON" })}
            </button>

            {/* TODO 가입 버튼 / 조건 충족 시 클래스 active 추가하여 활성화합니다. */}
            <button type="button"
              className="popup_button popup_button-singup popup_button-singup--use-active active"
              onClick={onClickSignUp}
            >
              {formatMessage({ id: "ID_SIGNUP_SIGNUP" })}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(SignUp));
