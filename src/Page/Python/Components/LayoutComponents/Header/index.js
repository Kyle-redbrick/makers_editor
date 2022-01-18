import React from "react";
import PopUp, { showPopUp } from "../../../../../Common/Component/PopUp";
import { playButtonEffect } from "../../../Util/PlaySound";
import "./index.scss";

const Header = props => {
  const {
    handleCodeEditor,
    handleInfoPopup,
    projectTitle,
    handleNextScript,
    onClickRestartBtn,
    conditionCheck,
    setConditionCheck,
    isShowProjectItems,
    isPlayBGM,
    isPlayEffect,
    onSaveSettings,
    projectId
  } = props;

  return (
    <header className="pythonHeader">
      <div className="titleArea">
        <p className="titleText">{projectTitle}</p>
      </div>
      <div className="buttonArea">
        <button className={conditionCheck === "editor" ? "codeEditorBtnBlink" : "codeEditorBtn"} onClick={()=>{
          playButtonEffect();

          if(conditionCheck === "editor") {
            handleNextScript();
            setConditionCheck("");
          }
          
          handleCodeEditor()
        }} />
        <button className={conditionCheck === "information" ? "infoBtnBlink" : "infoBtn"} onClick={()=>{
          playButtonEffect();

          if(conditionCheck === "information"){
            handleNextScript();
            setConditionCheck("");
          }

          handleInfoPopup();
        }} />
        <button
          className={conditionCheck === "itembook" ? "collectionBtnBlink" : "collectionBtn"}
          onClick={() => {
            playButtonEffect();

            if (conditionCheck === "itembook") {
              handleNextScript();
              setConditionCheck("");
            }
            showPopUp(<PopUp.PythonCollection projectId={projectId} isShowProjectItems={isShowProjectItems}/>, {
              defaultPadding: false,
              pythonPopup: true,
              dismissButton: false
            });
          }}
        />
        <button
          className="settingBtn"
          onClick={() => {
            playButtonEffect();

            showPopUp(
              <PopUp.PythonSetting onClickRestartBtn={onClickRestartBtn} isPlayBGM={isPlayBGM} isPlayEffect={isPlayEffect} onSaveSettings={onSaveSettings}/>,
              {
                defaultPadding: false,
                pythonPopup: true,
                dismissButton: false
              }
            );
          }}
        />
      </div>
    </header>
  );
};

export default Header;
