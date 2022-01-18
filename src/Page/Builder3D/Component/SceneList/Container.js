import React, { Component } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
import * as contextMenuActions from "../../Store/Reducer/contextMenu";
import * as interactionActions from "../../Store/Reducer/interaction";
import { defaultScene } from "../../Util/Constant";
import {
  createDefaultSceneId,
  createDefaultSceneName,
  createCopiedSceneName
} from "../../Util/NameApis";
import View from "./View";

import copyIcon from "../../../../Image/builder3d/icon-30-right-click-duplicate.svg";
import deleteIcon from "../../../../Image/builder3d/icon-30-right-click-delete.svg";
import firstSceneIcon from "../../../../Image/builder3d/icon-30-right-click-first-scene.svg";

class Container extends Component {
  onClickScene = scene => {
    this.props.selectScene(scene.id);
  };

  onClickAddScene = () => {
    const { sceneIds } = this.props;
    if (sceneIds.length < 10) {
      this.addDefaultScene();
    } else {
      alert("더 이상 씬을 생성할 수 없어요..");
    }
  };
  addDefaultScene() {
    const { scenes, sceneIds } = this.props;
    const sceneId = createDefaultSceneId(sceneIds);
    const sceneNames = sceneIds.map(sceneId => scenes[sceneId].name);
    const sceneName = createDefaultSceneName(sceneNames);
    const scene = JSON.parse(JSON.stringify(defaultScene));
    scene.id = sceneId;
    scene.name = sceneName;
    this.props.addScene(scene);
    if (sceneIds.length < 1) {
      this.props.selectScene(sceneId);
      this.props.selectStartScene(sceneId);
    }
  }

  onBlurSceneNameInput = (scene, input) => {
    const sceneName = input.value.trim();
    if (this.checkSceneNameValid(sceneName)) {
      this.props.renameScene(scene.id, sceneName);
      input.value = sceneName;
    } else {
      input.value = scene.name;
    }
  };
  checkSceneNameValid(sceneName) {
    if (!sceneName || sceneName === "") {
      return false;
    }

    const maxSceneNameLength = 20;
    if (sceneName.length > maxSceneNameLength) {
      alert(`${maxSceneNameLength}자 이내로 입력해주세요!`);
      return false;
    }

    const { scenes, sceneIds, currentSceneId } = this.props;
    const sceneNames = sceneIds
      .filter(sceneId => sceneId !== currentSceneId)
      .map(sceneId => scenes[sceneId].name);
    if (sceneNames.includes(sceneName)) {
      alert("씬 이름은 중복해서 사용할 수 없어요!");
      return false;
    }

    return true;
  }

  onRightClickScene = (scene, e) => {
    const menus = this.getSceneContextMenus(scene);
    const position = { x: e.clientX, y: e.clientY };
    this.props.showContextMenu(menus, position);
  };
  getSceneContextMenus(scene) {
    const contextMenus = [
      {
        img: copyIcon,
        name: "복사",
        onClick: () => this.onClickCopyScene(scene)
      },
      {
        img: deleteIcon,
        name: "삭제",
        onClick: () => this.onClickRemoveScene(scene)
      }
    ];

    const { startSceneId } = this.props;
    const isStartScene = scene.id === startSceneId;
    if (!isStartScene) {
      contextMenus.splice(0, 0, {
        img: firstSceneIcon,
        name: "시작 장면 지정",
        onClick: () => this.onClickSetStartScene(scene)
      });
    }

    return contextMenus;
  }
  onClickSetStartScene = scene => {
    this.props.selectStartScene(scene.id);
  };
  onClickCopyScene = sceneToCopy => {
    const { scenes, sceneIds } = this.props;
    const sceneNames = sceneIds.map(sceneId => scenes[sceneId].name);
    const sceneId = createDefaultSceneId(sceneIds);
    const sceneName = createCopiedSceneName(sceneNames, sceneToCopy.name);
    const scene = JSON.parse(JSON.stringify(sceneToCopy));
    scene.id = sceneId;
    scene.name = sceneName;
    this.props.addScene(scene);
  };
  onClickRemoveScene = scene => {
    this.confirmRemoveScene(() => {
      const nextCurrentSceneId = this.getNextCurrentSceneId();
      this.props.selectScene(nextCurrentSceneId);
      if (scene.id === this.props.startSceneId) {
        this.props.selectStartScene(nextCurrentSceneId);
      }
      this.props.removeScene(scene.id);
    });
  };
  getNextCurrentSceneId() {
    const { sceneIds, currentSceneId } = this.props;
    const index = sceneIds.indexOf(currentSceneId);
    if (index === 0) {
      return sceneIds[1];
    } else if (index > 0) {
      return sceneIds[index - 1];
    } else {
      return null;
    }
  }
  confirmRemoveScene(onconfirm) {
    const didConfirm = window.confirm(
      "씬을 삭제하면 되돌릴 수 없어요! 정말 삭제할건가요?"
    );
    if (didConfirm) {
      if (onconfirm) {
        onconfirm();
      }
    }
  }

  render() {
    const { scenes, sceneIds, currentSceneId, startSceneId } = this.props;
    return (
      <View
        scenes={scenes}
        sceneIds={sceneIds}
        currentSceneId={currentSceneId}
        startSceneId={startSceneId}
        onClickScene={this.onClickScene}
        onClickAddScene={this.onClickAddScene}
        onBlurSceneNameInput={this.onBlurSceneNameInput}
        onRightClickScene={this.onRightClickScene}
      />
    );
  }
}

export default connect(
  state => {
    const { scenes, sceneIds, startSceneId } = state.game;
    const { currentSceneId } = state.interaction;
    return { scenes, sceneIds, currentSceneId, startSceneId };
  },
  {
    addScene: gameActions.addScene,
    removeScene: gameActions.removeScene,
    renameScene: gameActions.renameScene,
    selectStartScene: gameActions.selectStartScene,
    selectScene: interactionActions.selectScene,
    showContextMenu: contextMenuActions.showContextMenu
  }
)(Container);
