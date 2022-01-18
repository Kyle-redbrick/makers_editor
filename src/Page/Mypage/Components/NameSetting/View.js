import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

export default function View(props) {
  const {
    intl,
    isValidate,
    isDataChanged,
    dismiss,
    name,
    icon,
    statusMessage,
    handleOnChange,
    handleSubmit,
    handleOnFileChange,
    handleOnClickFileUpload,
    fileInputRef
  } = props;

  const canUpdate = isValidate && isDataChanged;

  return (
    <div className="NameSetting">
      <div className="NameSetting_Inner">
        <p className="NameSetting_Title">
          <FormattedMessage id="ID_NAME_SETTING_TITLE" />
        </p>

        {/* 닉네임 */}
        {/* <div className="NameSetting_Wrap">
          <div className="NameSetting_Wrap-title">
            <FormattedMessage id="ID_MYPAGE_SETTING_NICKNAME" />
          </div>
          <input
            className={`NameSetting_Wrap-input name-input ${!isValidate && "name-input-invalid"}`}
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder={intl.formatMessage({id:"ID_SIGNUP_NAME_PLACEHOLDER"})}
          />
        </div> */}

        {/* 한줄 소개글 */}
        <div className="NameSetting_Wrap">
          <div className="NameSetting_Wrap-title">
            <FormattedMessage id="ID_MYPAGE_SETTING_STATUS_MSG" />
          </div>
          <input
            className="NameSetting_Wrap-input name-input"
            type="text"
            name="statusMessage"
            value={statusMessage}
            onChange={handleOnChange}
            placeholder={intl.formatMessage({id:"ID_MYPAGE_USERINFO_STATUSMAG"})}
          />
        </div>

        {/* 프로필 사진 */}
        <div className="NameSetting_Wrap">
          <div className="NameSetting_Wrap-title">
            <FormattedMessage id="ID_MYPAGE_SETTING_STATUS_IMG" />
          </div>
          <div className="NameSetting_Wrap-image">
            <img src={icon} alt="user icon"/>
            <button className="NameSetting_Upload_image_Btn" onClick={handleOnClickFileUpload}>
              <FormattedMessage id="ID_MYPAGE_SETTING_STATUS_IMG_UPLOAD" />
            </button>
            <input
              ref={fileInputRef}
              className="NameSetting_Upload_image_input"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleOnFileChange}
            />
          </div>
        </div>

        {/* btns */}
        <div className="NameSetting-Btn-Wrap">
          <div className="NameSetting-cancel" onClick={dismiss}>
            <FormattedMessage id="ID_MYPAGE_NAME_CANCLE" />
          </div>
          <div className={`NameSetting-submit ${!canUpdate && "NameSetting-submit-disabled"}`} onClick={()=>canUpdate && handleSubmit()}>
            <FormattedMessage id="ID_MYPAGE_NAME_SUBMIT" />
          </div>
        </div>
      </div>
    </div>
  );
};
