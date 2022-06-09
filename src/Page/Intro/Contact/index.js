import React from "react";
import { useState, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import DownArrowIcon from "../../../Image/ic_dropdown_down.svg";
import BackIcon from "../../../Image/inc_arrow_left.svg";
import "./index.scss";
import * as request from "../../../Common/Util/HTTPRequest";
import { URL } from "../../../Common/Util/HTTPRequest";



let institutionName = "";
let enrollStudents = "";
let note = "";

const Contact = () => {
  const [viewIndex,setViewIndex] = useState(1)
  
  
  return (
    <div className="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <h3 className="contact__title"><FormattedMessage id="ID_INTRO_CONTACT_TITLE" /></h3>
          <p className="contact__child-title"><FormattedMessage id="ID_INTRO_CONTACT_CHILD_TITLE" /></p>
        </div>

        <div className="contact__form">
          <div className="contact__from-inner">
            { viewIndex < 2 ? <FormFirst viewIndex={viewIndex} setViewIndex={setViewIndex}/> : <FormSecond viewIndex={viewIndex} setViewIndex={setViewIndex} /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;

/* TODO 첫번째 form */
const FormFirst = (props) => {

  const [enableBtn,setEnableBtn] = useState(false)

  const onChange = e => {
    const { value, id } = e.target;

    switch(id) {
      case 'institutionName':
        institutionName = value
        if(institutionName.length > 1) {
          setEnableBtn(true)
        }
        break
      case 'enrollStudents':
        enrollStudents = value
        break
      case 'note':
        note = value
        break
    }

    console.log(institutionName,enrollStudents,note)
  }

  const onClickNextBtn = ()=> {
    props.setViewIndex(2)
    console.log(11111111111)
  }

  return (
    <>
      <div className="contact__form-sort">
        {/* TODO  활성화된 페이지에 클래스 active 추가 */}
        <span className="contact__from-sort-list active">1</span>
        <span className="contact__from-sort-list">2</span>
      </div>

      <div className="contact__form-input-box">
        <div className="contact__form-content">
          {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
          <span className="contact__form-input-title required">Institution Name</span>
          <input id="institutionName" type="text" className="contact__form-input" onChange={onChange}/>
        </div>

        <div className="-content">
          <span className="contact__form-input-title">How many students will be enrolled in?</span>
          <input id="enrollStudents" type="text" className="contact__form-input" onChange={onChange}/>
        </div>

        <div className="contact__form-content">
          <span className="contact__form-input-title">Any other note?</span>
          <textarea id="note" className="contact__form-textarea" onChange={onChange}/>
        </div>
      </div>

      <div className="contact__form-bottom">
        {/* TODO 활성화 시 클래스 active 추가 */}
        <button type="button" className={`contact__from-next ${enableBtn ? "active" : ""}`} onClick = {onClickNextBtn}>Next</button>
      </div>

    </>
  )
}

/* TODO 두번째 form */
const FormSecond = (props) => {

  let familyName = ""
  let givenName = ""
  let title = ""
  let phone = ""
  let email = ""

  const onClickBtns = (id)=> {
    switch(id) {
      case 'backBtn':
        props.setViewIndex(1)
        break
      case 'sendBtn':
        request.sendContact({ "familyName": "Danny", "givenName": "Lee",
        "title": "Hello", "phone": "+821076645035", "email":"danny@redbrick.space",
        "institutionName": "Monster Inc.", "enrollStudents": "5",
        "note": "Hello World"})
        break
    }
  }

  const onChange = e => {
    const { value, id } = e.target;

    console.log(value,id)
    switch(id) {
      case 'familyName':
        familyName = value
        break
      case 'givenName':
        givenName = value
        break
      case 'phone':
        phone = value
        break
      case 'email':
        email = value
        break
    }
  }

  return (
    <>
      <div className="contact__form-sort">
        {/* TODO  활성화된 페이지에 클래스 active 추가 */}
        <span className="contact__from-sort-list">1</span>
        <span className="contact__from-sort-list active">2</span>
      </div>

      <div className="contact__form-input-box">
        <div className="contact__form-flex-box contact__form-flex-box--name">
          <div className="contact__form-content contact__form-content--name">
            {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
            <span className="contact__form-input-title required">First Name</span>
            <input id="familyName" type="text" className="contact__form-input" onChange={onChange}/>
          </div>

          <div className="contact__form-content contact__form-content--name">
            {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
            <span className="contact__form-input-title required">Last Name</span>
            <input id="givenName" type="text" className="contact__form-input" onChange={onChange}/>
          </div>
        </div>

        <div className="contact__form-content">
          {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
          <span className="contact__form-input-title required">Title</span>
          <div className="contact__form-select">
            {/* TODO 클릭 했을 떄 클래스 on 추가 */}
            <span className="contact__form-select-title">
              select
              <img alt="펼쳐보기 아이콘" src={DownArrowIcon} />
            </span>

            {/* TODO 펼쳤을 때 list / 같은위치인 span 에게 클래스 on 추가 되었을 때 같이 나타나야함 */}
            <div className="contact__form-select-dropdown">
              <ul className="contact__form-select-dropdown-list">
                <li className="contact__form-select-dropdown-item">Teacher</li>
                <li className="contact__form-select-dropdown-item">Administrator (Principal/VP)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact__form-content">
          {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
          <span className="contact__form-input-title required">Phone Number</span>

          <div className="contact__from-select-input">
            <div className="contact__form-select">
              <span className="contact__form-select-title">
                select
                <img alt="펼쳐보기 아이콘" src={DownArrowIcon} />
              </span>


              <div className="contact__form-select-dropdown contact__form-select-dropdown--country">
                <ul className="contact__form-select-dropdown-list">
                  <li className="contact__form-select-dropdown-item">
                    🇲🇴 {/* TODO 국가 아이콘 */}
                    &nbsp; <span className="contact__call-country-name">Japan</span> {/* TODO 국가이름 */}
                    <span className="contact__call-country-number">+ 81</span> {/* TODO  국가 call number */}
                  </li>
                </ul>
              </div>
            </div>
            <input id="phone" type="text" className="contact__form-input" onChange={onChange}/>
          </div>
        </div>

        <div className="contact__form-content contact__form-content--name">
          {/* TODO 필수 항목인 경우 span 에 클래스 required 추가 */}
          <span className="contact__form-input-title required">Email</span>
          <input id="email" type="text" className="contact__form-input" onChange={onChange}/>
        </div>

        <div className="contact__form-bottom contact__form-bottom--flex">
          <button type="button" className="contact__form-back" onClick={()=>onClickBtns("backBtn")}>
            <img alt="뒤로가기 버튼" src={BackIcon} />
            back
          </button>
          {/* TODO 활성화 시 클래스 active 추가 */}
          <button type="button" className="contact__from-send-btn active" onClick={()=>onClickBtns("sendBtn")}>Send Message</button>
        </div>
      </div>
    </>
  )
}

