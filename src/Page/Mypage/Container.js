import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "publish" //publish, subscribe, interested
    };

    if(props.match.path === "/mypage") {
      this.isMyPage = true;
      if(!props.userinfo) {
        props.history.replace("/");
        return;
      }
      this.state.email = props.userinfo.email;
    }else {
      this.isMyPage = false;
      this.userId = Number(props.match.params.id);
      if(this.userId === props.userinfo.id) {
        // props.history.replace(`/mypage`);
      }
    }
  }

  componentDidMount() {
    if(!this.isMyPage) {
      request.userEmailById({id: this.userId})
        .then(res=>res.json())
        .then(json=>this.setState({email: json.email}))
        .catch(e=>console.error(e))
    }
  }

  handleSelectTab = tab => {
    if (tab !== this.state.selectedTab) {
      this.setState({ selectedTab: tab });
    }
  };

  render() {
    const {
      selectedTab,
      email
    } = this.state;
    const {
      handleSelectTab,
      isMyPage,
    } = this;

    if(!email) {
      return <div></div> //TODO : loading
    }
    return (
      <View
        isMyPage={isMyPage}
        email={email}
        selectedTab={selectedTab}
        handleSelectTab={handleSelectTab}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(withRouter(Container)));
