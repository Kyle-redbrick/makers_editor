import React from "react";
import Menu from "../Menu";
import SoundList from "../SoundList";
import SceneList from "../SceneList";
import ObjectList from "../ObjectList";
import "./index.scss";

import sceneIcon from "../../../../Image/builder3d/icon-32-scene-white.svg";
// import sceneOffIcon from "../../../../Image/builder3d/icon-32-scene-gray.svg";
import soundIcon from "../../../../Image/builder3d/icon-32-sound-white.svg";
// import soundOffIcon from "../../../../Image/builder3d/icon-32-sound-gray.svg";

export default function(props) {
  const { selectedTab, onClickTab } = props;

  let body;
  switch (selectedTab) {
    case "sound":
      body = <SoundList />;
      break;
    case "scene":
      body = (
        <>
          <SceneList />
          <ObjectList />
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="leftbar">
      <Menu />
      <div className="leftbar_tabs">
        <Tab
          tabId="scene"
          title="Scenes"
          imgSrc={sceneIcon}
          selectedTabId={selectedTab}
          onClick={onClickTab}
        />
        <Tab
          tabId="sound"
          title="Sounds"
          imgSrc={soundIcon}
          selectedTabId={selectedTab}
          onClick={onClickTab}
        />
      </div>
      <div className="leftbar_body">{body}</div>
    </div>
  );
}

function Tab(props) {
  const { tabId, title, imgSrc, selectedTabId, onClick } = props;
  return (
    <div
      className={`leftbar_tab${
        selectedTabId === tabId ? " leftbar_tab-selected" : ""
      }`}
      onClick={() => {
        onClick(tabId);
      }}
    >
      <div className="leftbar_tab_icon">
        <img src={imgSrc} alt={tabId} />
      </div>
      <div className="leftbar_tab_title">{title}</div>
    </div>
  );
}
