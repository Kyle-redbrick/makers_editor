import React from "react";
import PopUp, { showPopUp } from "../PopUp";
import { injectIntl } from "react-intl";
import * as request from "../../Util/HTTPRequest";

import checkIcon from '../../../Image/dreamclass/image-confirmation-check.svg';
import warningIcon from '../../../Image/dreamclass/image-warning-alert.svg';

const Report = props => {
  const { email, target, dismiss } = props;
  return (
    <PopUp.OneInput
      image={warningIcon}
      title={props.intl.formatMessage({
        id: "ID_REPORT_TITLE"
      })}
      placeholder={props.intl.formatMessage({
        id: "ID_REPORT_PLACEHOLDER"
      })}
      buttonName={props.intl.formatMessage({
        id: "ID_REPORT_BUTTON__01"
      })}
      buttonAction={msg => {
        if (!msg) {
          showPopUp(
            <PopUp.OneButton
              title={props.intl.formatMessage({
                id: "ID_REPORT_POPUP_EMPTY_TEXT"
              })}
              buttonName={props.intl.formatMessage({
                id: "ID_REPORT_POPUP_SUCCESS_CONFIRM"
              })}
            />,
            { darkmode: true }
          );
          return;
        }
        request
          .postReport({
            email,
            message: msg,
            target
          })
          .then(res =>
            res.json().then(json => {
              if (json.success) {
                showPopUp(
                  <PopUp.OneButton
                    image={checkIcon}
                    title={props.intl.formatMessage({
                      id: "ID_REPORT_POPUP_SUCCESS_TITLE"
                    })}
                    buttonName={props.intl.formatMessage({
                      id: "ID_REPORT_POPUP_SUCCESS_CONFIRM"
                    })}
                  />,
                  { darkmode: true }
                );
              } else {
                showPopUp(
                  <PopUp.OneButton
                    title={props.intl.formatMessage({
                      id: "ID_REPORT_POPUP_FAIL_TITLE"
                    })}
                    subtitle={props.intl.formatMessage({
                      id: "ID_REPORT_POPUP_FAIL_MSG"
                    })}
                    buttonName={props.intl.formatMessage({
                      id: "ID_REPORT_POPUP_FAIL_CONFIRM"
                    })}
                  />,
                  { darkmode: true }
                );
              }
            })
          );
      }}
      enterToConfirm={false}
      dismiss={dismiss}
    />
  );
};

export default injectIntl(Report);
