import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

function Contact () {
  return (
    <div className="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <h3 className="contact__title"><FormattedMessage id="ID_INTRO_ABOUT_ASTRO_CODING_GO_TITLE" /></h3>
          <p className="contact__child-title"><FormattedMessage id="ID_INTRO_CONTACT_CHILD_TITLE" /></p>
        </div>

        <div className="contact__form">
          <div className="contact__from-inner">
            { true ? <FormFirst /> : <FormSecond /> }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;

/* TODO 첫번째 form */
const FormFirst = () => {
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
          <input type="text" className="contact__form-input"/>
        </div>

        <div className="contact__form-content">
          <span className="contact__form-input-title">How many students will be enrolled in?</span>
          <input type="text" className="contact__form-input"/>
        </div>

        <div className="contact__form-content">
          <span className="contact__form-input-title">Any other note?</span>
          <textarea col="0"  className="contact__form-textarea" />
        </div>
      </div>

      <div className="contact__form-bottom">
        {/* TODO 활성화 시 클래스 active 추가 */}
        <button type="button" className="contact__from-next">Next</button>
      </div>

    </>
  )
}

/* TODO 두번째 form */
const FormSecond = () => {
  return (
    <>
    
    </>
  )
}

