import React from "react";
import ReactToolTip from "react-tooltip";
import { PAGETYPE } from "../../../../Common/Util/Constant";

import OCP from "../OCP";
import OCP2 from "../OCP2";
import Game from "../Game";
import Play from "../Play";
import Scene from "../Scene";
import Editor from "../Editor";
import Preview from "../Preview";
import LeftBar from "../LeftBar";
import Preload from "../Preload";
import SoundBox from "../SoundBox";
import GameEvent from "../GameEvent";
import SpriteBox from "../SpriteBox";
import AudioPlayer from "../AudioPlayer";

import OCPHeader from "./OCPHeader";
import OCPFooter from "./OCPFooter";
import "./index.scss";

function isAndroid() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) {
    return true;
  }
  return false;
}

function OCPView(props) {
  const { videoclassRef, classTitle } = props;
  return (
    <div className="Page--BUILDER ocpView">
      <OCPHeader videoclassRef={videoclassRef} />
      <OCPBody {...props} />
      <OCPFooter videoclassRef={videoclassRef} classTitle={classTitle} />
      <OCPUtil />
    </div>
  );
}

function OCPBody(props) {
  const {
    pageType,
    handleSelectTab,
    handleChangeZIndex,
    popupStates,
    popupZIndexes,
    showModal,
    modalContent,
    setVideoclassRef
  } = props;
  return (
    <div className="Content">
      <LeftBar handleSelectTab={handleSelectTab} />
      <div className="Content_Main">
        <div className="Content_Main_Left">
          {pageType === PAGETYPE.OCP && (
            <OCP
              setVideoclassRef={setVideoclassRef}
              handleSelectTab={handleSelectTab}
              handleChangeZIndex={handleChangeZIndex}
              zIndex={popupZIndexes.indexOf("ocp")}
              showModal={showModal}
            />
          )}
          {pageType === PAGETYPE.OCP2 && (
            <OCP2
              setVideoclassRef={setVideoclassRef}
              handleSelectTab={handleSelectTab}
              handleChangeZIndex={handleChangeZIndex}
              zIndex={popupZIndexes.indexOf("ocp2js")}
              showModal={showModal}
            />
          )}
          {isAndroid() && (
            <div className="Content_Main_Left_Bottom">
              <Preview
                handleChangeZIndex={handleChangeZIndex}
                handleSelectTab={handleSelectTab}
                zIndex={popupZIndexes.indexOf("preview")}
                fixed={true}
              />
            </div>
          )}
        </div>
        <div className="Content_Main_Right">
          <Editor pageType={pageType} />
        </div>
      </div>
      <div
        className={`Content_Modal ${
          modalContent ? "Content_Modal-visible" : ""
        }`}
      >
        <div className="Content_Modal_Overlay" />
        <div className="Content_Modal_Container">
          <div className="Content_Modal_Content">{modalContent}</div>
        </div>
      </div>
      <SpriteBox
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={handleChangeZIndex}
        zIndex={popupZIndexes.indexOf("spriteBox")}
        isOn={popupStates.spriteBox}
      />
      <SoundBox
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={handleChangeZIndex}
        zIndex={popupZIndexes.indexOf("soundBox")}
        isOn={popupStates.soundBox}
      />
      <Scene
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={handleChangeZIndex}
        zIndex={popupZIndexes.indexOf("scene")}
        isOn={popupStates.scene}
      />
    </div>
  );
}

function OCPUtil(props) {
  return (
    <>
      <Play />
      <Game />
      <Preload />
      <GameEvent />
      <AudioPlayer />
      <ReactToolTip multiline={true} />
    </>
  );
}

export default OCPView;
