import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

function Container(props) {

  return (
    <View/>
  );
}
export default Container
// export default connect(
//   state => ({
//     email: state.userinfo.email
//   }), {})(Container);
