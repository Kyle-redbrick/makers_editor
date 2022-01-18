import React from "react";
import { Provider } from "react-redux";
import store from "../../Common/Store";
import Container from "./Container";

export default function(props) {
  return (
    <Provider store={store}>
      <Container {...props} />
    </Provider>
  );
}
