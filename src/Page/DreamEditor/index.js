import React from "react";
import { Provider } from "react-redux";
import store from "../../Common/Store";
import UserInfo from "../../Common/Component/UserInfo";
import Container from "./Container";

export default function(props) {
  return (
    <Provider store={store}>
      <UserInfo>
        <Container {...props} />
      </UserInfo>
    </Provider>
  );
}
