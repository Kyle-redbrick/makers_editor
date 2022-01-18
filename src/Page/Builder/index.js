import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import Container from "./Container";
import UserInfo from "../../Common/Component/UserInfo";
import { loadColorTheme } from "./utils/colorThemeUtil";

export default function(props) {
  loadColorTheme();
  return (
    <Provider store={store}>
      <UserInfo>
        <Container location={props.match} history={props.history} />
      </UserInfo>
    </Provider>
  );
}
