import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";

import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import * as previewActions from "../../Store/Reducer/preview";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    const defaultSize = this.getDefaultRndSize();
    this.state = { ...defaultSize };
  }

  getDefaultRndSize() {
    const isHorizontal = this.props.screenMode === "HORIZONTAL";
    const w = 16 * 30;
    const h = 9 * 30;
    const offset = 150;
    const headerHight = 35;

    const width = isHorizontal ? w : h;
    const height = isHorizontal ? h + headerHight : w + headerHight;
    const minWidth = isHorizontal ? width : 0;
    const minHeight = isHorizontal ? 0 : height;
    const lockAspectRatio = isHorizontal ? w / h : h / w;
    const lockAspectRatioExtraHeight = headerHight;
    const x = document.body.clientWidth - width - offset;
    const y = document.body.clientHeight - height - offset;

    return {
      width,
      height,
      x,
      y,
      minWidth,
      minHeight,
      lockAspectRatio,
      lockAspectRatioExtraHeight
    };
  }

  handleChangeScreenMode = () => {
    TrackingUtil.sendGAEvent({
      category: "Builder",
      action: `RotatePreview`
    });
    const targetMode =
      this.props.screenMode === "VERTICAL" ? "HORIZONTAL" : "VERTICAL";
    this.props.setScreenMode(targetMode);
  };

  componentDidUpdate(prevProps) {
    if (this.props.screenMode !== prevProps.screenMode) {
      const defaultSize = this.getDefaultRndSize();
      this.setState({ ...defaultSize });
    }
  }

  onResize = e => {
    if (this.previewCanvasRef) {
      this.previewCanvasRef.onResize(e);
    }
  };
  setPreivewCanvasRef = ref => {
    this.previewCanvasRef = ref;
  };

  render() {
    const {
      screenMode,
      handleChangeZIndex,
      zIndex,
      handleSelectTab,
      selectedSceneId,
      selectedScene,
      intl,
      fixed
    } = this.props;
    const { handleChangeScreenMode, setPreivewCanvasRef } = this;
    const preview = (
      <View
        screenMode={screenMode}
        handleChangeZIndex={handleChangeZIndex}
        handleSelectTab={handleSelectTab}
        handleChangeScreenMode={handleChangeScreenMode}
        selectedSceneId={selectedSceneId}
        selectedScene={selectedScene}
        setPreivewCanvasRef={setPreivewCanvasRef}
        intl={intl}
        fixed={fixed}
      />
    );

    if (fixed) {
      return preview;
    }

    return (
      <RndWrapper
        id="preview"
        style={{ zIndex }}
        defaultWidth={this.state.width}
        defaultHeight={this.state.height}
        defaultX={this.state.x}
        defaultY={this.state.y}
        minWidth={this.state.minWidth}
        minHeight={this.state.minHeight}
        lockAspectRatio={this.state.lockAspectRatio}
        lockAspectRatioExtraHeight={this.state.lockAspectRatioExtraHeight}
        screenMode={this.props.screenMode}
        onResize={this.onResize}
      >
        {preview}
      </RndWrapper>
    );
  }
}

export default connect(
  state => {
    const { screenMode } = state.preview;
    const selectedSceneId = state.interaction.selected.scene;
    const selectedScene = state.scene.scenes[selectedSceneId];
    return { screenMode, selectedSceneId, selectedScene };
  },
  {
    setIsPlaying: previewActions.setIsPlaying,
    setScreenMode: previewActions.setScreenMode
  }
)(injectIntl(Container));
