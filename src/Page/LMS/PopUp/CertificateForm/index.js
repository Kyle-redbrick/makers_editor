import React,{ useRef } from "react";
import { injectIntl } from "react-intl";
import "./index.scss"
import { showPopUp } from "../../../../Common/Component/PopUp";
// import * as request from "../../../../Common/Util/HTTPRequest";
import clearImg from "../../../../Image/quest-clear-img-astroboy.svg"

import Print from "../../../../Common/Component/OCPCertification";


function CertificateForm(props) {

  const nameInput = useRef("")
  const classInput = useRef("")

  const alertCertificate = () => {
    showPopUp(
      <Print 
        course={props.course}
        name={nameInput.current.value}
        class={classInput.current.value}
        updateCourses={props.updateCourses}
      />, {
      dismissButton: false,
      defaultPadding: false
    });
  }

  return (
    <div className="dream_projectClear">
      <img className="dream_projectClear_image" src={clearImg} alt="clear" />
      <p className="popup_title">{props.intl.formatMessage({ id: "ID_DREAM_BUILDER_COURSE_CLEAR" })}</p>
      <div className="popup_subtitle">
        {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_SUBTITLE" })}
      </div>

      <div className="questClear_certificate_form">
        <div className="questClear_certificate_row">
          <label htmlFor="certificate_name" className="questClear_certificate_label">Name</label>
          <input type="text" id="certificate_name" className="questClear_certificate_field" ref={nameInput}>
          </input>
        </div>
        <div className="questClear_certificate_row">
          <label htmlFor="certificate_class" className="questClear_certificate_label">Class</label>
          <input type="text" id="certificate_class" className="questClear_certificate_field" ref={classInput}>
          </input>
        </div>
      </div>

      <div className="popup_buttons">
        <button
          className="popup_button popup_button-cancel"
          onClick={() => {
            if (props.onClickCancel) props.onClickCancel();
            if (props.dismiss) props.dismiss();
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_COURSE_CLEAR_CANCEL_BUTTON" })}
        </button>
        <button
          className="popup_button"
          onClick={() => {
            alertCertificate(props);
            if (props.onClickSubmit) props.onClickSubmit();
            if (props.dismiss) props.dismiss();
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_COURSE_CLEAR_SUBMIT_BUTTON" })}
        </button>
      </div>
    </div>
  );
}

export default injectIntl(CertificateForm);