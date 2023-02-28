import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./index.scss";
import * as request from "../../../../Common/Util/HTTPRequest";
import { FormattedMessage, injectIntl } from "react-intl";

function EditPopup(props) {
  return <div>{props.id == "name" ? <EditName {...props} /> : <EditNickname {...props} />}</div>;
}

const EditName = (props) => {
  const [warnText, setWarnText] = useState({ warnName: "", warnRes: "" });
  let nameData = undefined;

  const schema = yup.object().shape({
    name: yup.string().required(),
    familyname: yup.string().required(),
  });

  const editForm = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = editForm;

  const { name: name_error, familyname: familyname_error } = errors;

  const onClickSubmit = async ({ name, familyname }) => {
    if (name.length > 0 && name.length < 31) {
      nameData = await request.modifyName({ section: "name", familyname, givenname: name });
      if (nameData.success) {
        props.updateUserInfo({ fullname: { family: familyname, given: name }, name: nameData.body.newValue });
        props.dismiss();
      } else {
        setWarnText({ warnName: "name.length > 0 && name.length < 31" });
      }
    } else {
      if (nameData) {
        setWarnText({ warnRes: nameData.reason });
      }
    }
  };

  return (
    <form className="edit-popup__inner" onSubmit={handleSubmit(onClickSubmit)}>
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_TITLE" />
        </h3>
      </div>

      <div className="edit-popup__body">
        <div className="edit-popup__content">
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_GIVEN_NAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_ENTER_GIVEN_NAME">
                {(placeholder) => (
                  <input
                    id="name"
                    type="text"
                    placeholder={placeholder}
                    className={`edit-popup__input ${name_error ? "error" : ""}`}
                    {...register("name")}
                  />
                )}
              </FormattedMessage>
              <p className="edit-popup__input-help">{warnText.warnName}</p>
            </div>
          </div>
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_FAMILY_NAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NAME_POPUP_ENTER_FAMILY_NAME">
                {(placeholder) => (
                  <input
                    id="firstName"
                    type="text"
                    placeholder={placeholder}
                    className={`edit-popup__input ${familyname_error ? "error" : ""}`}
                    {...register("familyname")}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
        </div>
      </div>

      <p className="edit-popup__input-help">{warnText.warnFristName}</p>
      <div className="edit-popup__footer">
        <button className="edit-popup__submit-btn" type="submit">
          <FormattedMessage id="ID_COMMON_APPLY" />
        </button>
      </div>
    </form>
  );
};

const EditNickname = (props) => {
  const [warnText, setWarnText] = useState({ warnName: "", warnRes: "" });
  let nickName = "";
  let nickNameData = undefined;

  const schema = yup.object().shape({
    nickname: yup.string().required(),
  });

  const editForm = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = editForm;

  const { nickname: nickname_error } = errors;

  const onClickSubmit = async ({ nickname }) => {
    if (nickName.length > 0 && nickName.length < 31) {
      nickNameData = await request.modifyName({ section: "nickname", nickname });
      if (nickNameData.success) {
        props.updateUserInfo({ nickName: nickname });
        setWarnText({ warnName: "", warnRes: "" });
        props.dismiss();
      } else {
        setWarnText({ warnRes: "err" });
      }
    } else {
      if (nickNameData) {
        setWarnText({ warnRes: nickNameData.reason });
      }
    }
  };

  return (
    <form className="edit-popup__inner" onSubmit={handleSubmit(onClickSubmit)}>
      <div className="edit-popup__head">
        <h3 className="edit-popup__title">
          <FormattedMessage id="ID_ACCOUNT_EDIT_NICKNAME_POPUP_TITLE" />
        </h3>
      </div>

      <div className="edit-popup__body">
        <div className="edit-popup__content">
          <div className="edit-popup__list">
            <span className="edit-popup__category">
              <FormattedMessage id="ID_ACCOUNT_SETTING_TAB_01_NICKNAME" />
            </span>
            <div className="edit-popup__right">
              <FormattedMessage id="ID_ACCOUNT_EDIT_NICKNAME_POPUP_ENTER_NICKNAME">
                {(placeholder) => (
                  <input
                    type="text"
                    placeholder={placeholder}
                    className={`edit-popup__input ${nickname_error && "error"}`}
                    {...register("nickname")}
                  />
                )}
              </FormattedMessage>
              <p className="edit-popup__input-help">{warnText.warnName}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="edit-popup__input-help">{warnText.warnRes}</p>

      <div className="edit-popup__footer">
        <button className="edit-popup__submit-btn" type="submit">
          <FormattedMessage id="ID_COMMON_APPLY" />
        </button>
      </div>
    </form>
  );
};

export default injectIntl(EditPopup);
