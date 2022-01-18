import React from "react";

import { Provider } from "react-redux";
import store from "../../Store";

import Container from "./Container";
import UserInfo from "../../Component/UserInfo";

const WizAppMode = (props) => {
  return (
    <Provider store={store}>
      <UserInfo>
        <Container {...props} />
      </UserInfo>
    </Provider>
  );
};

export default WizAppMode;
