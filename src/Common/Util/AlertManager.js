import React from "react";
import ReactDOM from "react-dom";
import Rating from "react-rating";
import { FormattedMessage } from "react-intl";
import * as request from "./HTTPRequest";

import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import zh from "react-intl/locale-data/zh";
import locale from "../../locale";

import starImageOff from "../../Image/star-off.svg";
import starImageOn from "../../Image/star-on.svg";

import { IntlProvider, addLocaleData } from "react-intl";

addLocaleData([...en, ...ko, ...zh]);

const getNavigatorLanguage = () => {
  let lang;
  lang = localStorage.getItem("wizLang");
  if (lang && ["ko", "en", "zh"].includes(lang)) return lang;
  var str;
  if (navigator.languages && navigator.languages.length) {
    str = navigator.languages[0];
  } else {
    str =
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "en";
  }
  lang = str.replace(/-[A-Z]*/, "");
  // localStorage.setItem("wizLang", lang);
  // return lang;
  //localStorage.setItem("wizLang", "en");
  return "en";
};

const defaultLang = getNavigatorLanguage();

export const showStudentFeedbackPopUp = callback => {
  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  let handleOK = handleClose;
  if (callback) {
    handleOK = e => {
      if (score === 0) {
        return;
      } else if (comment === "") {
        return;
      }
      handleClose();
      callback(score, comment);
    };
  }

  let score = 0;
  const onChangeScore = newScore => {
    score = newScore;
  };
  let comment = "";
  const onChangeComment = newComment => {
    comment = newComment;
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="PopUp_wrapper">
        <div className="title">
          <FormattedMessage id={"ID_WIZLIVE_FEEDBACK_TITLE"} />
        </div>
        <div className="message">
          <FormattedMessage id={"ID_WIZLIVE_FEEDBACK_MESSAGE"} />
        </div>
        <div className="rating">
          <Rating
            initialRating={0}
            emptySymbol={
              <img src={starImageOff} className="rating_star" alt="star-img" />
            }
            fullSymbol={
              <img src={starImageOn} className="rating_star" alt="star-img" />
            }
            onChange={score => {
              onChangeScore(score);
            }}
          />
        </div>
        <div className="textarea">
          <FormattedMessage id={"ID_WIZLIVE_FEEDBACK_PLACEHOLDER"}>
            {placeholder => (
              <textarea
                placeholder={placeholder}
                onChange={e => {
                  onChangeComment(e.target.value);
                }}
              />
            )}
          </FormattedMessage>
        </div>
        <button className="registerButton" onClick={handleOK}>
          <FormattedMessage id={"ID_WIZLIVE_SEND"} />
        </button>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showAlert = (titleId, msgId, btnTextId, callback) => {
  btnTextId = !btnTextId ? "OK" : btnTextId;

  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  let handleOK = handleClose;
  if (callback) {
    handleOK = e => {
      callback();
      handleClose();
    };
  }

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="onebtn_wrapper">
        <p className="closeBtn" onClick={handleClose} />
        <div className="title">
          <FormattedMessage id={titleId} />
        </div>
        {msgId && (
          <div className="message">
            <FormattedMessage id={msgId} />
          </div>
        )}
        <button className="okBtn" type="button" onClick={handleOK}>
          <FormattedMessage id={btnTextId} />
        </button>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

/**
 * @param email - 신고를 보내는 주체, 비회원일시 null값
 * @param target - 신고 대상의 정보, { PublishedCommentId, PublishedReplyId, CommunityArticleId, CommunityArticleCommentId, CommunityArticleReplyId }
 */
export const showReport = (email, target) => {
  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  const postReport = () => {
    const message = document.getElementById("report_popup_textarea").value;
    request.postReport({ email, message, target }).then(res =>
      res.json().then(json => {
        if (json.success) {
          showAlert(
            "ID_REPORT_POST_SUCCESS_TITLE",
            undefined,
            "ID_REPORT_POST_SUCCESS_CONFIRM",
            () => {
              handleClose();
            }
          );
        } else {
          showAlert(
            "ID_REPORT_POST_FAIL_TITLE",
            "ID_REPORT_POST_FAIL_MSG",
            "ID_REPORT_POST_FAIL_CONFIRM",
            () => {
              handleClose();
            }
          );
        }
      })
    );
  };

  const element = React.createElement(
    "div",
    { id: "wizAlert" },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="report_popup">
        <div className="report_popup_title"><FormattedMessage id={"ID_ALERT_MANAGE_TITLE"} /></div>
        <textarea
          id="report_popup_textarea"
          className="report_popup_textarea"
          placeholder={this.props.intl.formatMessage({ id: "ID_ALERT_MANAGE_REPORT_POPUP_PLACEHOLDER" })}
        />
        <section className="report_popup_buttons">
          <button
            className="report_popup_button report_popup_button-cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={"ID_ALERT_MANAGE_CLOSE_BUTTON"} />
          </button>
          <button
            className="report_popup_button report_popup_button-report"
            onClick={postReport}
          >
            <FormattedMessage id={"ID_ALERT_MANAGE_TITLE"} />
          </button>
        </section>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showTwoBtnAlert = (
  titleId,
  okBtnTextId,
  cancelBtnTextId,
  callback,
  mainColorOkBtn = true,
  msgId
) => {
  okBtnTextId = !okBtnTextId ? "OK" : okBtnTextId;

  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };
  const handleOK = e => {
    handleClose();
    callback();
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="twobtn_wrapper">
        <div className="title">
          <FormattedMessage id={titleId} />
        </div>
        {msgId && (
          <div className="message">
            <FormattedMessage id={msgId} />
          </div>
        )}
        <div className="two_btns">
          <button
            type="button"
            className="two_btn"
            id={mainColorOkBtn ? "two_btn_main_color" : "two_btn_ok"}
            onClick={handleOK}
          >
            <FormattedMessage id={okBtnTextId} />
          </button>
          <button
            type="button"
            className="two_btn"
            id="two_btn_cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={cancelBtnTextId} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showTwoBtnAlertWithValues = (
  titleId,
  titleValues,
  msgId,
  okBtnTextId,
  cancelBtnTextId,
  callback,
  mainColorOkBtn
) => {
  okBtnTextId = !okBtnTextId ? "OK" : okBtnTextId;

  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };
  const handleOK = e => {
    callback();
    handleClose();
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="twobtn_wrapper">
        <div className="title__two_msg">
          <FormattedMessage id={titleId} values={titleValues} />
        </div>
        <div className="message">
          <FormattedMessage id={msgId} />
        </div>
        <div className="two_btns">
          <button
            type="button"
            className="two_btn"
            id={mainColorOkBtn ? "two_btn_main_color" : "two_btn_ok"}
            onClick={handleOK}
          >
            <FormattedMessage id={okBtnTextId} />
          </button>
          <button
            type="button"
            className="two_btn"
            id="two_btn_cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={cancelBtnTextId} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showDeviceTest = (callback, mediaDivice) => {
  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  const changeDevice = (type, value) => {
    callback(type, value);
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="onebtn_wrapper">
        <p className="closeBtn" onClick={handleClose} />
        <div className="title">
          <FormattedMessage id={"TEST_DEVICE_CHANGE_TITLE"} />
        </div>
        <div>
          Camera :
          {mediaDivice.video ? (
            <React.Fragment>
              <select
                onChange={e => {
                  changeDevice("video", e.target.value);
                }}
              >
                {mediaDivice.video.map((data, index) => {
                  return <option value={data.id}>{data.label}</option>;
                })}
              </select>
            </React.Fragment>
          ) : (
            <FormattedMessage id={"ID_ALERT_MANAGE_REPORT_DEVICE_ERROR"} />
          )}
        </div>
        <div>
          Audio input :
          {mediaDivice.audio.input ? (
            <React.Fragment>
              <select
                onChange={e => {
                  changeDevice("audioInput", e.target.value);
                }}
              >
                {mediaDivice.audio.input.map((data, index) => {
                  return <option value={data.id}>{data.label}</option>;
                })}
              </select>
            </React.Fragment>
          ) : (
            <FormattedMessage id={"ID_ALERT_MANAGE_REPORT_DEVICE_ERROR"} />
          )}
        </div>
        <div>
          Audio Output :
          {mediaDivice.audio.output ? (
            <React.Fragment>
              <select
                onChange={e => {
                  changeDevice("audioOutput", e.target.value);
                }}
              >
                {mediaDivice.audio.output.map((data, index) => {
                  return (
                    <option key={index} value={data.id}>
                      {data.label}
                    </option>
                  );
                })}
              </select>
            </React.Fragment>
          ) : (
            <FormattedMessage id={"ID_ALERT_MANAGE_REPORT_DEVICE_ERROR"} />
          )}
        </div>
        <button className="okBtn" type="button" onClick={handleClose}>
          <FormattedMessage id={"ID_WIZLIVE_EXIT"} />
        </button>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showTwoBtnAlertWithTextarea = (
  titleId,
  titleValues,
  placeholderId,
  placeholderValues,
  okBtnTextId,
  cancelBtnTextId,
  callback
) => {
  var message = "";
  const onChangeMessage = e => {
    message = e.target.value;
  };
  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };
  const handleOK = e => {
    handleClose();
    callback(message);
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="twobtn_wrapper">
        <div className="title__two_msg">
          <FormattedMessage id={titleId} values={titleValues} />
        </div>
        <div className="textarea">
          <FormattedMessage id={placeholderId} values={placeholderValues}>
            {placeholder => (
              <textarea placeholder={placeholder} onChange={onChangeMessage} />
            )}
          </FormattedMessage>
        </div>
        <div className="two_btns">
          <button
            type="button"
            className="two_btn"
            id="two_btn_main_color"
            onClick={handleOK}
          >
            <FormattedMessage id={okBtnTextId} />
          </button>
          <button
            type="button"
            className="two_btn"
            id="two_btn_cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={cancelBtnTextId} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showTwoBtnAlertWithKeyValueMsg = (
  msgId,
  okBtnTextId,
  cancelBtnTextId,
  msg,
  callback,
  mainColorOkBtn
) => {
  okBtnTextId = !okBtnTextId ? "OK" : okBtnTextId;

  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };
  const handleOK = e => {
    callback();
    handleClose();
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="twobtn_wrapper">
        <div className="message_kv">
          <FormattedMessage id={msgId} />
          <div className="message__holder">
            {Object.keys(msg).map((key, index) => {
              return (
                <div key={index} className="message__holder__kv__row">
                  <div className="message__holder__key">{key}</div>
                  <div className="message__holder__value">{msg[key]}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="two_btns">
          <button
            type="button"
            className="two_btn"
            id={mainColorOkBtn ? "two_btn_main_color" : "two_btn_ok"}
            onClick={handleOK}
          >
            <FormattedMessage id={okBtnTextId} />
          </button>
          <button
            type="button"
            className="two_btn"
            id="two_btn_cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={cancelBtnTextId} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showTwoBtnAlertWithCheckBox = (
  titleId,
  okBtnTextId,
  cancelBtnTextId,
  checkBoxTextId,
  mainColorOkBtn,
  callback,
  msgId
) => {
  okBtnTextId = !okBtnTextId ? "OK" : okBtnTextId;
  let checkBoxValue = true;

  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  const handleOK = e => {
    handleClose();
    callback(checkBoxValue);
  };

  const handleCheckBox = e => {
    checkBoxValue = !checkBoxValue;
  };

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="twobtn_wrapper">
        <div className="title">
          <FormattedMessage id={titleId} />
        </div>
        {msgId && (
          <div className="message">
            <FormattedMessage id={msgId} />
          </div>
        )}

        <label className="checkbox_wrapper">
          <input
            className="twobtn_checkbox"
            type="checkbox"
            name="checkbox"
            onChange={handleCheckBox}
            value={checkBoxValue}
            defaultChecked={checkBoxValue}
          />
          <span className="twobtn_checkbox__mark" />
          <FormattedMessage id={checkBoxTextId} />
        </label>

        <div className="two_btns">
          <button
            type="button"
            className="two_btn"
            id={mainColorOkBtn ? "two_btn_main_color" : "two_btn_ok"}
            onClick={handleOK}
          >
            <FormattedMessage id={okBtnTextId} />
          </button>
          <button
            type="button"
            className="two_btn"
            id="two_btn_cancel"
            onClick={handleClose}
          >
            <FormattedMessage id={cancelBtnTextId} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};

export const showFreeTrialSubmitPopup = callback => {
  const handleClose = e => {
    const empty = React.createElement("div");
    ReactDOM.render(empty, document.getElementById("alert"));
  };

  let handleOK = handleClose;
  if (callback) {
    handleOK = e => {
      callback();
      handleClose();
    };
  }

  const element = React.createElement(
    "div",
    {
      id: "wizAlert"
    },
    <React.Fragment>
      <div className="overlay" onClick={handleClose} />
      <div className="onebtn_wrapper">
        <p className="closeBtn" onClick={handleClose} />
        <div className="title">
          <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_SUBMIT_TITLE"} />
        </div>
        <div className="freeTiralMessage">
          <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_SUBMIT_DESCRIPTION"} />
        </div>
        <div className="contact">
          <p className="callImage" />
          <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_SUBMIT_CONTANT"} />
        </div>
        <button className="okBtn" type="button" onClick={handleOK}>
          <FormattedMessage id={"ID_FREE_TRIAL_SURVEY_SUBMIT_OK"} />
        </button>
      </div>
    </React.Fragment>
  );

  ReactDOM.render(
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      {element}
    </IntlProvider>,
    document.getElementById("alert")
  );
};
