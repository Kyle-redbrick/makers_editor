import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from 'react';
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import sha256 from "../../Util/SHA256";
import * as request from "../../../Common/Util/HTTPRequest";
import * as userInfoActions from "../../Store/Reducer/UserInfo";
import "./index.scss";


import View from  "./View.js"

const Container = (props) => {
  const {intl, userEmail, activateToken} = props;
  const [submitErr, setSubmitErr] = useState("");

  const schema = yup.object().shape({
    email: yup.string().required().email() ,
    name: yup.string().required(intl.formatMessage({id: "ID_SIGNUP_WARNING_FIRSTNAME_FORMAT"})),
    lastName: yup.string().required(intl.formatMessage({id: "ID_SIGNUP_WARNING_LASTNAME_FORMAT"})),
    nickName: yup.string().required(intl.formatMessage({id: "ID_SIGNUP_WARNING_USERNAME_FORMAT"})),
    password: yup.string().min(6, intl.formatMessage({id: "ID_SIGNUP_WARNING_PW_FORMAT"}))
  });

  const signUpForm = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      email: userEmail,
      name: "",
      lastName: "",
      nickName: "",
      password: "",
    },
  });

  const {
    getValues,
  } = signUpForm;

  const handleSignupSubmit = () => {
    const params = {
      email: getValues("email"),
      familyname: getValues("lastName"),
      name: getValues("name"),
      nickName: getValues("nickName"),
      password: sha256(getValues("password")),
    };

    request
      .inviteSignup({ ...params }, { authorityKey: activateToken })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          request
            .loginByToken({ token: res.body.token })
            .then((res) => res.json())
            .then((json) => {
              if (json.token) {
                localStorage.setItem("astroToken", json.token);
                props.updateUserInfo(json.user);
                props.dismiss();
              }
            })
        } else {
          setSubmitErr(res.reason);
        }
      });

  }

  const onClickDismiss = () => {
    props.dismiss();
  }

  return (
    <View
      intl={intl}
      signUpForm={signUpForm}
      onClickDismiss={onClickDismiss}
      handleSignupSubmit={handleSignupSubmit}
      submitErr={submitErr}
    />
  )
}


export default connect(undefined, {
  updateUserInfo: userInfoActions.updateUserInfo,
})(injectIntl(Container));