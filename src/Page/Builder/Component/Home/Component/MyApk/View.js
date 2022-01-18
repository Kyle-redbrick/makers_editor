import React from "react";
import "./index.scss";
import MyAPK from "../../../../../MyAPK";
import { injectIntl } from "react-intl";

function View(props) {
  const { email, intl } = props;
  return (
    <div className="builder--home__myApk">
      <p className="myApk__title">{intl.formatMessage({ id: "ID_BUILDER_MAIN_MYAPK" })}</p>
      {email ? (
        <MyAPK isFromBuilder={true} />
      ) : (
        <div className="no__Items">{intl.formatMessage({ id: "ID_BUILDER_MAIN_MYAPK_LOGIN_MESSAGE" })}</div>
      )}
    </div>
  );
}
export default injectIntl(View);