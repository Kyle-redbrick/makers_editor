import React, { useState } from 'react';
import moment from "moment";
import Layout from "../../Common/Component/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import EyesOffIcon from "../../Image/icon-eyes-off.svg";
import EyesOnIcon from "../../Image/icon-eyes-on.svg";
import EditPopup from "./Popup/EditPopup";

import PopUp, { showPopUp } from "../../Common/Component/PopUp";
import Request  from "../../Common/Util/HTTPRequest";



import "./index.scss";

export default function View(props) {

  const [selectView,setSelectView] = useState("account")

  const onClickBtn = (id)=>{
    switch(id) {
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
        <h3 className="account__title">계정 설정</h3>
        <div className="account__tab-box">
          <ul className="account__tab-list">
            <li className="account__tab-item" onClick={()=>onClickBtn("account")}>
              {/* TODO 탭 변경 시 클래스 on 추가하여 활성화 */}
              <a className={"account__tab-link" + (selectView=="account"?" on":"")}>계정 관리</a>
            </li>
            <li className="account__tab-item" onClick={()=>onClickBtn("changePwd")}>
              <a className={"account__tab-link" + (selectView=="changePwd"?" on":"")}>비밀번호 변경</a>
            </li>
          </ul>

          <div className="account__content-wrap">
            <form action="">
              {selectView == "account" ? <ChangeName {...props} onClickBtn={onClickBtn}/> : <ChangePassword {...props} onClickBtn={onClickBtn}/>}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const ChangeName = (props) => {


  const onClickBtn = (id)=>{
    console.log(id)
    showPopUp(
      <EditPopup
        id={id}
      />,
      {
        darkmode: true,
        dismissButton: true,
      }
    );
  }

  return (
    <>
      <div className="account__content-item account__content-item--account">
        <span className="account__content-category account__content-category--account">이름</span>
        <input type="text" className="account__content-input" autoComplete="off" placeholder="이름을 입력하세요." value={props.userinfo.name} disabled />
        <button type="button" className="account__edit-btn" onClick={()=> onClickBtn("name")}>수정</button>
      </div>

      <div className="account__content-item account__content-item--account">
        <span className="account__content-category account__content-category--account">닉네임</span>
        <input type="text" className="account__content-input" autoComplete="off" placeholder="닉네임을 입력하세요." value={props.userinfo.nickName} disabled />
        <button type="button" className="account__edit-btn" onClick={()=> onClickBtn("nickName")}>수정</button>
      </div>
    </>
  )
}

const ChangePassword = (props) => {

  const [isShows,setIsShows] = useState([false,false,false])

  const onClickBtn = (index) => {
    const newArr = isShows.forEach((item, i) => {
      i === index && (isShows[i] = !item)
    });
    setIsShows(Object.assign(Array.from(isShows), newArr));
  }

  
  return (
    <>
    <div className="account__content-list">
      <div className="account__content-item">
        <span className="account__content-category">현재 비밀번호</span>
        <div className="account__password-change">
          <input type={isShows[0] ? "text" : "password"} autoComplete="off" className="account__content-input account__content-input--password" placeholder="현재 비밀번호를 입력해주세요." />
          <button className="account__password-show" type="button" onClick={()=>onClickBtn(0)} >
            <img src={isShows[0] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 안보기 아이콘" /> 
          </button>
          {/* TODO 입력 도움말 */}
          <p className="account__help-text">최소 8글자 이상</p>
        </div>
      </div>
      {/* TODO : 새 비밀번호 input */}
      <div className="account__content-item">
        <span className="account__content-category" >새 비밀번호</span>
        <div className="account__password-change">
          <input type={isShows[1] ? "text" : "password"} autoComplete="off" className="account__content-input account__content-input--password" placeholder="새 비밀번호를 입력해주세요." />
          <button className="account__password-show" type="button"  onClick={()=>onClickBtn(1)}>
            <img src={isShows[1] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 보기 아이콘" /> 
          </button>
          
          {/* TODO 입력 도움말 */}
          <p className="account__help-text">최소 8글자 이상</p>
        </div>
      </div>
      {/* TODO : 새 비밀번호 확인 input */}
      <div className="account__content-item">
        <span className="account__content-category">새 비밀번호 확인</span>
        <div className="account__password-change">
          <input type={isShows[2] ? "text" : "password"} autoComplete="off" className="account__content-input account__content-input--password" placeholder="새 비밀번호를 입력해주세요." />
          <button className="account__password-show" type="button"  onClick={()=>onClickBtn(2)} >
            <img src={isShows[2] ? EyesOnIcon : EyesOffIcon} alt="비밀번호 보기 아이콘" /> 
          </button>

          {/* TODO 입력 도움말 */}
          <p className="account__help-text">최소 8글자 이상</p>
        </div>
      </div>
      {/* // TODO 비밀번호 변경 UI */}
      
    </div>
    <div className="account__password-changed-btn-box">
      {/* TODO : 활성화 시 클래스 active 추가 */}
      <button type="submit" className="account__password-changed-btn">비밀번호 변경</button>
    </div>
  </>
  )
}