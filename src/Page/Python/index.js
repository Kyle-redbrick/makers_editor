import React from "react";
import { Provider } from "react-redux";
import store from "../Builder/Store";
import Container from "./Container";
import UserInfo from "../../Common/Component/UserInfo";

const PythonPage = (props) => {
  return (
    <Provider store={store}>
      <UserInfo>
        <Container {...props} />;
      </UserInfo>
    </Provider>
  );
};

export default PythonPage;
