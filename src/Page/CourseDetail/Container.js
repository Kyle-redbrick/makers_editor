import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import View from "./View";

class Container extends Component {
  // constructor(props) {
  //   super(props);
  //   const courseId = props.match.params.id;
  //   console.log("courseId:", courseId);
  // }

  render() {
    return <View courseId={this.props.match.params.id} />;
  }
}

export default withRouter(Container);
