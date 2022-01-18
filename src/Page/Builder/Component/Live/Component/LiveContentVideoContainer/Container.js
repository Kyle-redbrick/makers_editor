import React, { Component } from "react";
import View from "./View";

class Container extends Component {
  render() {
    return <View {...this.props} />;
  }
}

export default Container;
