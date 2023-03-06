import React from "react";
import {FormattedMessage, injectIntl, useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
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

  const schema = yup.object({
    subject: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    organization: yup.string().required(),
    findReason: yup.string().required(),
    inquiry: yup.string().required(),
    agree: yup.bool().oneOf([true]),
  });

  const contactForm = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: {isValid},
  } = contactForm;

  const onClickLink = type => {
    showPopUp(<PopUp.Agreement type={type} />);
  };

  const onClickSubmit = async ({
    subject,
    firstName,
    email,
    phone,
    organization,
    findReason,
    inquiry,
    agree,
  }) => {
    if (isValid) {
      const params = {
        subject,
        firstName,
        email,
        phone,
        organization,
        findReason,
        inquiry,
        agree,
      };
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
    }
  };

  return (
    <form className="contact_form" onSubmit={handleSubmit(onClickSubmit)}>
      <SelectBox
        intl={intl}
        num={1}
        name="subject"
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE1"})}
        list={[...Array(4)].map((_, i) => `ID_INTRO_CONTACT_SUBJECT${i + 1}`)}
        register={register}
      />
      <div className="contact_form_row">
        <InputText
          num={2}
          name="firstName"
          type="text"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE2"})}
          register={register}
        />
        <InputText
          num={3}
          name="email"
          type="email"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE3"})}
          register={register}
        />
      </div>
      <div className="contact_form_row">
        <InputText
          num={4}
          name="phone"
          type="tel"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE4"})}
          register={register}
        />
        <InputText
          num={5}
          name="organization"
          type="text"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE5"})}
          register={register}
        />
      </div>
      <SelectBox
        intl={intl}
        name="findReason"
        num={6}
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE6"})}
        list={[...Array(6)].map(
          (_, i) => `ID_INTRO_CONTACT_FIND_REASON${i + 1}`,
        )}
        register={register}
      />
      <TextArea
        num={7}
        name="inquiry"
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE7"})}
        register={register}
      />
      <label htmlFor="agree" className="contact_checkbox">
        <input type="checkbox" id="agree" {...register("agree")} />
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
        className={`contact_submit_btn ${isValid ? "active" : ""}`}
        type="submit"
        onClick={onClickSubmit}
      >
        {intl.formatMessage({id: "ID_INTRO_CONTACT_BUTTON_SEND"})}
      </button>
    </form>
  );
};

const TitleArea = ({num, title}) => {
  return (
    <p className="contact_title">
      {num}. {title}
    </p>
  );
};

const SelectBox = ({intl, num, name, title, list, register}) => {
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
              value={intl.formatMessage({id: item})}
              {...register(name)}
            />
            {intl.formatMessage({id: item})}
            <span className="contact_select_check_mark" />
          </label>
        ))}
      </div>
    </div>
  );
};

const InputText = ({num, name, title, type, register}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <input className="contact_input" type={type} {...register(name)} />
    </div>
  );
};

const TextArea = ({num, name, title, register}) => {
  return (
    <div>
      <TitleArea num={num} title={title} />
      <textarea className="contact_textarea" {...register(name)} />
    </div>
  );
};
