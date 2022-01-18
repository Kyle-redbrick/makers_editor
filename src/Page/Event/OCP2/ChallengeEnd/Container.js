import React, { Component } from "react";
import View from "./View";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

class Container extends Component {
  render() {
    return <View />;
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Container));
