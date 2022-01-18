import React, { Component } from "react";
import { connect } from "react-redux";
import generatePreloadPage from "../../utils/preloadPageGenerator";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { iframeSrcDoc: null };
    this.timer = undefined;
  }
  componentDidMount() {
    this.preload();
  }
  componentDidUpdate() {
    this.preload();
  }
  shouldComponentUpdate(nextProps, nextState) {
    // check srcDoc change
    if (this.state.iframeSrcDoc !== nextState.iframeSrcDoc) {
      return true;
    }

    // check sprites change
    const oldScene = this.props.scene;
    let oldSprites = [];
    for (let i in oldScene.scenes) {
      const spriteIds = oldScene.scenes[i].spriteIds;
      for (let j in spriteIds) {
        if (oldSprites.indexOf(spriteIds[j]) < 0) {
          oldSprites.push(spriteIds[j]);
        }
      }
    }
    const newScene = nextProps.scene;
    for (let i in newScene.scenes) {
      const spriteIds = newScene.scenes[i].spriteIds;
      for (let j in spriteIds) {
        if (oldSprites.indexOf(spriteIds[j]) < 0) {
          return true;
        }
      }
    }

    // check sounds change
    for (let i in newScene.soundIds) {
      if (oldScene.soundIds.indexOf(newScene.soundIds[i]) < 0) {
        return true;
      }
    }

    return false;
  }

  preload = async () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      const { scene } = this.props;
      const { scenes, sceneIds, soundIds } = scene;
      const state = {
        scene: {
          scenes,
          sceneIds,
          soundIds
        }
      };
      const page = await generatePreloadPage(state, true);
      if (this.state.iframeSrcDoc !== page) {
        this.setState({ iframeSrcDoc: page });
      }
    }, 1000);
  };

  render() {
    const { iframeSrcDoc } = this.state;
    return (
      <div className="preload">
        {iframeSrcDoc && (
          <iframe
            title="wizlab"
            srcDoc={iframeSrcDoc}
            onLoad={() => {
              // if (this.props.editor && !this.props.isPlaying) {
              //   this.props.editor.focus();
              // }
            }}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    scene: state.scene,
    isPlaying: state.preview.isPlaying
  }),
  {}
)(Container);
