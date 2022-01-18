import React, { useState, useEffect } from "react";
import { injectIntl, FormattedMessage } from "react-intl";
import "./index.scss";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/python/python";
import "codemirror/theme/monokai.css";
import "codemirror/addon/hint/show-hint";

import zoomInIcon from "../../../../Image/newPython/zoom-in.svg";
import zoomOutIcon from "../../../../Image/newPython/zoom-out.svg";
import playIcon from "../../../../Image/newPython/ic-play@2x.png";
import resetIcon from "../../../../Image/newPython/ic-reset@2x.png";
import submitIcon from "../../../../Image/newPython/ic-submit@2x.png";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";

import { playButtonEffect } from "../../Util/PlaySound";

let ace = window.ace;
let aceEditor = undefined;

const CodeEditor = props => {
  const {
    isCodeEditorOpen,
    isExecWindowOpen,
    handleExecWindow,
    contentBoxWidth,
    contentBoxHeight,
    checkAnswer,
    templateCode,
    sampleData,
    isShowAnswerCode,
    conditionCheck,
    setConditionCheck,
    isShowClear
  } = props;

  console.log("isShowClear" , isShowClear)
  
  // const [code, setCode] = useState(templateCode);
  const [codeResult, setCodeResult] = useState("...");

  useEffect(() => {
    setAce()
  }, []);

  useEffect(() => {
    setAceCode()
  }, [templateCode]);

  useEffect(() => {
    if(isShowClear) {
      setCodeResult("...");
      handleExecWindow(false);
    }
  }, [isShowClear]);

  const setAce = () => {
    aceEditor = ace.edit("codeEditor");
    aceEditor.session.setMode(`ace/mode/python`);
    aceEditor.setTheme("ace/theme/wizschool-python");
    aceEditor.setOption("highlightActiveLine", true);
    aceEditor.setOption("highlightSelectedWord", true);
    aceEditor.setOption("showPrintMargin", false);
    aceEditor.getSession().setUseWrapMode(false);
    aceEditor.on("click", handleOnClick);
    aceEditor.container.style.lineHeight = 2;
    aceEditor.container.style.fontSize = "14px";
  }

  const setAceCode = () => {
    aceEditor.setValue("",0);
    
    if(sampleData !== "") {
      aceEditor.setValue(sampleData + "\n" , 1); // sample Data 먼저 setting
      aceEditor.execCommand("foldall"); // sample data가 fold(collapse) 할수 있다면 모두 접어두기
    }

    aceEditor.session.insert({ // sample data 뒤에 템플릿 코드 입력하기
        row: aceEditor.session.getLength(),
        column: 0
      }, templateCode)
  }

  const handleOnClick = e => {
    //ace에서 클릭 위치 가져오기
    const pos = e.getDocumentPosition();
    const line = e.editor.session.getLine(pos.row);

    //클릭한 라인에서 btn정규표현식(들) 가져오기
    const btnRegex = /@![1-2](.*?)[1-2]!@/gim;
    let btnMatches = [];
    let btnMatch;
    while ((btnMatch = btnRegex.exec(line))) {
      btnMatches.push(btnMatch);
    }

    for(let i=0; i<btnMatches.length; i++) {
      const btnMatch = btnMatches[i];
      const startRow = pos.row;
      const startColumn = btnMatch.index;
      const endRow = pos.row;
      const endColumn = startColumn + btnMatch[0].length;

      //btn정규표현식의 범위내에 커서가 위치한다면, 코드 삭제 및 커서 이동
      if(pos.column >= startColumn && pos.column <= endColumn) {
        const range = new ace.Range(startRow, startColumn, endRow, endColumn);
        e.editor.session.doc.remove(range);
        e.editor.moveCursorToPosition({ row: startRow, column: startColumn });
        break;
      }
    }
  }

  // font size zooin or zoomout
  const changeFontSize = type => {
    if(type === "plus") {
      const zoomInsize = aceEditor.getFontSize() + 2;
      if (zoomInsize > 50) {
        return;
      }
      aceEditor.setFontSize(zoomInsize);
    } else if(type === "minus"){
      const MIN_SIZE = 8;
      const zoomOutsize = aceEditor.getFontSize() - 2;
      if (zoomOutsize < MIN_SIZE) {
        return;
      }
      aceEditor.setFontSize(zoomOutsize);
    }
  };

  // run code
  const onClickExecBtn = async () => {
    window.languagePluginLoader.then(() => {
      window.pyodide.loadPackage([]).then(() => {

        try {
        const _code = `
import json
from io import StringIO
import sys
import re

def wizschool_runserver():
    old_stdout = sys.stdout
    sys.stdout = mystdout = StringIO()
    
    exec("${aceEditor.getValue().replaceAll('\r','\\r').replaceAll('\n','\\n').replace(/"/g, "\\\"")}")
    sys.stdout = old_stdout

    return mystdout.getvalue()

wizschool_runserver()
        `

          const output = window.pyodide.runPython(_code);
          setCodeResult(output);
          handleExecWindow(true);
        } catch (error) {
          setCodeResult(error.message)
          handleExecWindow(true);  
        }
        
      });
    });

    // TODO: 실행결과가 맞고, 실행결과가 이미지로 나오는 경우라면 아래 팝업 띄우기
    // showPopUp(<PopUp.PythonExecResult />, {
    //   defaultPadding: false,
    //   pythonPopup: true,
    //   dismissButton: false
    // });
  };

  const onClickSubmitBtn = () => {
    if(isShowAnswerCode) {
      showPopUp(<PopUp.PythonAlert textMessage={props.intl.formatMessage({ id: "ID_PYTHON_SUBMIT_MSG" })} againAction={()=>{checkAnswer(codeResult)}}/>, {
        defaultPadding: false,
        pythonPopup: true,
        dismissButton: false
      });
      // TODO: 실행한 결과값이 미션의 정답과 일치하는지 확인 후 outro 영상 보여주기
    } else {
      showPopUp(<PopUp.PythonOneButtonAlert textMessage={props.intl.formatMessage({ id: "ID_PYTHON_SUBMIT_ERROR_MSG" })}/>, {
        defaultPadding: false,
        pythonPopup: true
      });
    }
  };

  return (
    <div
      className={`pythonCodeEditor ${isCodeEditorOpen ? "open" : "close"}`}
      style={{
        width: `calc(100vw - ${contentBoxWidth}px - 1.5625vw - 0.78125vw)`,
        height: `${contentBoxHeight}px`
      }}
    >
      <div className="codeEditor">
        <div className="codeEditorBtnWrapper">
          <button 
            className={conditionCheck === "playBtn" ? "playBtnBlink" : "playBtn"} 
            onClick={()=>{
              if(conditionCheck === "playBtn") setConditionCheck("")
              playButtonEffect(); 
              onClickExecBtn();
            }}>
            <img src={playIcon} alt="" />
            <FormattedMessage id="ID_PYTHON_PLAY_BUTTON" />
          </button>
          <button 
            className={conditionCheck === "submitBtn" ? "submitBtnBlink" : "submitBtn"} 
            onClick={()=>{
              if(conditionCheck === "submitBtn") setConditionCheck("")
              playButtonEffect(); 
              onClickSubmitBtn();
            }}>
            <img src={submitIcon} alt="" />
            <FormattedMessage id="ID_PYTHON_SUBMIT_BUTTON" />
          </button>
          <button
            className={conditionCheck === "resetBtn" ? "resetBtnBlink" : "resetBtn"}
            onClick={() => {
              if(conditionCheck === "resetBtn") setConditionCheck("")
              playButtonEffect();
              setAceCode();
            }}
          >
            <img src={resetIcon} alt="" />
            <FormattedMessage id="ID_PYTHON_RESET_BUTTON" />
          </button>
        </div>
        <div className="codeTextArea" id="codeEditor"></div>
        <div className="btnWrapper">
          <button className="zoomInBtn">
            <img
              src={zoomInIcon}
              alt=""
              onClick={() => {
                changeFontSize("plus");
              }}
            />
          </button>
          <button className="zoomOutBtn">
            <img
              src={zoomOutIcon}
              alt=""
              onClick={() => {
                changeFontSize("minus");
              }}
            />
          </button>
        </div>
      </div>

      <div className="executionView">
        <div className="executionHeader" onClick={() => handleExecWindow()}>
          <span><FormattedMessage id="ID_PYTHON_EXECUTION_TITLE" /></span>
          <span className={isExecWindowOpen ? "execIconOn" : "execIconOff"} />
        </div>
        {isExecWindowOpen && <div className="executionBody" id="output"><pre>{codeResult}</pre></div>}
      </div>
    </div>
  );
};

export default injectIntl(CodeEditor);
