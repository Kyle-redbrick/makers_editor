import React from "react";
import {useIntl} from "react-intl";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import * as request from "../../../../Common/Util/HTTPRequest";
import PopUp, {showPopUp} from "../../../../Common/Component/PopUp";
import SelectBox from "./SelectBox";
import InputText from "./InputText";
import TextArea from "./TextArea";

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

export default Form;
