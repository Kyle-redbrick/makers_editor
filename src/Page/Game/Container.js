import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";
class Container extends Component {

  get pageType() {
    return this.props.match.params.type || "main";
  }

  render() {
    return <View pageType={this.pageType} />;
  }
}

export default withRouter(Container);
