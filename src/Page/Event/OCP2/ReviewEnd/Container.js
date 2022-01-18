import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";

class Container extends Component {
  render() {
    return <View />;
  }
}
export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {}
)(Container);
