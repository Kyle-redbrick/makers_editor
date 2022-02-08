import React, { useRef, useState } from "react";
import { injectIntl } from "react-intl";
import "./index.scss"
import { showPopUp } from "../../../../Common/Component/PopUp";
// import * as request from "../../../../Common/Util/HTTPRequest";
import clearImg from "../../../../Image/quest-clear-img-astroboy.svg"

import Print from "../../../../Common/Component/OCPCertification";


function CertificateForm(props) {

  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");
  const [class_name, setClassName] = useState("");

  const nameInput = useRef("")
  const classInput = useRef("")


  const alertCertificate = () => {
    if (name === "" && class_name === "") {
      setWarning(props.intl.formatMessage({ id: "ID_CERTIFICATE_ALERT_NAME_CLASS" }));
      return;
    }
    if (name === "") {
      setWarning(props.intl.formatMessage({ id: "ID_CERTIFICATE_ALERT_NAME" }));
      return;
    }
    if (class_name === "") {
      setWarning(props.intl.formatMessage({ id: "ID_CERTIFICATE_ALERT_CLASS" }));;
      return;
    }
    showPopUp(
      <Print
        course={props.course}
        name={nameInput.current.value}
        class={classInput.current.value}
        updateCourses={props.updateCourses}
      />, {
      dismissButton: true,
      defaultPadding: false
    },{isBackTrans:true});


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
          <input type="text" id="certificate_name" className="questClear_certificate_field"
            value={name} onChange={e => setName(e.target.value)} ref={nameInput}>
          </input>
        </div>

        <div className="questClear_certificate_row">
          <label htmlFor="certificate_class" className="questClear_certificate_label">Class</label>
          <input type="text" id="certificate_class" className="questClear_certificate_field"
            value={class_name} onChange={e => setClassName(e.target.value)} ref={classInput}>
          </input>
        </div>
      </div>
      <div className="questClear_warningmsg">{warning}</div>

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
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_COURSE_CLEAR_SUBMIT_BUTTON" })}
        </button>
      </div>
    </div>
  );
}

export default injectIntl(CertificateForm);