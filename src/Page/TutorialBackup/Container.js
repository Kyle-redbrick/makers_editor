import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../Common/Util/HTTPRequest";
class Container extends Component {
  constructor(props) {
    super(props);
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    this.state = {
      beginner: undefined,
      intermediate: undefined,
      advanced: undefined
    };
  }
  //TODO : 튜토리얼에서 왜 ocp 사용하지?
  componentDidMount = () => {
    this.getMyOcp();
  };

  getMyOcp = async () => {
    if (this.props.userinfo.email || this.guest) {
      let res = await request.getMyOcp(
        this.props.userinfo.email
          ? { email: this.props.userinfo.email }
          : { guestId: this.guest && this.guest.id }
      );
      let json = await res.json();
      if (json) {
        let data = {};
        json.forEach(element => {
          data[element.grade] = element.level;
        });
        this.setState({
          beginner: Number(data.beginner),
          intermediate: Number(data.intermediate),
          advanced: Number(data.advanced)
        });
      }
    }
  };

  render() {
    const { intl } = this.props;
    const { beginner, intermediate, advanced } = this.state;
    return (
      <View
        intl={intl}
        beginner={beginner}
        intermediate={intermediate}
        advanced={advanced}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Container));
