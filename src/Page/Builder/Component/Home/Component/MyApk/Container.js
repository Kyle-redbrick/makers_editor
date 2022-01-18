import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";

class Container extends Component {
  render() {
    return <View email={this.props.email} />;
  }
}
export default connect(
  state => ({ email: state.userinfo.email }),
  {}
)(Container);
