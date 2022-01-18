import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { unReadMsgCount: 0 };
  }
  componentDidUpdate() {
    let unReadMsgCount = 0;
    Object.keys(this.props.rooms).forEach(id => {
      unReadMsgCount += this.props.rooms[id].unReadMsgCount;
    });
    if (unReadMsgCount !== this.state.unReadMsgCount) {
      this.setState({ unReadMsgCount });
    }
  }

  render() {
    const { unReadMsgCount } = this.state;
    const {
      popupStates,
      handleSelectTab,
      handleChangeZIndex,
      pageType,
      liveProps,
      intl,
      editorMode,
      isTutor,
      isShowAnimationPopup,
      organization
    } = this.props;
    return (
      <View
        pageType={pageType}
        popupStates={popupStates}
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={handleChangeZIndex}
        liveProps={liveProps}
        unReadMsgCount={unReadMsgCount}
        intl={intl}
        editorMode={editorMode}
        isTutor={isTutor}
        isShowAnimationPopup={isShowAnimationPopup}
        organization={organization}
      />
    );
  }
}

export default connect(
  state => ({
    rooms: state.chat.rooms,
    selectedRoomId: state.chat.selectedRoomId,
    editorMode: state.scene.editorMode,
    organization: state.userinfo.organization
  }),
  {}
)(injectIntl(Container));
