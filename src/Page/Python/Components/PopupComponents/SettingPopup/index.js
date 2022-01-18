import React, { useState } from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import PopUp, { showPopUp } from "../../../../../Common/Component/PopUp";

import closeBtn from "../../../../../Image/newPython/python-popup-close-btn@2x.png";
import bgSoundOnIcon from "../../../../../Image/newPython/setting-ic-sound-on@2x.png";
import bgSoundOffIcon from "../../../../../Image/newPython/setting-ic-sound-off@2x.png";
import effectSoundOnIcon from "../../../../../Image/newPython/setting-icon-bgm-on@2x.png";
import effectSoundOffIcon from "../../../../../Image/newPython/setting-icon-bgm-off@2x.png";
import soundToggleIcon from "../../../../../Image/newPython/btn-sound-toggle@2x.png";

import { playSettingEffect } from "../../../Util/PlaySound"


function PythonSetting(props) {
  const { dismiss, onClickRestartBtn, isPlayBGM, isPlayEffect, onSaveSettings, intl } = props;
  const [isNewPlayBGM, setIsNewPlayBGM] = useState(isPlayBGM);
  const [isNewPlayEffect, setIsNewPlayEffect] = useState(isPlayEffect);

  const handleResetBtn = onClickRestartBtn => {
    showPopUp(
        <PopUp.PythonAlert
          textMessage={intl.formatMessage({ id: "ID_PYTHON_SETTING_RESET_TITLE" })}
          cancleBtnText={intl.formatMessage({ id: "ID_PYTHON_SETTING_RESET_CANCEL_BTN" })}
          confirmBtnText={intl.formatMessage({ id: "ID_PYTHON_SETTING_RESET_CONFIRM_BTN" })}
          againAction={onClickRestartBtn}
        />,
        {
          defaultPadding: false,
          pythonPopup: true,
          dismissButton: false
        }
    );
  };

  return (
    <div className="pythonSettingPopup">
      <div className="popupHeader">
        <p className="title">
          {intl.formatMessage({ id: "ID_PYTHON_SETTING_TITLE" })}
        </p>
        <img
          className="popupCloseBtn"
          onClick={dismiss}
          src={closeBtn}
          alt=""
        />
      </div>

      <div className="popupBody">
        <div className="soundBox">
          <div className="bgSoundLine">
            <img
              className="bgSoundIcon"
              src={true ? bgSoundOnIcon : bgSoundOffIcon}
              alt=""
            />
            <p className="soundType">
              {intl.formatMessage({ id: "ID_PYTHON_SETTING_BACKGROUNT_SOUND" })}
            </p>
            <div 
              className={isNewPlayBGM ? "soundToggleBtnWrapper on" : "soundToggleBtnWrapper"} 
              onClick={()=>{playSettingEffect(); setIsNewPlayBGM(!isNewPlayBGM)}}
            >
              <img src={soundToggleIcon} alt="" />
              <span className="soundState" >{isNewPlayBGM ? "ON" : "OFF"}</span>
            </div>
          </div>
          <div className="effectSoundLine">
            <img
              className="effectSoundIcon"
              src={true ? effectSoundOnIcon : effectSoundOffIcon}
              alt=""
            />
            <p className="soundType">{intl.formatMessage({ id: "ID_PYTHON_SETTING_EFFECT_SOUND" })}</p>
            <div 
              className={isNewPlayEffect ? "soundToggleBtnWrapper on" : "soundToggleBtnWrapper"} 
              onClick={()=>{playSettingEffect(); setIsNewPlayEffect(!isNewPlayEffect)}}
            >
              <img src={soundToggleIcon} alt="" />
              <span className="soundState">{isNewPlayEffect ? "ON" : "OFF" }</span>
            </div>
          </div>
        </div>

        <div className="settingBtnWrapper">
          <button
            className="resetBtn"
            onClick={() => handleResetBtn(onClickRestartBtn)}
          >
            {intl.formatMessage({ id: "ID_PYTHON_SETTING_RESET_BTN" })}
          </button>
          {/* <button className="tutorialBtn">튜토리얼 다시보기</button> */}
        </div>

        <div className="popupBtnWrapper">
          <button className="cancleBtn" onClick={dismiss}>
            {intl.formatMessage({ id: "ID_PYTHON_CANCEL_BTN" })}
          </button>
          <button 
            className="confirmBtn" 
            onClick={()=>{
              onSaveSettings({playBGM:isNewPlayBGM , playEffect:isNewPlayEffect}); dismiss();
            }}
          >
            {intl.formatMessage({ id: "ID_PYTHON_CONFIRM_BTN" })}
          </button>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(PythonSetting);