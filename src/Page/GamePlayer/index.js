import React from "react";
import { Provider } from "react-redux";
import store from "../../Common/Store";
import Container from "./Container";

import "./index.scss";

const GamePlayer = props => {
  return (
    <div className={`Page--GamePlayer`}>
      <Provider store={store}>
        <Container {...props} />
      </Provider>
    </div>
  );
};
export default GamePlayer;
