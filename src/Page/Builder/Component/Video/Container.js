import React, { Component } from "react";
import { connect } from "react-redux";
import RndWrapper from "../../utils/RndWrapper";
import { DEFAULT_VIDEO_URL } from "../../../../Common/Util/Constant";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    // this.videoURL = this.props.videoURL
    //   ? this.props.videoURL
    //   : DEFAULT_VIDEO_URL;
    this.videoRef = React.createRef();
  }

  render() {
    const {
      handleSelectTab,
      handleChangeZIndex,
      zIndex,
      isOn,
      videoURL
    } = this.props;
    const { videoRef } = this;
    if (!isOn) {
      return <div />;
    }
    return (
      <RndWrapper
        id="video"
        style={{ zIndex }}
        defaultWidth={492}
        defaultHeight={(492 * 9) / 16 + 35}
        defaultX={document.body.clientWidth - 570}
        defaultY={16}
        minWidth={450}
        minHeight={(450 * 9) / 16 + 35}
        lockAspectRatio={16 / 9}
        lockAspectRatioExtraHeight={35}
      >
        <View
          handleSelectTab={handleSelectTab}
          handleChangeZIndex={handleChangeZIndex}
          videoURL={videoURL ? videoURL : DEFAULT_VIDEO_URL}
          videoRef={videoRef}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    videoURL: state.video.videoURL
  }),
  {}
)(Container);
