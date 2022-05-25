import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";

function Container(props) {

  return (
    <View {...props}/>
  );
}
export default connect(
  state => ({
    userinfo: state.userinfo
  }), {})(Container);
