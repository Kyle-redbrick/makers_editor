import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <View/>
    );
  }
}
export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(Container);
