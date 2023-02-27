import React from "react";
import moment from "moment";
import { IntlProvider } from "react-intl";
import locale from "../../locale";
import PopUp, { showPopUp } from "../Component/PopUp";

const CheckBlockedUser = (userinfo) => {
  if (userinfo && userinfo.blocked) {
    const endDate = moment(userinfo.blocked.endDate, "YYYY-MM-DD");
    let lang = localStorage.getItem("lang");

    const intlProvider = new IntlProvider({
      locale: lang,
      messages: locale[lang],
    });
    const { intl } = intlProvider.getChildContext();

    showPopUp(
      <PopUp.OneButton
        title={intl.formatMessage({
          id: "ID_BLOCKED_USER_POPUP_TITLE_SOCIAL",
        })}
        subtitle={intl.formatMessage(
          { id: "ID_BLOCKED_USER_POPUP_PERIOD" },
          {
            year: `${endDate.year()}`,
            month: `${endDate.month() + 1}`,
            day: `${endDate.date()}`,
          }
        )}
        buttonName={intl.formatMessage({
          id: "ID_BLOCKED_USER_POPUP_CONFRIM",
        })}
      />,
      { darkmode: true }
    );
    return true;
  }
  return false;
};
export default CheckBlockedUser;
