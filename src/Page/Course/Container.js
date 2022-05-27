import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "./View";
import {accountActivateCheckout} from "../../Common/Util/HTTPRequest"


import SignUp from "../../Common/Component/SignUp";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";


class Container extends Component {
  constructor(props) {
    super(props);
    try {
      if (props.history.location.pathname === "/codingparty") {
        props.history.replace("/");
      }
    } catch (e) {}
  }

  render() {
    return <View />;
  }
}

export default connect(
  (state) => ({
    userId: state.userinfo.id,
  }),
  {}
)(withRouter(Container));
