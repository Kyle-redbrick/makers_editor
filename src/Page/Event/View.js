import React, { useEffect, useState } from 'react';
import moment from "moment";
import Layout from "../../Common/Component/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import EyesOffIcon from "../../Image/icon-eyes-off.svg";
import EyesOnIcon from "../../Image/icon-eyes-on.svg";
import EditPopup from "./Popup/EditPopup";

import PopUp, { showPopUp } from "../../Common/Component/PopUp";
import * as Request from "../../Common/Util/HTTPRequest";
import sha256 from "../../Common/Util/SHA256";




import "./index.scss";


function View(props) {

  const [selectView, setSelectView] = useState("account")

  const onClickBtn = (id) => {
    switch (id) {
      case "account":
        setSelectView("account")
        break
      case "changePwd":
        setSelectView("changePwd")
        break
    }
  }


  return (
    <Layout>
      {/* <EditPopup /> */}
      <div className="account">
        <h3 className="account__title">
          <FormattedMessage id="ID_ACCOUNT_SETTING_TITLE" />
        </h3>
        <div className="account__tab-box">
          <ul className="account__tab-list">
            <li className="account__tab-item" onClick={() => onClickBtn("account")}>
              {/* TODO 탭 변경 시 클래스 on 추가하여 활성화 */}
              <a className={"account__tab-link" + (selectView == "account" ? " on" : "")}>
                <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_01" />
              </a>
            </li>
            <li className="account__tab-item" onClick={() => onClickBtn("changePwd")}>
              <a className={"account__tab-link" + (selectView == "changePwd" ? " on" : "")}>
                <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02" />
              </a>
            </li>
          </ul>

          <div className="account__content-wrap">
            <form action="">
              {selectView == "account" ? <ChangeName {...props} /> : <ChangePassword {...props} />}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const ChangeName = (props) => {

  const onClickBtn = (id) => {
    showPopUp(
      <EditPopup id={id} {...props} dismiss={PopUp.hidePopUp} />,
      {
        darkmode: true,
        dismissButton: true,
      }
    );
  }

  return (
    <>
      <div className="account__content-item account__content-item--account">
        <span className="account__content-category account__content-category--account">
          <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_01_FULLNAME" />
        </span>
        <input type="text" className="account__content-input" autoComplete="off" placeholder="이름을 입력하세요." value={props.userinfo.name} disabled />
        <button type="button" className="account__edit-btn" onClick={() => onClickBtn("name")}>
          <FormattedMessage id="ID_COMMON_EDIT" />
        </button>
      </div>

      <div className="account__content-item account__content-item--account">
        <span className="account__content-category account__content-category--account">
          <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_01_NICKNAME" />
        </span>
        <input type="text" className="account__content-input" autoComplete="off" placeholder="닉네임을 입력하세요." value={props.userinfo.nickName} disabled />
        <button type="button" className="account__edit-btn" onClick={() => onClickBtn("nickName")}>
          <FormattedMessage id="ID_COMMON_EDIT" />
        </button>
      </div>
    </>
  )
}

const ChangePassword = (props) => {
  const intl = props;
  const [warnText, setWarnText] = useState({ "warnNewPwd": "", "warnCheckPwd": "" });


  const [isShows, setIsShows] = useState([false, false, false])

  let pwd = ""
  let newPwd = ""
  let checkNewPwd = ""

  const onClickBtn = (index) => {
    const newArr = isShows.forEach((item, i) => {
      i === index && (isShows[i] = !item)
    });
    setIsShows(Object.assign(Array.from(isShows), newArr));
  }

  const onChangeValue = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "pwd":
        pwd = value
        break
      case "newPwd":
        newPwd = value
        break
      case "checkNewPwd":
        checkNewPwd = value
        break
    }
  }


  const onClickSubmit = async (id) => {
    let res = undefined;
    let info = "";
    if (newPwd.length > 5 && newPwd === checkNewPwd) {
      const res = await Request.modifyPassword({ "currentPasswd": sha256(pwd), "newPasswd": sha256(newPwd) })
        .then(res => res.json())
        .then(json => {
          if(json.success) {
            info = "success"
          } else {
            info = json.reason;
          }
        });
    } else if (newPwd.length < 5) {
      info = props.intl.formatMessage({id: "ID_ACCOUNT_SETTING_ALERT_NEW_PWD_LENGTH"})
      setWarnText({ "warnNewPwd": info })
    } else if (newPwd !== checkNewPwd) {
      info = props.intl.formatMessage({id: "ID_ACCOUNT_SETTING_ALERT_NEW_PWD_NOT_EQUAL"})
      setWarnText({ "warnCheckPwd": info })
    }

    showPopUp(
      <PopUp.OneButton
        title={info}
        buttonName={props.intl.formatMessage({id: "ID_COMMON_CONFIRM"})}
      />,
      {
        darkmode: true,
        dismissButton: false,
      }
    );
  }

  return (
    <>
      <div className="account__content-list">
        <div className="account__content-item">
          <span className="account__content-category">
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_CURRENT_PWD" />
          </span>
          <div className="account__password-change">
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_ENTER_CURRENT_PWD">
              {placeholder =>
                <input id="pwd" type={isShows[0] ? "text" : "password"}
                  autoComplete="off"
                  className="account__content-input account__content-input--password"
                  placeholder={placeholder}
                  onChange={onChangeValue}
                  maxLength="20"
                />
              }
            </FormattedMessage>
            <button className="account__password-show" type="button" onClick={() => onClickBtn(0)} >
              <img src={isShows[0] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 안보기 아이콘" />
            </button>
            {/* TODO 입력 도움말 */}
            <p className="account__help-text"></p>
          </div>
        </div>
        {/* TODO : 새 비밀번호 input */}
        <div className="account__content-item">
          <span className="account__content-category" >
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_NEW_PWD" />
          </span>
          <div className="account__password-change">
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_ENTER_NEW_PWD">
              {placeholder =>
                <input id="newPwd" type={isShows[1] ? "text" : "password"}
                  autoComplete="off"
                  className="account__content-input account__content-input--password"
                  placeholder={placeholder}
                  onChange={onChangeValue}
                  maxLength="20"
                />
              }
            </FormattedMessage>
            <button className="account__password-show" type="button" onClick={() => onClickBtn(1)}>
              <img src={isShows[1] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 보기 아이콘" />
            </button>

            {/* TODO 입력 도움말 */}
            <p className="account__help-text">{warnText.warnNewPwd}</p>
          </div>
        </div>
        {/* TODO : 새 비밀번호 확인 input */}
        <div className="account__content-item">
          <span className="account__content-category">
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_NEW_PWD_CHECK" />
          </span>
          <div className="account__password-change">
            <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02_ENTER_NEW_PWD">
              {placeholder =>
                <input id="checkNewPwd" type={isShows[2] ? "text" : "password"}
                  autoComplete="off"
                  className="account__content-input account__content-input--password"
                  placeholder={placeholder}
                  onChange={onChangeValue}
                  maxLength="20"
                />
              }
            </FormattedMessage>
            <button className="account__password-show" type="button" onClick={() => onClickBtn(2)} >
              <img src={isShows[2] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 보기 아이콘" />
            </button>

            {/* TODO 입력 도움말 */}
            <p className="account__help-text">{warnText.warnCheckPwd}</p>
          </div>
        </div>
        {/* // TODO 비밀번호 변경 UI */}

      </div>
      <div className="account__password-changed-btn-box">
        {/* TODO : 활성화 시 클래스 active 추가 */}
        <button type="button" className="account__password-changed-btn active" onClick={onClickSubmit}>
          <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_02" />
        </button>
      </div>
    </>
  )
}


export default injectIntl(View);