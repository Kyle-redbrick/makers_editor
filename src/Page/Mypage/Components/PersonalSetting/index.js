import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import SquareCheckbox from "../../../../Common/Component/Checkbox/SquareCheckbox";

function index(props) {
  const {
    intl,
    profile,
    handleSettingInputChange,
    onClickSubmitSetting,
    onClickSignOut,
    // currentPw,
    newPw,
    reNewPw,
    warnPW,
    warnPWRe,
    handleCheck,
    isMarketingAgreement
  } = props;

  const pageData = [
    {
      title: intl.formatMessage({ id : "ID_PERSORAL_SETTING_MY_ACCOUNT" }),
      type: "account",
      content: profile.email
    },
    {
      title: intl.formatMessage({ id : "ID_PERSORAL_SETTING_PHONE" }),
      type: "phone",
      content: profile.phone
    },
    // {
    //   title: "현재 비밀번호",
    //   content: profile.email,
    //   type: "currentPw",
    //   value: currentPw,
    //   placeHolder: "현재 비밀번호"
    // },
    {
      title: intl.formatMessage({ id : "ID_PERSORAL_SETTING_NEW_PASSWORD" }),
      content: profile.email,
      type: "newPw",
      value: newPw,
      placeHolder: intl.formatMessage({ id : "ID_PERSORAL_SETTING_NEW_PASSWORD" }),
    },
    {
      title: intl.formatMessage({ id : "ID_PERSORAL_SETTING_NEW_PASSWORD2" }),
      content: profile.email,
      type: "reNewPw",
      reNewPw: reNewPw,
      placeHolder: intl.formatMessage({ id : "ID_PERSORAL_SETTING_NEW_PASSWORD2" }),
    }
  ];

  return (
    <div className="PersonalSetting">
      <div className="PersonalSetting_CenterWrap">
        {pageData.map((data, index) => {
          return (
            <div key={index} className="PersonalSetting_Wrap">
              <div
                className="PersonalSetting_Wrap-title"
                style={index < 2 ? null : { opacity: 1 }}
              >
                {intl.formatMessage({
                  id: `ID_MYPAGE_PERSONAL_${data.type.toUpperCase()}`
                })}
              </div>
              {index < 2 ? (
                <div className="PersonalSetting_Wrap-content">
                  {data.content}
                </div>
              ) : (
                <input
                  id={data.type}
                  style={
                    index === 2 && warnPW
                      ? { borderColor: "#f05c63" }
                      : index === 3 && warnPWRe
                      ? { borderColor: "#f05c63" }
                      : null
                  }
                  className="PersonalSetting_Wrap-input"
                  type="password"
                  readOnly={false}
                  name={data.type}
                  autoComplete="new-password"
                  value={data.value}
                  onChange={handleSettingInputChange}
                  placeholder={intl.formatMessage({
                    id: `ID_MYPAGE_PERSONAL_${data.type.toUpperCase()}`
                  })}
                />
              )}
            </div>
          );
        })}
        <div className="PersonalSetting_CenterWrap_MarketWrap">
          <div className="PersonalSetting_CenterWrap_MarketWrap-title">
            {intl.formatMessage({ id : "ID_PERSORAL_SETTING_MARKETING_CONFIRM" })}
          </div>
          <SquareCheckbox
            checked={isMarketingAgreement}
            handleChange={e => {
              handleCheck(e);
            }}
          />
        </div>
      </div>

      <div className="PersonalSetting_BtnWrap">
        <div className="PersonalSetting-submit" onClick={onClickSubmitSetting}>
          {intl.formatMessage({
            id: `ID_MYPAGE_PERSONAL_SUBMIT`
          })}
        </div>
        <div className="PersonalSetting-out" onClick={onClickSignOut}>
          {intl.formatMessage({
            id: `ID_MYPAGE_PERSONAL_SIGNOUT`
          })}
        </div>
      </div>
    </div>
  );
}

export default injectIntl(index);