import { Component } from "react";
import * as request from "../../Util/HTTPRequest";
import { connect } from "react-redux";

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    const { email } = this.props;
    const params = { email, error, info };
    request.sendWizLabReport({
      payload: JSON.stringify(params)
    });
  }
  render() {
    return this.props.children;
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(ErrorBoundary);
