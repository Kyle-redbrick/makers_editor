import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

class Container extends Component {

  render() {

    return (
      <View />
    );
  }
}

export default withRouter(Container);