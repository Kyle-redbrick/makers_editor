import React from "react";
import {FormattedMessage, injectIntl, useIntl} from "react-intl";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, {showPopUp} from "../../../Common/Component/PopUp";
import "./index.scss";

const Contact = props => {
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

export default injectIntl(Contact);

const Form = () => {
  const intl = useIntl();
  const onClickLink = type => {};

  const onClickSubmit = async () => {
    const params = "";
    const res = await request.sendContact(params);
    if (res) {
      showPopUp(
        <PopUp.OneButton
          title={
            res.success
              ? intl.formatMessage({id: "ID_INTRO_CONTACT_2_SUCCESS"})
              : res.reason
          }
          buttonName={"OK"}
        />,
        {darkmode: true},
      );
    }
  };
  return (
    <div className="contact_form">
      <SelectBox
        num={1}
        title="Subject"
        list={["Registration", "Project Features", "Partnership", "Other"]}
      />
      <div className="contact_form_row">
        <InputText num={2} title="First Name" />
        <InputText num={3} title="E-mail" />
      </div>
      <div className="contact_form_row">
        <InputText num={4} title="Phone Number" />
        <InputText num={5} title="Institution/Organization" />
      </div>
      <SelectBox
        num={6}
        title="How did you find ‘Astro Coding Go!’?"
        list={[
          "Print Flyer",
          "E-mail Marketing",
          "Internet Search",
          "Online Ads",
          "Referral",
          "Other (please specify)",
        ]}
      />
      <TextArea num={7} title="Inquiry" />
      <label htmlFor="agree" className="contact_checkbox">
        <input type="checkbox" id="agree" />I agree to the{" "}
        <span onClick={() => onClickLink("term")}>Terms of Use</span> and{" "}
        <span onClick={() => onClickLink("policy")}>Privacy Policy</span>
        <span className="contact_select_check_mark" />
      </label>
      <button
        className={`contact_submit_btn ${false ? "active" : ""}`}
        type="submit"
        onClick={onClickSubmit}
      >
        Send Message
      </button>
    </div>
  );
};

const TitleArea = ({num, title}) => {
  return (
    <p className="contact_title">
      {num}. {title}
    </p>
  );
};

const SelectBox = ({num, title, list}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <div className="contact_select_list">
        {list.map(item => (
          <label key={item} htmlFor={item} className="contact_select_label">
            <input type="radio" id={item} name={title} value={item} />
            {item}
            <span className="contact_select_check_mark" />
          </label>
        ))}
      </div>
    </div>
  );
};

const InputText = ({num, title}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <input className="contact_input" type="text" />
    </div>
  );
};

const TextArea = ({num, title}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea className="contact_textarea" />
    </div>
  );
};
