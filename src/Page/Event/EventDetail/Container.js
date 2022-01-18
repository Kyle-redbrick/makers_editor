import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as request from "../../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { event: undefined };
  }

  componentDidMount() {
    request.getDreamEvent({id: this.props.match.params.id})  
      .then(res=>res.json())
      .then(json=>this.setState({ event: json }))
      .catch(e=>console.error(e))
  }

  handleClickBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <View event={this.state.event} handleClickBack={this.handleClickBack} />
    );
  }
}

export default withRouter(Container);