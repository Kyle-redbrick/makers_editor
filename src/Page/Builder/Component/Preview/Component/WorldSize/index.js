import React, { Component } from "react";
import { connect } from "react-redux";
import { WORLD } from "../../../../../../Common/Util/Constant";
import * as sceneActions from "../../../../Store/Reducer/scene";
import "./index.scss";

class WorldSize extends Component {
  constructor(props) {
    super(props);
    const {
      worldWidth = WORLD.DEFAULT_WIDTH,
      worldHeight = WORLD.DEFAULT_HEIGHT
    } = props.currentScene || {};
    this.enabled = ["het@wizschool.io", "chris@wizschool.io"].includes(
      props.email
    );
    this.state = { worldWidth, worldHeight };
  }
  componentDidMount() {
    this.onChangeScreenMode();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentSceneId === this.props.currentSceneId) {
      if (
        prevProps.currentScene.worldWidth !==
          this.props.currentScene.worldWidth ||
        prevProps.currentScene.worldHeight !==
          this.props.currentScene.worldHeight
      ) {
        this.onChangeWorldSize();
      }
    } else {
      this.onChangeCurrentScene();
    }
    if (prevProps.screenMode !== this.props.screenMode) {
      this.onChangeScreenMode();
    }
  }
  onChangeWorldSize = () => {
    const { currentScene } = this.props;
    if (currentScene) {
      const { worldWidth, worldHeight } = currentScene;
      this.setState({ worldWidth, worldHeight });
    }
  };
  onChangeCurrentScene = () => {
    const { currentScene } = this.props;
    if (currentScene) {
      const { worldWidth, worldHeight } = currentScene;
      this.setState({ worldWidth, worldHeight });
    }
  };
  onChangeScreenMode = () => {
    const { scenes, screenMode, setWorldSize } = this.props;
    const isHorizontal = screenMode === "HORIZONTAL";
    const worldWidth = isHorizontal
      ? WORLD.DEFAULT_WIDTH
      : WORLD.DEFAULT_HEIGHT;
    const worldHeight = isHorizontal
      ? WORLD.DEFAULT_HEIGHT
      : WORLD.DEFAULT_WIDTH;
    for (let sceneId in scenes) {
      setWorldSize(sceneId, worldWidth, worldHeight);
    }
  };

  onChangeInput = e => {
    const { id, value } = e.currentTarget;
    this.setState({ [id]: value });
  };
  onBlurInput = e => {
    const { currentSceneId, setWorldSize } = this.props;
    const { worldWidth, worldHeight } = this.state;
    setWorldSize(currentSceneId, worldWidth, worldHeight);
  };
  onKeyDown = e => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  render() {
    const { worldWidth, worldHeight } = this.state;
    if (this.enabled) {
      return (
        <div className="preview_worldSize">
          <div className="preview_worldSize_size preview_worldSize_size-width">
            W
            <input
              id="worldWidth"
              type="number"
              value={worldWidth}
              onChange={this.onChangeInput}
              onBlur={this.onBlurInput}
              onKeyDown={this.onKeyDown}
            />
          </div>
          <div className="preview_worldSize_size preview_worldSize_size-height">
            H
            <input
              id="worldHeight"
              type="number"
              value={worldHeight}
              onChange={this.onChangeInput}
              onBlur={this.onBlurInput}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
}

export default connect(
  state => {
    const { scenes } = state.scene;
    const currentSceneId = state.interaction.selected.scene;
    const currentScene = scenes[currentSceneId];
    const { screenMode } = state.preview;
    const email = state.userinfo.email;
    return { scenes, currentSceneId, currentScene, screenMode, email };
  },
  { setWorldSize: sceneActions.setWorldSize }
)(WorldSize);
