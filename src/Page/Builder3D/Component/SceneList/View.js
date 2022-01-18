import React from "react";
import "./index.scss";

import addAssetIcon from "../../../../Image/builder3d/add-sound-asset.svg";

export default function(props) {
  const {
    scenes,
    sceneIds,
    currentSceneId,
    startSceneId,
    onClickScene,
    onClickAddScene,
    onBlurSceneNameInput,
    onRightClickScene
  } = props;
  // startSceneId
  // const isStartScene = scene.id === startSceneId;
  return (
    <div className="sceneList">
      <div className="sceneList_scenes">
        {sceneIds.map(sceneId => {
          const scene = scenes[sceneId];
          const isCurrentScene = sceneId === currentSceneId;
          return (
            <div
              key={sceneId}
              className={`sceneList_scene${
                isCurrentScene ? " sceneList_scene-current" : ""
              } ${scene.id === startSceneId ? "sceneList_startScene" : ""}`}
              onClick={() => {
                onClickScene(scene);
              }}
              onContextMenu={e => {
                e.preventDefault();
                onRightClickScene(scene, e);
              }}
            >
              <div className="sceneList_scene_thumbnail">
                {scene.thumbnail && (
                  <img src={scene.thumbnail} alt="sceneThumbnail" />
                )}
              </div>
              <input
                className="sceneList_scene_nameInput"
                defaultValue={scene.name}
                onBlur={e => {
                  onBlurSceneNameInput(scene, e.currentTarget);
                }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    const target = e.currentTarget;
                    setTimeout(target.blur.bind(target), 1);
                  }
                }}
              />
            </div>
          );
        })}
        <div className="sceneList_addBtn" onClick={onClickAddScene}>
          <img src={addAssetIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
