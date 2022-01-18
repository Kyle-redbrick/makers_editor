import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Rnd } from "react-rnd";
import ReactHtmlParser from "react-html-parser";
import ReactMarkdown from "react-markdown";
import HtmlParser from "react-markdown/plugins/html-parser";
import "./index.scss";

import closeBtn from "../../../../../Image/newPython/python-popup-close-btn@2x.png";
import manImage from "../../../../../Image/newPython/chat-man-profile@2x.png";
import womanImage from "../../../../../Image/newPython/chat-woman-profile@2x.png";
import meImage from "../../../../../Image/newPython/ic-user@3x.png";
import hintOpenArrow from "../../../../../Image/newPython/hint-popup-arrow.png";

import { playTabEffect, playButtonEffect } from "../../../Util/PlaySound";
import CodeBlock from "./CodeBlock"

function PythonInfo(props) {
  const { handleInfoPopup, chatHistory, infoPopupData, isShowAnswerCode, handleNextDestination } = props;
  const [infoPopupSetting, setInfoPopupSetting] = useState({
    x: 10,
    y: 20,
    width: 446,
    height: 530
  });
  const [infoPopupTab, setInfoPopupTab] = useState("hint"); // hint, chatHistory, data
  const [isShowAnswerBox, setisShowAnswerBox] = useState(false);

  useEffect(() => {
    setAce()
  }, [infoPopupTab, isShowAnswerCode]);

  const setAce = () => {
    if(!isShowAnswerCode) return;
    if(infoPopupTab === "chatHistory") return;
    
    let infoPopupAce = window.ace;
    let infoPopupAceEditor = undefined;
    
    infoPopupAceEditor = infoPopupAce.edit("hintEditor");
    infoPopupAceEditor.session.setMode(`ace/mode/python`);
    infoPopupAceEditor.setTheme("ace/theme/wizschool-python");
    infoPopupAceEditor.setFontSize(12);
    infoPopupAceEditor.setValue(infoPopupData.hintCode, 1); 
    infoPopupAceEditor.renderer.setShowGutter(false);
    infoPopupAceEditor.setReadOnly(true);
    infoPopupAceEditor.container.style.lineHeight = 2;
  }
  
  const handleInfoPopupTab = tab => {
    setInfoPopupTab(tab);
  };

  const changePointText = (text, pointText) => {
    const fullText = text.split(pointText);
    const data = `${fullText[0]}<span>${pointText}</span>${fullText[1]}`;
    return ReactHtmlParser(data);
  };

  return (
    <Rnd
      default={{
        x: 10,
        y: 20,
        width: infoPopupSetting.width,
        hegith: infoPopupSetting.height
      }}
      minWidth="330"
      minHeight="200"
      position={{ x: infoPopupSetting.x, y: infoPopupSetting.y }}
      dragHandleClassName = "popupHeader"
      onDragStop={(e, d) => {
        setInfoPopupSetting({ ...infoPopupSetting, x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setInfoPopupSetting({
          ...infoPopupSetting,
          width: ref.style.width,
          height: ref.style.height,
          ...position
        });
      }}
      bounds="parent"
      className="pythonPopup pythonInfoPopup"
    >
      <div className="popupHeader">
        <ul className="popupHeaderTabArea">
          <li
            className={`${infoPopupTab === "hint" ? "activeTab" : ""}`}
            onClick={() => {
              playTabEffect();
              handleInfoPopupTab("hint");
            }}
          >
            {props.intl.formatMessage({ id: "ID_PYTHON_HINT_TITLE" })}
          </li>
          <li
            className={`${infoPopupTab === "chatHistory" ? "activeTab" : ""}`}
            onClick={() => {
              playTabEffect();
              handleInfoPopupTab("chatHistory");
            }}
          >
            {props.intl.formatMessage({ id: "ID_PYTHON_HINT_HISTORY" })}
          </li>
        </ul>
        <img
          className="closePopupBtn"
          onClick={handleInfoPopup}
          src={closeBtn}
          alt=""
        />
      </div>

      <div className="popupBody" style={{ maxHeight: infoPopupSetting.height }}>
        {infoPopupTab === "hint" && (
          <div className="hintBox">
            <div className="hintText">
            <span className="hintTextTitle">
            { infoPopupData.missionGoal ? `${infoPopupData.missionGoal}\n` : props.intl.formatMessage({ id: "ID_PYTHON_HINT_MISSION_GOAL" }) }
            </span>
            { infoPopupData.hint 
            ? <ReactMarkdown 
                skipHtml={false} 
                allowDangerousHtml 
                renderers={{code: CodeBlock}}
                astPlugins={[
                  HtmlParser(infoPopupData.hint)
                ]}
              >
                {infoPopupData.hint}
              </ReactMarkdown>
            : props.intl.formatMessage({ id: "ID_PYTHON_HINT_MISSION_DATA" }) 
            }
            </div>
            <div
              className={`hintAnswerBox ${
                isShowAnswerBox ? "open" : "close"
              }`}
            >
              <p
                className="title"
                onClick={() => {
                  playButtonEffect();
                  setisShowAnswerBox(!isShowAnswerBox);
                }}
              >
                <span>{props.intl.formatMessage({ id: "ID_PYTHON_HINT_ANSWER_TITLE" })}</span>
                <img className={isShowAnswerBox ? "hintOpenArrowOpen" : "hintOpenArrowClose"} src={hintOpenArrow} alt="box" />
              </p>
              <div className="answer">
                {isShowAnswerCode ? (
                  <div className="showAnswer" id="hintEditor" ></div>
                ) : (
                  <p className="defaultMessage">
                    {props.intl.formatMessage({ id: "ID_PYTHON_HINT_ANSWER_DEFAULT_MSG" })}
                  </p>
                )}
              </div>
            </div>
            {/* Todo : zoomAction Add */}
            <div className="zoomBtn" />
          </div>
        )}
        {infoPopupTab === "chatHistory" && (
          <div className="chatHistoryList">
            {chatHistory.map((chat, i) => {
              if (chat.type === "announce") {
                return (
                  <div key={chat + i} className="chatInfoBox" onClick={()=>{handleNextDestination(chat.id)}}>
                    {chat.text}
                  </div>
                );
              } else  if (chat.type === "chat") {
                if(chat.character === "me"){
                  return (
                  <div className="chatMe" key={chat + i} onClick={()=>{handleNextDestination(chat.id)}}>
                    <p className="chatMessage">
                      {/* 파이! 빌더버그 인공위성에서 <span>해킹한 파일이 방금 전송</span>됐어. */}
                      {chat.text}
                    </p>
                    <img src={meImage} alt="" className="chatCharacter" />
                  </div> 
                  );
                } else {
                  return (
                    <div className="chatPeer" key={chat + i} onClick={()=>{handleNextDestination(chat.id)}}>
                      <img
                        src={chat.character === "py" ? womanImage : manImage}
                        alt=""
                        className="chatCharacter"
                      />
                      <p className="chatMessage">
                        {chat.pointText
                          ? changePointText(chat.text, chat.pointText)
                          : chat.text}
                      </p>
                    </div>
                  );
                }
              } else {
                return null
              }
            })}
          </div>
        )}
        {infoPopupTab === "data" && (
          <div>
            <div className="dataContent">
              data data data data data data data data data data data data data
              data data data data data data data data data data data data data
              data data data data data data data
            </div>
            <button onClick={() => {}}>
              {props.intl.formatMessage({ id: "ID_PYTHON_HINT_DATA_COPY" })}
            </button>
          </div>
        )}
      </div>
    </Rnd>
  );
}

export default injectIntl(PythonInfo);
