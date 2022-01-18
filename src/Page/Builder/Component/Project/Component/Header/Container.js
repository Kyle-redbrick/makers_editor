import React, { Component } from "react";
import View from "./View";

export default class Container extends Component {
  render() {
    const { canClose, closeProjectPopup } = this.props;
    return <View canClose={canClose} closeProjectPopup={closeProjectPopup} />;
  }
}
