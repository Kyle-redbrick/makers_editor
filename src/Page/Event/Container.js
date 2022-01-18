import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    request.getDreamEvents()
      .then(res=>res.json())
      .then(json=>this.setState({ events: json.rows }))
      .catch(e=>console.error(e))
  }

  render() {
    const { events } = this.state;
    return (
      <View events={events} />
    );
  }
}
export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(Container);
