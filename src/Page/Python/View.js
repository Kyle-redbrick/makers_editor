import React from "react";
import PropTypes from "prop-types";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";
import { URL } from "../../Common/Util/Constant";
import "./index.scss";

//layout Component
import Header from "./Components/LayoutComponents/Header";
import Footer from "./Components/LayoutComponents/Footer";
// import ReplaceKeyboard from "./Components/LayoutComponents/ReplaceKeyboard";

// Scene Compoent
import Title from "./Components/SceneComponents/Title";
import Chat from "./Components/SceneComponents/MessageComponents/Chat";
import Narration from "./Components/SceneComponents/MessageComponents/Narration";

// CodeEditor
import CodeEditor from "./Components/CodeEditor";
import Select from "./Components/SceneComponents/Select";
import Result from "./Components/SceneComponents/Result";
import { SCENE_MODE, OVERLAY_VIEW } from "./Util/Constant";

// Popup
import InfoPopup from "./Components/PopupComponents/InfoPopup";

import buliderBgImg from "../../Image/newPython/bg-builder@2x.png";
import skipIcon from "../../Image/newPython/ic-skip.svg";
import clueIcon from "../../Image/newPython/btn-clue@2x.png";

// studyTimer
import StudyTimer from "./Components/StudyTimer"
import { injectIntl } from "react-intl";

const Body = props => {
  const {
    sceneMode,
    isExecWindowOpen,
    isCodeEditorOpen,
    isInfoPopupOpen,
    handleExecWindow,
    handleInfoPopup,
    handleNextScript,
    handleNextDestination,
    handleSceneMode,
    chatHistory,
    handleClueBtn,

    // size options
    contentBoxWidth,
    contentBoxHeight,
    contentBoxFontSize,
    currentScriptData,

    // codeEditor
    isReadOnly,
    codeEditor,
    templateCode,
    sampleData,

    // infoPopup data
    infoPopupData,
    isShowAnswerCode,

    // outro
    outro,

    // show clear image
    isShowClear,
    checkAnswer,

    // answer fail script 
    isShowFailScript,
    answerFailScript,

    // clue media
    clueMedia,
    conditionCheck,
    setConditionCheck,

    intl
  } = props;
  const isLoading = contentBoxWidth;

  let _scriptData = {};
  let backgroundMediaType = "image";

  if(isShowFailScript) {
    _scriptData = answerFailScript
  } else {
    _scriptData = currentScriptData
  }

  if(currentScriptData.type !== "result" && currentScriptData) {
    if(currentScriptData.media.src.includes(".mp4") || outro) {
      backgroundMediaType = "video"
    }
  }

  return (
    <section className="body">
      <div className="mainArea">
        {isLoading && (
          <div
            className="contentBox"
            style={{
              width: `${contentBoxWidth}px`,
              height: `${contentBoxHeight}px`
            }}
          >
            <div className="contentBoxBg">
              {
              isShowClear 
              ? <>
              <div
                className="imageBg"
                style={{
                  background: `url(${URL.S3_DREAMCLASS}/clear.png?p${Date.now()}) center/cover`
                }}
                onClick={()=>{handleNextScript()}}
              />
              <span className="nextBtn" >{intl.formatMessage({ id: "ID_PYTHON_CLICK_VIEW" })}</span>
              </>
              : (backgroundMediaType === "video") ? (
                <div className="videoBg">
                  <video
                    autoPlay
                    loop={true}
                    width="100%"
                    height="100%"
                    src={outro ? `${URL.S3_DREAMCLASS}/`+outro : `${URL.S3_DREAMCLASS}/`+_scriptData.media.src}
                    onClick={()=>{handleNextScript()}}
                  >
                    {/* <source src={outro ? `${URL.S3_DREAMCLASS}/`+outro : `${URL.S3_DREAMCLASS}/`+currentScriptData.media.src} /> */}
                  </video>
                </div>
              ) : (
                <div
                  className="imageBg"
                  style={{
                    background: `url(${
                      _scriptData && _scriptData.media
                        ? `${URL.S3_DREAMCLASS}/`+_scriptData.media.src
                        : ""
                    }) no-repeat center/cover`
                  }}
                  onClick={()=>{handleNextScript()}}
                />
              )
              }
              {
                !isShowClear
                ?
                <>
                  <Chat
                    isDisplayOn={sceneMode === SCENE_MODE.CHAT}
                    handleNextScript={handleNextScript}
                    currentScriptData={currentScriptData}
                    contentBoxFontSize={contentBoxFontSize}
                    isShowFailScript={isShowFailScript}
                    answerFailScript={answerFailScript}
                    conditionCheck={conditionCheck}
                  />
                  <Narration
                    isDisplayOn={sceneMode === SCENE_MODE.ANNOUNCE}
                    handleNextScript={handleNextScript}
                    currentScriptData={currentScriptData}
                    sceneMode={sceneMode}
                    contentBoxFontSize={contentBoxFontSize}
                    handleClueBtn={handleClueBtn}
                    conditionCheck={conditionCheck}
                  />
                </>
                : null
              }
              {(["media"].includes(currentScriptData.type) || outro) && (
                <button className="skipBtn" onClick={() => handleNextScript()}>
                  {intl.formatMessage({ id: "ID_PYTHON_SKIP_BTN" })}
                  <img src={skipIcon} alt="" />
                </button>
              )}
              {clueMedia && sceneMode !== SCENE_MODE.MEDIA && (
                <button
                  className="clueBtn"
                  onClick={() =>
                    showPopUp(<PopUp.PythonClue clueMedia={clueMedia}/>, {
                      defaultPadding: false,
                      pythonPopup: true,
                      dismissButton: false
                    })
                  }
                  style={{ right: contentBoxWidth * (12 / 648) }}
                >
                  <img src={clueIcon} alt="" />
                </button>
              )}
            </div>
          </div>
        )}

        <CodeEditor
          isCodeEditorOpen={isCodeEditorOpen}
          isExecWindowOpen={isExecWindowOpen}
          handleExecWindow={handleExecWindow}
          handleSceneMode={handleSceneMode}
          handleNextScript={handleNextScript}
          contentBoxWidth={contentBoxWidth}
          contentBoxHeight={contentBoxHeight}
          isReadOnly={isReadOnly}
          codeEditor={codeEditor}
          checkAnswer={checkAnswer}
          templateCode={templateCode}
          sampleData={sampleData}
          isShowAnswerCode={isShowAnswerCode}
          conditionCheck={conditionCheck}
          setConditionCheck={setConditionCheck}
          isShowClear={isShowClear}
        />
      </div>

      {isInfoPopupOpen && (
        <InfoPopup
          handleInfoPopup={handleInfoPopup}
          chatHistory={chatHistory}
          infoPopupData={infoPopupData}
          isShowAnswerCode={isShowAnswerCode}
          handleNextDestination={handleNextDestination}
        />
      )}
    </section>
  );
};

const Overlay = ({
  sceneMode,
  currentScriptData,
  handleNextScript,
  handleNextDestination,
  requestFullscreen,
  goal,
  onClickProjectReplay,
  onClickNextProjectPlay
}) => {
  if (OVERLAY_VIEW(sceneMode)) {
    return (
      <div
        className={`overlay ${sceneMode === SCENE_MODE.INTRO ? "cursor" : ""}`}
      >
        {sceneMode === SCENE_MODE.INTRO && (
          <Title
            currentScriptData={currentScriptData}
            handleNextScript={handleNextScript}
            requestFullscreen={requestFullscreen}
            goal={goal}
          />
        )}
        {sceneMode === SCENE_MODE.QUESTION && (
          <Select
            currentScriptData={currentScriptData}
            handleNextScript={handleNextScript}
            handleNextDestination={handleNextDestination}
          />
        )}
        {sceneMode === SCENE_MODE.RESULT && (
          <Result 
            currentScriptData={currentScriptData} 
            onClickProjectReplay={onClickProjectReplay}
            onClickNextProjectPlay={onClickNextProjectPlay}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

function View(props) {
  const {
    sceneMode,
    isCodeEditorOpen,
    isExecWindowOpen,
    isInfoPopupOpen,
    handleSceneMode,
    handleCodeEditor,
    handleExecWindow,
    handleInfoPopup,
    contentBoxFontSize,
    changeContentFontSize,
    isShowClueBtn,
    handleClueBtn,
    requestFullscreen,
    // size
    contentBoxWidth,
    contentBoxHeight,
    //sceneData
    projectTitle,
    currentScriptData,
    handleNextScript,
    handleNextDestination,
    goal,
    handleNextScene,
    onClickRestartBtn,
    chatHistory,
    conditionCheck,
    setConditionCheck,
    // codeEditor
    codeEditor,
    isReadOnly,
    // setIsReadOnly,
    templateCode,
    sampleData,

    // infoPopup data
    infoPopupData,
    isShowAnswerCode,

    // outro
    outro,

    // check Answer is corred
    isShowClear,
    checkAnswer,

    // answer fail script 
    isShowFailScript,
    answerFailScript,

    // project finished 
    onClickProjectReplay,
    onClickNextProjectPlay,

    // project items
    isShowProjectItems,

    // play BGM
    isPlayBGM,
    isPlayEffect,
    onSaveSettings,

    //clue media
    clueMedia,
    myProjectId,
    studiedMinutes,
    projectId,

    intl
  } = props;

  return (
    <div
      className="pythonView"
      style={{
        background: `url(${buliderBgImg}) no-repeat center/cover`
      }}
    >
      <div id="pythonPagePopup" />

      <section className="pythonViewContent">
        <Overlay
          sceneMode={sceneMode}
          currentScriptData={currentScriptData}
          handleNextScript={handleNextScript}
          handleNextDestination={handleNextDestination}
          requestFullscreen={requestFullscreen}
          goal={goal}
          onClickProjectReplay={onClickProjectReplay}
          onClickNextProjectPlay={onClickNextProjectPlay}
        />

        <div className="defaultView">
          <Header
            handleCodeEditor={handleCodeEditor}
            handleInfoPopup={handleInfoPopup}
            onClickRestartBtn={onClickRestartBtn}
            projectTitle={projectTitle}
            handleNextScript={handleNextScript}
            conditionCheck={conditionCheck}
            setConditionCheck={setConditionCheck}
            // project Items
            isShowProjectItems={isShowProjectItems}
            // play bgm
            isPlayBGM={isPlayBGM}
            isPlayEffect={isPlayEffect}
            onSaveSettings={onSaveSettings}
            projectId={projectId}
          />
          <Body
            sceneMode={sceneMode}
            isCodeEditorOpen={isCodeEditorOpen}
            isExecWindowOpen={isExecWindowOpen}
            isInfoPopupOpen={isInfoPopupOpen}
            isShowClueBtn={isShowClueBtn}
            handleClueBtn={handleClueBtn}
            handleExecWindow={handleExecWindow}
            handleInfoPopup={handleInfoPopup}
            handleSceneMode={handleSceneMode}
            contentBoxFontSize={contentBoxFontSize}
            changeContentFontSize={changeContentFontSize}
            // size options
            contentBoxWidth={contentBoxWidth}
            contentBoxHeight={contentBoxHeight}
            //sceneData
            currentScriptData={currentScriptData}
            handleNextScript={handleNextScript}
            handleNextScene={handleNextScene}
            chatHistory={chatHistory}
            // codeEditor
            isReadOnly={isReadOnly}
            codeEditor={codeEditor}
            templateCode={templateCode}
            sampleData={sampleData}
            // infoPopup data
            infoPopupData={infoPopupData}
            isShowAnswerCode={isShowAnswerCode}
            // outro 
            outro={outro}
            // check Answer is corred
            isShowClear={isShowClear}
            checkAnswer={checkAnswer}
            // goto destination
            handleNextDestination={handleNextDestination}
            // answer fail script 
            isShowFailScript={isShowFailScript}
            answerFailScript={answerFailScript}
            // project finished
            onClickProjectReplay={ onClickProjectReplay }
            onClickNextProjectPlay={ onClickNextProjectPlay }
            // clue media
            clueMedia={ clueMedia }
            conditionCheck={conditionCheck}
            setConditionCheck={setConditionCheck}
            intl={intl}
          />
          <StudyTimer myProjectId={myProjectId} studiedMinutes={studiedMinutes}/>
          <Footer />
          {/* <ReplaceKeyboard
            isCodeEditorOpen={isCodeEditorOpen}
            isReadOnly={isReadOnly}
            setIsReadOnly={setIsReadOnly}
            codeEditor={codeEditor}
          /> */}
        </div>
      </section>
    </div>
  );
}

View.propTypes = {
  sceneMode: PropTypes.string,
  isCollectionPopupOpen: PropTypes.bool,
  isSettingPopupOpen: PropTypes.bool,
  isAlertPopupOpen: PropTypes.bool,
  isExecResultPopupOpen: PropTypes.bool,
  isExecWindowOpen: PropTypes.bool,
  isCodeEditorOpen: PropTypes.bool,
  handleCodeEditor: PropTypes.func,
  handleExecWindow: PropTypes.func,
  handleSceneMode: PropTypes.func
};

export default injectIntl(View);
