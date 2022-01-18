import React, { Component } from "react";
import View from "./View";

/* this container is not used */
export default class Container extends Component {
  render() {
    const { category, handleSelectCategory } = this.props;
    return (
      <View category={category} handleSelectCategory={handleSelectCategory} />
    );
  }
}
