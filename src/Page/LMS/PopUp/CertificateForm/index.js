import React, { useRef, useState } from "react";
import { injectIntl } from "react-intl";
import "./index.scss"
import { showPopUp } from "../../../../Common/Component/PopUp";
import clearImg from "../../../../Image/quest-clear-img-astroboy-2.png"

import Print from "../../../../Common/Component/OCPCertification";


function CertificateForm(props) {

  const [name, setName] = useState("");
  const [warning, setWarning] = useState("");

  const nameInput = useRef("")

  const alertCertificate = () => {

    if (name === "") {
      setWarning(props.intl.formatMessage({ id: "ID_CERTIFICATE_ALERT_NAME" }));
      return;
    }

    showPopUp(
      <Print
        course={props.course}
        name={nameInput.current.value}
      />, {
      dismissButton: true,
      defaultPadding: false
    }, { isBackTrans: true });


  }

  return (
    <div className="dream_projectClear">
      <img className="dream_projectClear_image" src={clearImg} alt="clear" />
      <p className="popup_title">{props.intl.formatMessage({ id: "ID_DREAM_BUILDER_COURSE_CLEAR" })}</p>
      <div className="popup_subtitle">
        {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_CERT_SUBTITLE" })}
      </div>

      <div className="questClear_certificate_form">
        <div className="questClear_certificate_row">
          <label htmlFor="certificate_name" className="questClear_certificate_label">Name</label>
          <input type="text" id="certificate_name" className="questClear_certificate_field"
            value={name} onChange={e => setName(e.target.value)} ref={nameInput} maxLength={14}>
          </input>
          <span className="questClear_certificate_field_max_length">{name.length} / 14</span>
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
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_CERT_QUIT_BUTTON" })}
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