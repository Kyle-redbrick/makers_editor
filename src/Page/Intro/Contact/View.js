import React from "react";
import {FormattedMessage} from "react-intl";
import Form from "./Component/Form";

const View = () => {
  return (
    <div className="contact">
      <div className="contact__inner">
        <div className="contact__info">
          <h3 className="contact__title">
            <FormattedMessage id="ID_INTRO_CONTACT_TITLE" />
          </h3>
          <p className="contact__child-title">
            <FormattedMessage id="ID_INTRO_CONTACT_CHILD_TITLE" />
          </p>
        </div>

        <div className="contact__form">
          <div className="contact__from-inner">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
