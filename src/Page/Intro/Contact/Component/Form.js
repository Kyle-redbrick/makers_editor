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
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.number().required(),
    institutionName: yup.string().required(),
    findType: yup.string().required(),
    note: yup.string().required(),
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
    name,
    email,
    phone,
    institutionName,
    findType,
    note,
  }) => {
    if (isValid) {
      const SUBJECT_TYPE = {
        ID_INTRO_CONTACT_SUBJECT1: "REGISTRATION",
        ID_INTRO_CONTACT_SUBJECT2: "PRODUCT_FEATURE",
        ID_INTRO_CONTACT_SUBJECT3: "PARTNERSHIP",
        ID_INTRO_CONTACT_SUBJECT4: "OTHER",
      };
      const ASTRO_FIND_ROUTE = {
        ID_INTRO_CONTACT_FIND_REASON1: "PRINT_FLYER",
        ID_INTRO_CONTACT_FIND_REASON2: "EMAIL_MARKETING",
        ID_INTRO_CONTACT_FIND_REASON3: "INTERNET_SEARCH",
        ID_INTRO_CONTACT_FIND_REASON4: "ONLINE_ADS",
        ID_INTRO_CONTACT_FIND_REASON5: "REFERRAL",
        ID_INTRO_CONTACT_FIND_REASON6: "OTHER",
      };

      const params = {
        subject: SUBJECT_TYPE[subject],
        name,
        email,
        phone: `+${phone}`,
        institutionName,
        findType: ASTRO_FIND_ROUTE[findType],
        note,
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
          name="name"
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
          name="institutionName"
          type="text"
          title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE5"})}
          register={register}
        />
      </div>
      <SelectBox
        intl={intl}
        name="findType"
        num={6}
        title={intl.formatMessage({id: "ID_INTRO_CONTACT_SUBTITLE6"})}
        list={[...Array(6)].map(
          (_, i) => `ID_INTRO_CONTACT_FIND_REASON${i + 1}`,
        )}
        register={register}
      />
      <TextArea
        num={7}
        name="note"
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
      >
        {intl.formatMessage({id: "ID_INTRO_CONTACT_BUTTON_SEND"})}
      </button>
    </form>
  );
};

export default Form;
