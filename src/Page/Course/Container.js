import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import View from "./View";

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
