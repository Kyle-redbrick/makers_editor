import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.scss";

class ArticleDetail extends Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {}

  render() {
    return <div className="articledetail" />;
  }
}

export default connect(state => ({ email: state.userinfo.email }))(
  ArticleDetail
);
