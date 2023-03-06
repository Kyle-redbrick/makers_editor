import React, {useState, useEffect} from "react";
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

  const [isActiveSubmitBtn, setIsActiveSubmitBtn] = useState(false);
  const [subject, setSubject] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [findReason, setFindReason] = useState(null);
  const [inquiry, setInquiry] = useState(null);
  const [agree, setAgree] = useState(null);

  useEffect(() => {
    if (
      subject &&
      firstName &&
      email &&
      phone &&
      organization &&
      findReason &&
      inquiry &&
      agree
    ) {
      setIsActiveSubmitBtn(true);
    } else {
      setIsActiveSubmitBtn(false);
    }
  }, [
    subject,
    firstName,
    email,
    phone,
    organization,
    findReason,
    inquiry,
    agree,
  ]);

  const onClickLink = type => {
    showPopUp(<PopUp.Agreement type={type} />);
  };

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
        intl={intl}
        num={1}
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE1"})}
        list={[...Array(4)].map((_, i) => `ID_INTRO_CONTACT_SUBJECT${i + 1}`)}
        setState={setSubject}
      />
      <div className="contact_form_row">
        <InputText
          num={2}
          type="text"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE2"})}
          setState={setFirstName}
        />
        <InputText
          num={3}
          type="email"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE3"})}
          setState={setEmail}
        />
      </div>
      <div className="contact_form_row">
        <InputText
          num={4}
          type="tel"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE4"})}
          setState={setPhone}
        />
        <InputText
          num={5}
          type="text"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE5"})}
          setState={setOrganization}
        />
      </div>
      <SelectBox
        intl={intl}
        num={6}
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE6"})}
        list={[...Array(6)].map(
          (_, i) => `ID_INTRO_CONTACT_FIND_REASON${i + 1}`,
        )}
        setState={setFindReason}
      />
      <TextArea
        num={7}
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE7"})}
        setState={setInquiry}
      />
      <label
        htmlFor="agree"
        className="contact_checkbox"
        onChange={() => setAgree(!agree)}
      >
        <input type="checkbox" id="agree" />
        {intl.formatMessage(
          {id: "ID_INTRO_CONTACT_TERM"},
          {
            term: (
              <span onClick={() => onClickLink("ID_FOOTER_TERMS")}>
                {intl.formatMessage({id: "ID_FOOTER_TERMS"})}
              </span>
            ),
            privacy: (
              <span onClick={() => onClickLink("ID_FOOTER_PRIVACY")}>
                {intl.formatMessage({id: "ID_FOOTER_PRIVACY"})}
              </span>
            ),
          },
        )}
        <span className="contact_select_check_mark" />
      </label>
      <button
        className={`contact_submit_btn ${isActiveSubmitBtn ? "active" : ""}`}
        type="submit"
        onClick={onClickSubmit}
      >
        {intl.formatMessage({id: "ID_INTRO_CONTACT_BUTTON_SEND"})}
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

const SelectBox = ({intl, num, title, list, setState}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <div className="contact_select_list">
        {list.map(item => (
          <label key={item} htmlFor={item} className="contact_select_label">
            <input
              type="radio"
              id={item}
              name={title}
              value={item}
              onChange={() => setState(intl.formatMessage({id: item}))}
            />
            {intl.formatMessage({id: item})}
            <span className="contact_select_check_mark" />
          </label>
        ))}
      </div>
    </div>
  );
};

const InputText = ({num, title, type, setState}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <input
        className="contact_input"
        type={type}
        onChange={({target}) => setState(target.value)}
      />
    </div>
  );
};

const TextArea = ({num, title, setState}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea
        className="contact_textarea"
        onChange={({target}) => setState(target.value)}
      />
    </div>
  );
};
