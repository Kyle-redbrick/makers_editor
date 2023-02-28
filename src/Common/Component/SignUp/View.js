
import React from 'react';
import "./index.scss";

const View = ({
  intl,
  signUpForm,
  onClickDismiss,
  handleSignupSubmit,
  submitErr,
}) => {

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = signUpForm;

  return ( 
    <div className="signup">
      <form autoComplete="off" onSubmit={handleSubmit(handleSignupSubmit)}>
        <div className="signup_title">
          {intl.formatMessage({ id: "ID_SIGNUP_CREATE_TITLE" })}

          <p className="signup_sub_title">
            {intl.formatMessage({ id: "ID_SIGNUP_CREATE_SUB_TITLE" })}
          </p>
        </div>

        {/* ===== 이메일 =================================== */}
        <div className="signup_input_wrapper">
          <div className="signup_input_title">
            {intl.formatMessage({ id: "ID_SIGNUP_EMAIL" })}
          </div>
          <div className="signup__input__right">
            <input
              className={`popup_input`}
              id="email"
              placeholder={intl.formatMessage({
                id: "ID_SIGNIN_EMAIL_PLACEHOLDER",
              })}
              {...register("email")}
              type="text"
              disabled
            />
          </div>
        </div>

        {/* ===== 이름 ===================================== */}
        <div className="signup_input_wrapper">
          <div className="signup_input_title">
            {intl.formatMessage({ id: "ID_SIGNUP_NAME" })}
          </div>
          <div className="signup__input__right">
            <input
              className={`popup_input ${
                errors.name !== "" ? "popup_input-warning" : ""
              }`}
              id="name"
              placeholder={intl.formatMessage({
                id: "ID_SIGNUP_WARNING_NAME_EMPTY",
              })}
              {...register("name")}
              type="text"
              autoComplete="off"
            />
            {errors.name && (
              <div className="popup_warning">{errors.name.message}</div>
            )}
          </div>
        </div>

        {/* ===== 성 =================================== */}
        <div className="signup_input_wrapper">
          <div className="signup_input_title">
            {intl.formatMessage({ id: "ID_SIGNUP_FIRST_NAME" })}
          </div>
          <div className="signup__input__right">
            <input
              className={`popup_input ${
                errors.lastName !== "" ? "popup_input-warning" : ""
              }`}
              id="lastName"
              placeholder={intl.formatMessage({
                id: "ID_SIGNUP_FIRST_NAME_PLACEHOLDER",
              })}
              {...register("lastName")}
              type="text"
              autoComplete="off"
            />
            {errors.lastName && (
              <div className="popup_warning">{errors.lastName.message}</div>
            )}
          </div>
        </div>

        {/* ===== 닉네임 =================================== */}
        <div className="signup_input_wrapper">
          <div className="signup_input_title">
            {intl.formatMessage({ id: "ID_SIGNUP_NICKNAME" })}
          </div>
          <div className="signup__input__right">
            <input
              className={`popup_input ${
                errors.nickName !== "" ? "popup_input-warning" : ""
              }`}
              id="nickName"
              placeholder={intl.formatMessage({
                id: "ID_SIGNUP_NAME_PLACEHOLDER",
              })}
              {...register("nickName")}
              type="text"
              autoComplete="off"
            />
            {errors.nickName && (
              <div className="popup_warning">{errors.nickName.message}</div>
            )}
          </div>
        </div>

        {/* ===== 비밀번호 =================================== */}
        <div className="signup_input_wrapper">
          <div className="signup_input_title">
            {intl.formatMessage({ id: "ID_SIGNUP_PW" })}
          </div>
          <div className="signup__input__right">
            <input
              className={`popup_input ${
                errors.password !== "" ? "popup_input-warning" : ""
              }`}
              id="password"
              type="password"
              placeholder={intl.formatMessage({ id: "ID_SIGNIN_PW_PLACEHOLDER" })}
              {...register("password")}
              autoComplete="off"
            />
            {errors.password && (
              <div className="popup_warning">{errors.password.message}</div>
            )}
          </div>
        </div>

        {submitErr && <div className="popup_warning">Internal Server Error</div>}

        {/* {submitErr &&
          <p className="popup_exist_email_warning">
            {intl.formatMessage({ id: "ID_SIGN_UP_EXIST_EMAIL_WARNING" })}
          </p>
        } */}

        <div className="popup__btn-box">
          <button
            type="button"
            className="popup_button popup-button--close"
            onClick={onClickDismiss}
          >
            {intl.formatMessage({ id: "ID_COMMENT_CANCEL_BUTTON" })}
          </button>

          <button
            type="submit"
            className="popup_button popup_button-singup popup_button-singup--use-active"
          >
            {intl.formatMessage({ id: "ID_SIGNUP_SIGNUP" })}
          </button>
        </div>
      </form>
    </div>
)}

export default View;