import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChange: 1
    }
  }

  onChangeClick = (index) => {
    this.setState({ isChange : index });
  }

  render() {
    const { onChangeClick } = this;
    const { isChange } = this.state;

    return (
      <View
        isChange={isChange}
        onChangeClick={onChangeClick}
      />
    );
  }
}

export default withRouter(Container);