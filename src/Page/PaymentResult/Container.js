import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as userInfoActions from "../../Common/Store/Reducer/UserInfo";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = { ticketHistories: [] };
  }
  componentDidMount = () => {
    if (!this.props.email) {
      this.props.history.push("/");
      return;
    }
    this.fetchTicketHistory();
  };

  componentDidUpdate = prevProps => {
    if (this.props.email && !prevProps.email) {
      this.onLogin();
    }
    if (!this.props.email) {
      this.onLogout();
    }
  };
  onLogin = () => {
    this.fetchTicketHistory();
  };

  onLogout = () => {
    this.props.history.push("/");
  };

  fetchTicketHistory = async () => {
    let res = await request.apkHistory({ userId: this.props.userinfo.id });
    let fetchedData = await res.json();
    if (!fetchedData) {
      return;
    }

    function compare(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }

    fetchedData.sort(compare);

    this.setState({
      ticketHistories: fetchedData
    });
  };
  onClickBuyTicket = () => {
    this.props.history.push("/payment");
  };

  onClickMyApkPage = () => {
    this.props.history.push("/myapk");
  };
  render() {
    const { onClickBuyTicket, onClickMyApkPage } = this;
    const { ticketHistories } = this.state;
    return (
      <View
        apkTicket={this.props.userinfo.apkTicket}
        onClickBuyTicket={onClickBuyTicket}
        ticketHistories={ticketHistories}
        intl={this.props.intl}
        onClickMyApkPage={onClickMyApkPage}
      />
    );
  }
}

export default connect(
  state => ({ email: state.userinfo.email, userinfo: state.userinfo }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(Container)));
