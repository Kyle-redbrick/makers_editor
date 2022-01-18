import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as previewActions from "../../Store/Reducer/preview";
import * as webrtcActions from "../../Store/Reducer/webrtc";
import View from "./View";

class Container extends Component {
  toggleFullScreen = event => {
    let element = document.body;

    if (event instanceof HTMLElement) {
      element = event;
    }

    let isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function() {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function() {
        return false;
      };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  render() {
    const { toggleFullScreen } = this;
    const {
      setIsPlaying,
      intl,
      setLog,
      email,
      currentUser,
      pageType
    } = this.props;
    return (
      <View
        setIsPlaying={setIsPlaying}
        setLog={setLog}
        intl={intl}
        toggleFullScreen={toggleFullScreen}
        email={email}
        currentUser={currentUser}
        pageType={pageType}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email,
    currentUser: state.tabs.currentUser
  }),
  {
    setIsPlaying: previewActions.setIsPlaying,
    setLog: webrtcActions.setLog
  }
)(injectIntl(Container));
