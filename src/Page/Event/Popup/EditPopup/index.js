import React, { useState, useEffect } from 'react';
import CloseIcon from "../../../../Image/icon-close.svg"
import "./index.scss";
import * as request from "../../../../Common/Util/HTTPRequest";
import { FormattedMessage, injectIntl } from "react-intl";

function EditPopup(props) {

  return (
    <div>
      {props.id == "name" ? <EditName {...props} /> : <EditNickname {...props} />}
    </div>
  )
}

const EditName = (props) => {
  const [warnText, setWarnText] = useState({ "warnName": "", "warnRes": "" });
  let name = ""
  let firstName = ""
  let nameData = undefined

  const onClickSubmit = async () => {

    if (name.length > 0 && name.length < 31) {
      nameData = await request.modifyName({ "section": "name", "familyname": firstName, "givenname": name })
      console.log(nameData)
      if (nameData.success) {
        props.updateUserInfo({ "fullname": { "family": firstName, "given": name }, "name": nameData.body.newValue });
        props.dismiss()
      } else {
        setWarnText({ "warnName": "name.length > 0 && name.length < 31" })
      }
    } else {
      if (nameData) {
        setWarnText({ "warnRes": nameData.reason })
      }
    }
  }
  const onChangeValue = (e) => {
    const { id, value } = e.target;
    console.log(id, value)
    switch (id) {
      case "name":
        name = value
        break
      case "firstName":
        firstName = value
        break
    }
  }

  return (
    <div className="edit-popup__inner">
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_TITLE" />
        </h3>
      </div>

      <div className="edit-popup__body">
        <div className="edit-popup__content">
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_GIVEN_NAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_ENTER_GIVEN_NAME">
                {placeholder =>
                  <input id="name" type="text" placeholder={placeholder} className="edit-popup__input" onChange={onChangeValue} />
                }
              </FormattedMessage>
              <p className="edit-popup__input-help">{warnText.warnName}</p>
            </div>
          </div>
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_FAMILY_NAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_ENTER_FAMILY_NAME">
                {placeholder =>
                  <input id="firstName" type="text" placeholder={placeholder} className="edit-popup__input" onChange={onChangeValue} />
                }
              </FormattedMessage>
            </div>
          </div>
        </div>
      </div>

      <p className="edit-popup__input-help">{warnText.warnFristName}</p>
      <div className="edit-popup__footer">
        <button className="edit-popup__submit-btn" type="submit" onClick={onClickSubmit}>
          <FormattedMessage id="ID_COMMON_APPLY" />
        </button>
      </div>
    </div>
  )
}

const EditNickname = (props) => {

  const [warnText, setWarnText] = useState({ "warnName": "", "warnRes": "" });
  let nickName = ""
  let nickNameData = undefined

  const onClickSubmit = async () => {

    if (nickName.length > 0 && nickName.length < 31) {

      nickNameData = await request.modifyName({ "section": "nickname", "nickname": nickName, })
      console.log(nickNameData)
      if (nickNameData.success) {
        props.updateUserInfo({ nickName: nickName });
        setWarnText({ "warnName": "", "warnRes": "" })
        props.dismiss()
      } else {
        setWarnText({ "warnRes": "err" })
      }
    } else {
      if (nickNameData) {
        setWarnText({ "warnRes": nickNameData.reason })
      }
    }

  }
  const onChangeValue = (e) => {
    const { value } = e.target;
    nickName = value
    console.log(nickName.length, nickName)
  }

  return (
    <div className="edit-popup__inner">
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          <FormattedMessage id="ID_ACCOUNT_EDIT_NICKNAME_POPUP_TITLE" />
        </h3>
      </div>

      <div className="edit-popup__body">
        <div className="edit-popup__content">
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_01_NICKNAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NICKNAME_POPUP_ENTER_NICKNAME">
                {placeholder =>
                  <input type="text" placeholder={placeholder} className="edit-popup__input" onChange={onChangeValue} />
                }
              </FormattedMessage>
              <p className="edit-popup__input-help">{warnText.warnName}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="edit-popup__input-help">{warnText.warnRes}</p>

      <div className="edit-popup__footer">
        <button className="edit-popup__submit-btn" type="submit" onClick={onClickSubmit}>
          <FormattedMessage id="ID_COMMON_APPLY" />
        </button>
      </div>
    </div>
  )
}

export default injectIntl(EditPopup);

