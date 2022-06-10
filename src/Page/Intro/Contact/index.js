import React from "react";
import { useState, useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import DownArrowIcon from "../../../Image/ic_dropdown_down.svg";
import BackIcon from "../../../Image/inc_arrow_left.svg";
import "./index.scss";
import * as request from "../../../Common/Util/HTTPRequest";
import PhoneDropDown from "../../../Common/Component/QRPopup/PhoneDropDown";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
//import { injectIntl } from "react-intl";

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
        if(institutionName.length > 0) {
          setEnableBtn(true)
        }else {
          setEnableBtn(false)
        }
        break
      case 'enrollStudents':
        enrollStudents = value
        break
      case 'note':
        note = value
        break
    }
  }

  const onClickNextBtn = ()=> {
    props.setViewIndex(2)
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
          <input id="institutionName" type="text" className="contact__form-input" maxLength='50' onChange={onChange}/>
        </div>

        <div className="contact__form-content">
          <span className="contact__form-input-title">How many students will be enrolled in?</span>
          <input id="enrollStudents" type="text" className="contact__form-input" maxLength='50' onChange={onChange}/>
        </div>

        <div className="contact__form-content">
          <span className="contact__form-input-title">Any other note?</span>
          <textarea id="note" className="contact__form-textarea" maxLength='1500' onChange={onChange}/>
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
  const [openDropdown,setOpenDropdown] = useState(false)
  const [enableBtn,setEnableBtn] = useState(false)
  let countryCode = localStorage.getItem("lang") == "ja" ? "+81" : "+1"

  const [params,setParams] = useState({ 
    "institutionName": institutionName,
    "enrollStudents": enrollStudents,
    "note": note,
    "familyName": "",
    "givenName": "",
    "title": "Select",
    "phone": "",
    "email": "",
  })

  useEffect(() => {
    
    if(params.familyName.length > 1 && params.givenName.length > 1 && params.phone.length > 5 && params.email.length > 5 && params.title !== "Select") {
      setEnableBtn(true)
      console.log(111111)
    }else {
      setEnableBtn(false)
      console.log(222222)
    }
  },[params]);

  const onClickBtns = async(id)=> {
    switch(id) {
      case 'backBtn':
        props.setViewIndex(1)
        break
      case 'sendBtn':
        console.log(params)
        const req = await request.sendContact(params)
        console.log(req)
        if(req) {
          showPopUp(
            <PopUp.OneButton
              title={req.success ? "Success" : req.reason}
              buttonName={"OK"}
            />,
            { darkmode: true }
            );
          }
        break
    }
  }

  const onClickDropdown = ()=> {
    setOpenDropdown(!openDropdown)
  }


  const onclickDropdown = (item)=> {
    console.log(item)
    setParams((params)=>({...params,"title" : item}))
  }

  const onChange = e => {
    const { value, id } = e.target;
    console.log(params)

    console.log(value,id)
    switch(id) {
      case 'familyName':
        setParams((params)=>({...params,"familyName" : value}))
        break
      case 'givenName':
        setParams((params)=>({...params,"givenName" : value}))
        break
      case 'phone':
        setParams((params)=>({...params,"phone" : countryCode + value}))
        break
      case 'email':
        setParams((params)=>({...params,"email" : value}))
        break
    }

  }

  const onChangeCountryCode = countryCode => {
    countryCode=countryCode
  };


  return (
    <>
      <div className="contact__form-sort">
        <span className="contact__from-sort-list">1</span>
        <span className="contact__from-sort-list active">2</span>
      </div>

      <div className="contact__form-input-box">
        <div className="contact__form-flex-box contact__form-flex-box--name">
          <div className="contact__form-content contact__form-content--name"> 
            <span className="contact__form-input-title required">First Name</span>
            <input id="familyName" type="text" className="contact__form-input" maxLength='50' onChange={onChange}/>
          </div>

          <div className="contact__form-content contact__form-content--name"> 
            <span className="contact__form-input-title required">Last Name</span>
            <input id="givenName" type="text" className="contact__form-input" maxLength='50' onChange={onChange}/>
          </div>
        </div>

        <div className="contact__form-content" onClick={onClickDropdown} > 
          <span className="contact__form-input-title required">Title</span>
          <div className="contact__form-select">
            <span className="contact__form-select-title">
              {params.title}
              <img alt="펼쳐보기 아이콘" src={DownArrowIcon} />
            </span>

            <div className={"contact__form-select-dropdown" + (openDropdown ? " on" : "")} >
              <ul className="contact__form-select-dropdown-list">
                {["Teacher", "Administrator (Principal/VP)", "Technology Interator","Other"].map((item)=>(
                  <li key={item} className="contact__form-select-dropdown-item" onClick={()=>onclickDropdown(item)}>{item}</li>
                ))}

              </ul>
            </div>
          </div>
        </div>

        <div className="contact__form-content"> 
          <span className="contact__form-input-title required">Phone Number</span>

          <div className="contact__from-select-input">
            <PhoneDropDown
                //phoneNum={1231233}
                countryCode={countryCode}
                handleSelectItem={onChangeCountryCode}
                handleInputChange={onChange}
              />
          </div>
        </div>


        <div className="contact__form-content contact__form-content--name"> 
          <span className="contact__form-input-title required">Email</span>
          <input id="email" type="text" className="contact__form-input" maxLength='50' onChange={onChange}/>
        </div>

        <div className="contact__form-bottom contact__form-bottom--flex">
          <button type="button" className="contact__form-back" onClick={()=>onClickBtns("backBtn")}>
            <img alt="뒤로가기 버튼" src={BackIcon} />
            back
          </button>
          <button type="button" className={`contact__from-send-btn ${enableBtn ? "active" : ""}` } onClick={()=>onClickBtns("sendBtn")}>Send Message</button>
        </div>
      </div>
    </>
  )
}


