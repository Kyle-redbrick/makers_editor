import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";

class Container extends Component {
  render() {
    return <View courseId={this.props.match && this.props.match.params.id}  {...this.props} />;
  }
}

export default connect(
  (state) => ({ email: state.userinfo.email, userId: state.userinfo.id }),
  {}
)(Container);
