import React from "react";
import { connect } from "react-redux";
import ReactToolTip from "react-tooltip";
import { EDITORMODE } from "../../../../../Common/Util/Constant";
import "./index.scss"

import Play from "../../Play";
import Game from "../../Game";
import Scene from "../../Scene";
import EditorNew from "../../Editor";
import LeftBar from "../../LeftBar";
import RightBar from "../RightBar";
import Preload from "../../Preload";
import SoundBox from "../../SoundBox";
import SpriteBox from "../../SpriteBox";
import API from "../../API";
import Property from "../../Property";
import GameEvent from "../../GameEvent";
import AudioPlayer from "../../AudioPlayer";



function Editor(props) {
  if(props.isProjectLoaded) {
    return (
      <div className="dream_editor Content">
        <LeftBar 
          handleSelectTab={props.handleSelectTab}
          isLeftBarButtonsHidden={true} 
          isSceneToolHidden={true}
        />
        <RightBar
          showTutorial={props.showTutorial}
          handleSelectTab={props.handleSelectTab}
          handleChangeZIndex={props.handleChangeZIndex}
          popupZIndexes={props.popupZIndexes}
          popupStates={props.popupStates}
          isPropertyTabHidden={true}
        />
        <EditorNew pageType={props.pageType} />
        <SpriteBox
          handleSelectTab={props.handleSelectTab}
          handleChangeZIndex={props.handleChangeZIndex}
          zIndex={props.popupZIndexes.indexOf("spriteBox")}
          isOn={props.popupStates.spriteBox}
        />
        <SoundBox
          handleSelectTab={props.handleSelectTab}
          handleChangeZIndex={props.handleChangeZIndex}
          zIndex={props.popupZIndexes.indexOf("soundBox")}
          isOn={props.popupStates.soundBox}
        />
        <Scene
          handleSelectTab={props.handleSelectTab}
          handleChangeZIndex={props.handleChangeZIndex}
          zIndex={props.popupZIndexes.indexOf("scene")}
          isOn={props.popupStates.scene}
        />
        {props.editorMode !== EDITORMODE.BLOCK && 
          <API
            handleSelectTab={props.handleSelectTab}
            handleChangeZIndex={props.handleChangeZIndex}
            zIndex={props.popupZIndexes.indexOf("api")}
            isOn={props.popupStates.api}
          />
        }
        <Property
          handleSelectTab={props.handleSelectTab}
          handleChangeZIndex={props.handleChangeZIndex}
          zIndex={props.popupZIndexes.indexOf("property")}
          isOn={props.popupStates.property}
        />
        <Play />
        <Game />
        <Preload />
        <GameEvent />
        <AudioPlayer />
        <ReactToolTip multiline={true} />
      </div>
    );
  } else {
    return <div className="dream_editor Content" />;
  }
}

export default connect(
  state => ({ isProjectLoaded: state.project.state, editorMode: state.scene.editorMode })
)(Editor);
