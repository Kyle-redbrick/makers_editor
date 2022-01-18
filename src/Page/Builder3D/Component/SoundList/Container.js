import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
import * as builderActions from "../../Store/Reducer/builder";
import * as interactionActions from "../../Store/Reducer/interaction";
import * as contextMenuActions from "../../Store/Reducer/contextMenu";
import AssetLibrary from "../../../Builder/utils/assetLibrary";
import View from "./View";

import deleteIcon from "../../../../Image/builder3d/icon-30-right-click-delete.svg";

function Container(props) {
  const container = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickObjectList = () => {
    if (props.jukebox.isPlaying) {
      props.stopSound();
    }
    props.setIsSoundBoxOn(false);
    props.setShowSounds(false);
  };

  const onClickSound = soundId => {
    if (props.jukebox.isPlaying && props.jukebox.id === soundId) {
      props.stopSound();
    } else {
      const sound = AssetLibrary.getSoundAsset(soundId);
      props.playSound(sound.id, sound.path, sound.type);
    }
  };

  const onClickAddSound = () => {
    const { currentSceneId, setIsSoundBoxOn } = props;

    if (!currentSceneId) {
      alert("먼저 씬을 추가해 주세요.");
      return;
    }

    setIsSoundBoxOn(true);
  };

  const onRightClickSound = (soundId, e) => {
    const menus = getContextMenus(soundId);
    const position = { x: e.clientX, y: e.clientY };
    props.showContextMenu(menus, position);
  };

  const getContextMenus = soundId => {
    const menus = [
      {
        img: deleteIcon,
        name: "삭제",
        onClick: () => onClickRemove(soundId)
      }
    ];
    return menus;
  };

  const onClickRemove = soundId => {
    props.removeSound(props.currentSceneId, soundId);
  };

  const handleClickOutside = e => {
    if (!container.current || container.current.contains(e.target)) {
      return;
    }
    if (props.jukebox.isPlaying) {
      props.stopSound();
    }
  };

  return (
    <View
      containerRef={container}
      assetLibrary={AssetLibrary}
      onClickObjectList={onClickObjectList}
      soundIds={props.soundIds}
      onClickSound={onClickSound}
      onClickAdd={onClickAddSound}
      onRightClick={onRightClickSound}
      onClickRemove={onClickRemove}
      jukebox={props.jukebox}
    />
  );
}

export default connect(
  state => {
    const { isSoundsShowing } = state.builder;
    const { scenes } = state.game;
    const { currentSceneId, jukebox } = state.interaction;
    const currentScene = currentSceneId ? scenes[currentSceneId] : null;
    let soundIds = currentScene ? currentScene.soundIds : [];
    soundIds = soundIds ? soundIds : [];
    return {
      isSoundsShowing,
      scenes,
      soundIds,
      currentSceneId,
      jukebox
    };
  },
  {
    playSound: interactionActions.playSound,
    stopSound: interactionActions.stopSound,
    removeSound: gameActions.removeSound,
    setShowSounds: builderActions.setShowSounds,
    setIsSoundBoxOn: builderActions.setIsSoundBoxOn,
    showContextMenu: contextMenuActions.showContextMenu
  }
)(Container);
