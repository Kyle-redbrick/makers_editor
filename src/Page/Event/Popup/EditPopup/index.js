import React, { useState } from 'react';
import CloseIcon from "../../../../Image/icon-close.svg"
import "./index.scss";
import * as request from "../../../../Common/Util/HTTPRequest";


const names = {"section": "name" ,"newValue": "asdfsadf"}

function EditPopup (props) {
  return (
    <div>
        {props.id == "name" ? <EditName {...props} /> : <EditNickname {...props}  /> }
    </div>
  )
}

const EditName = () => {
  const [name, setName] = useState("");

  const onClickSubmit =  async () => {
    //const nameData = await request.modifyName({...names})
  }
  const onChangeValue = (e) => {
    const { id, value } = e.target;
    names.newValue = value
  }

  return (
    <div className="edit-popup__inner">
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          이름 수정
        </h3>
      </div>

        <div className="edit-popup__body">
          <div className="edit-popup__content">
            <div className="edit-popup__list">
              <span className="edit-popup__category">이름</span>
              <div className="edit-popup__right">
                <input id="name" type="text" placeholder="이름을 입력하세요." className="edit-popup__input" onChange={onChangeValue}/>
                <p className="edit-popup__input-help">닉네임을 올바르게 입력해주세요.</p>
              </div>
            </div>
            <div className="edit-popup__list">
              <span className="edit-popup__category">성</span>
              <div className="edit-popup__right">
                <input id="nickName" type="text" placeholder="성을 입력하세요." className="edit-popup__input"  onChange={onChangeValue}/>
                <p className="edit-popup__input-help">닉네임을 올바르게 입력해주세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="edit-popup__footer">
          <button className="edit-popup__submit-btn" type="submit" onClick={()=>onClickSubmit}>적용</button>
        </div>
    </div>
  )
}

const EditNickname = () => {
  const [nickName, setNickName] = useState("");


  const onClickSubmit =  async () => {

    //const nickNameData = await request.modifyName({...names})

  }
  const onChangeValue = (e) => {
    const { id, value } = e.target;
    names.newValue = value
  }

  return (
    <div className="edit-popup__inner">
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          닉네임 수정
        </h3>
      </div>

        <div className="edit-popup__body">
          <div className="edit-popup__content">
            <div className="edit-popup__list">
              <span className="edit-popup__category">닉네임</span>
              <div className="edit-popup__right">
                <input type="text" placeholder="닉네임을 입력하세요." className="edit-popup__input" />
                <p className="edit-popup__input-help">닉네임을 올바르게 입력해주세요.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="edit-popup__footer">
          <button className="edit-popup__submit-btn" type="submit" onClick={onClickSubmit}>적용</button>
        </div>
    </div>
  )
}

export default EditPopup;

