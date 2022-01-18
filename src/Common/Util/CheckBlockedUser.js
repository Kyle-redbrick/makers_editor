import React from "react";
import moment from "moment";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import zh from "react-intl/locale-data/zh";
import locale from "../../locale";
import PopUp, { showPopUp } from "../Component/PopUp";

const CheckBlockedUser = userinfo => {
  if (userinfo && userinfo.blocked) {
    const endDate = moment(userinfo.blocked.endDate, "YYYY-MM-DD");
    let lang = localStorage.getItem("wizLang")
      ? localStorage.getItem("wizLang")
      : "en";
    const intlProvider = new IntlProvider({
      locale: lang,
      messages: locale[lang]
    });
    const { intl } = intlProvider.getChildContext();
    addLocaleData([...en, ...ko, ...zh]);

    showPopUp(
      <PopUp.OneButton
        title={intl.formatMessage({
          id: "ID_BLOCKED_USER_POPUP_TITLE_SOCIAL"
        })}
        subtitle={intl.formatMessage(
          { id: "ID_BLOCKED_USER_POPUP_PERIOD" },
          {
            year: `${endDate.year()}`,
            month: `${endDate.month() + 1}`,
            day: `${endDate.date()}`
          }
        )}
        buttonName={intl.formatMessage({
          id: "ID_BLOCKED_USER_POPUP_CONFRIM"
        })}
      />,
      { darkmode: true }
    );
    return true;
  }
  return false;
};
export default CheckBlockedUser;
