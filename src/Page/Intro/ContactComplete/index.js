import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

function ContactComplete () {
  return (
    <div className="contact-complete">
      <h3 className="contact-complete__title"><FormattedMessage id="ID_INTRO_CONTACT_COMPLETE_TITLE" /></h3>
      <p className="contact-complete__child-title"><FormattedMessage id="ID_INTRO_CONTACT_COMPLETE_CHILD_TITLE" /></p>
      <button type="button" className="contact-complete__ok-btn"><FormattedMessage id="ID_INTRO_CONTACT_COMPLETE_OK_BUTTON" /></button>
    </div>
  )
}

export default ContactComplete ;