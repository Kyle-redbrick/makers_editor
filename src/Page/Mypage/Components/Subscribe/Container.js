import React, { Component } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { withSubscribe } from "../../../../Common/Util/Subscribe";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const { targetEmail, mode } = this.props;
    await request
      .getSubscribesByType({ email: targetEmail, type: mode })
      .then(res => res.json())
      .then(json => {
        const users = json.map(user=>{
          return user.creator ? user.creator : user.user;
        })
        this.setState({ users });
      })
      .catch(e => console.error(e));
  }

  handleSubscribe = (targetEmail, isSubscribe) => {
    if (isSubscribe) {
      this.props.unsubscribe(targetEmail, () => this.updateSubscribeCount(targetEmail, -1));
    } else {
      this.props.subscribe(targetEmail, () => this.updateSubscribeCount(targetEmail, 1));
    }
  };

  updateSubscribeCount = (targetEmail, count) => {
    this.setState({
      users: this.state.users.map(user=>{
        if(targetEmail === user.email) {
          user.subscribeCount += count;
        }
        return user;
      })
    })
  }

  render() {
    const { users } = this.state;
    const { intl, mode, subscribeInfo } = this.props;
    const { handleSubscribe } = this;

    return (
      <View
        intl={intl}
        mode={mode}
        users={users}
        handleSubscribe={handleSubscribe}
        subscribeInfo={subscribeInfo}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(withRouter(withSubscribe(Container))));
