import React, { useState, useEffect, useRef } from "react";
import * as request from "../../Common/Util/HTTPRequest";
import { SCENE_MODE } from "./Util/Constant";
import pyodideloader from "./pyodide";
import View from "./View";
import {
  playScriptEffect,
  playClearEffect,
  playFailEffect,
  playSuccessEffect,
  playBgm,
  stopBgm,
} from "./Util/PlaySound";
// import SampleJson from "./sample.json";

export default function Container(props) {
  const [lectureScript, setLectureScript] = useState(null);

  const [sceneMode, setSceneMode] = useState(SCENE_MODE.MEDIA);

  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(true);
  const [isExecWindowOpen, setIsExecWindowOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isShowClueBtn, setIsShowClueBtn] = useState(false);
  const [clueMedia, setClueMedia] = useState(undefined);

  // codeEditor
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [templateCode, setTemplateCode] = useState("");
  const [sampleData, setSampleData] = useState("");
  const codeEditor = useRef(null);

  // scene move
  const [projectId, setProjectId] = useState(0);
  const [projectTitle, setProjectTitle] = useState("");
  const [goal, setLevelName] = useState("");
  const [outroMedia, setOutroMedia] = useState(undefined);
  const [currentSceneIdx, setCurrentScene] = useState(0);
  const [sceneMaxLength, setSceneMaxLength] = useState(0);
  const [currentScriptIdx, setCurrentScript] = useState(0);
  const [scriptMaxLength, setScriptMaxLength] = useState(0);
  const [currentScriptData, setCurrentScriptData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [conditionCheck, setConditionCheck] = useState("");
  const [isShowFailScript, setShowFailScript] = useState(false);
  const [answerFailScript, setAnswerFailScript] = useState({});

  // size options
  const [contentBoxWidth, setContentBoxWidth] = useState(0);
  const [contentBoxHeight, setContentBoxHeight] = useState(0);
  const [contentBoxFontSize, setContentBoxFontSize] = useState(16);

  // infoPopUpdata
  const [infoPopupData, setInfoPopupData] = useState({});
  const [isShowAnswerCode, setIsShowAnswerCode] = useState(false);

  // show clear
  const [isShowClear, setIsShowClear] = useState(false);

  // project ItemList
  const [isShowProjectItems, setIsShowProjectItems] = useState(false);

  // play Music
  const [isPlayBGM, setIsPlayBGM] = useState(true);
  const [BgmSrc, setBgmSrc] = useState("");
  const [isPlayEffect, setIsPlayEffect] = useState(true);

  const [studiedMinutes, setStudiedMinutes] = useState(0);
  const [clearedProject, setClearedProject] = useState(false);

  useEffect(() => {
    pyodideloader();
    getDefaultContentBoxOffset();
    setIsCodeEditorOpen(false);
    getData(props.match.params.progressId);
    checkBeforeSoundSetting();
    window.addEventListener("resize", getDefaultContentBoxOffset);
    return () => {
      window.removeEventListener("resize", getDefaultContentBoxOffset);
    };
  }, []);

  useEffect(() => {
    handleSceneData();
  }, [
    lectureScript,
    currentSceneIdx,
    currentScriptIdx,
    isShowClear,
    isPlayBGM,
    isPlayEffect,
  ]);

  const getData = (progressId) => {
    if (window.location.pathname.includes("educator")) {
      request
        .getLecture(progressId)
        .then((res) => res.json())
        .then((json) => {
          const id = json.data.lessonInfo.id;
          const title = json.data.lessonInfo.title;
          const studiedMinutes = "";
          const completedMissionNum = json.data.lessonInfo.totalMissionNumber;
          const status = "FINISHED";
          const PYLessonId = json.data.lessonInfo.originalId;
          localStorage.setItem("PYLessonId", PYLessonId);
          const { goal, outro, scenes } = JSON.parse(
            json.data.lessonInfo.template
          );
          if (status === "FINISHED") {
            setClearedProject(true);
            setIsShowProjectItems(true);
          }

          if (scenes.length > completedMissionNum)
            setCurrentScene(completedMissionNum);
          setStudiedMinutes(studiedMinutes);
          setProjectId(id);
          setProjectTitle(title);
          setLectureScript({
            goal: goal,
            outro: outro,
            scenes: scenes,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      request
        .getMyLessonInfo(progressId)
        .then((res) => res.json())
        .then((json) => {
          const id = json.data.lessonId;
          const title = json.data.lesson.title;
          const studiedMinutes = "";
          const completedMissionNum = json.data.completedMissionNumber;
          const status = json.data.status;
          const { goal, outro, scenes } = JSON.parse(json.data.lesson.template);
          const PYLessonId = json.data.lesson.originalId;
          localStorage.setItem("PYLessonId", PYLessonId);

          if (status === "FINISHED") {
            setClearedProject(true);
            setIsShowProjectItems(true);
          }

          if (scenes.length > completedMissionNum)
            setCurrentScene(completedMissionNum);
          setStudiedMinutes(studiedMinutes);
          setProjectId(id);
          setProjectTitle(title);
          setLectureScript({
            goal: goal,
            outro: outro,
            scenes: scenes,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const handleSceneMode = (mode) => {
    setSceneMode(mode);
  };

  const handleCodeEditor = () => {
    setIsCodeEditorOpen(!isCodeEditorOpen);
  };

  const handleExecWindow = (mode) => {
    if (!isShowAnswerCode) setIsShowAnswerCode(true);
    setIsExecWindowOpen(mode ? mode : !isExecWindowOpen);
  };

  const handleInfoPopup = () => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
  };

  const handleClueBtn = (mode) => {
    setIsShowClueBtn(mode ? mode : !isShowClueBtn);
  };

  const handleCloseAllWindows = () => {
    isCodeEditorOpen && handleCodeEditor(); // 코드창 닫기
    isInfoPopupOpen && handleInfoPopup(); // 정보창 닫기
    isShowClueBtn && handleClueBtn(); // 단서창 닫기
  };

  const handleSceneData = () => {
    if (!lectureScript) return null;
    const { goal, outro, scenes } = lectureScript;

    if (isShowFailScript) setShowFailScript(false);
    const currentSceneMode =
      scenes[currentSceneIdx].scripts[currentScriptIdx].type;
    const currentScriptData = scenes[currentSceneIdx].scripts[currentScriptIdx];

    if (currentSceneMode === "result") playSuccessEffect();

    if (isPlayBGM) {
      if (currentScriptData.media) {
        if (currentScriptData.media.backgroundMusic) {
          if (BgmSrc !== currentScriptData.media.backgroundMusic) {
            setBgmSrc(currentScriptData.media.backgroundMusic);
            playBgm(currentScriptData.media.backgroundMusic);
          }
        }
      }
    } else {
      stopBgm();
    }

    setAnswerFailScript(scenes[currentSceneIdx].answerFail[0]);
    setSampleData(scenes[currentSceneIdx].data);

    if (
      sceneMaxLength - 1 === currentSceneIdx &&
      scriptMaxLength - 1 === currentScriptIdx
    ) {
      // 마지막 대사일떄
      if (outroMedia) {
        // 아웃트로 종료
        setOutroMedia(undefined);
        setSceneMode(currentSceneMode);
        setCurrentScriptData(currentScriptData);
      } else {
        // 아웃트로 플레이
        setSceneMode("outro");
        setOutroMedia(outro);
      }
    } else {
      // 일반대사
      if (currentScriptData.type === "success") {
        if (outroMedia) {
          // 아웃트로 종료
          let resultData =
            scenes[currentSceneIdx].scripts[currentScriptIdx + 1];
          if (resultData) {
            setOutroMedia(undefined);
            setSceneMode("result");
            setCurrentScriptData(resultData);
          }
        } else {
          // 아웃트로 플레이
          setSceneMode("outro");
          setOutroMedia(outro);
        }
      } else {
        setOutroMedia(undefined);
        setLevelName(goal);
        setSceneMode(currentSceneMode);
        setCurrentScriptData(currentScriptData);
        setSceneMaxLength(scenes.length);
        setScriptMaxLength(scenes[currentSceneIdx].scripts.length);
      }
    }

    if (
      currentScriptData.type === "announce" ||
      currentScriptData.type === "chat"
    ) {
      // 대화기록으로 이동할 경우이 이미 존재하는 history는 중복해서 넣을 필요 없음
      const isExist = chatHistory.find(
        (item) => item.id === currentScriptData.id
      );
      if (!isExist) setChatHistory([...chatHistory, currentScriptData]);
    }

    if (currentScriptData.timeOut) {
      setTimeout(() => {
        handleNextScript();
      }, Number(currentScriptData.timeOut));
    }

    if (currentSceneMode === SCENE_MODE.GIFT) {
      // TODO : 도감 창에 해당 gift 넣기
    }

    if (!isShowClear && currentScriptData.targetNoti) {
      if (
        ["playBtn", "submitBtn", "resetBtn"].includes(
          currentScriptData.targetNoti
        )
      )
        setIsCodeEditorOpen(true);
      setConditionCheck(currentScriptData.targetNoti);
    }

    if (currentScriptData.type === "mediaSlide") {
      setClueMedia(currentScriptData.media.src);
    }

    // infoPopup 에서 사용될 data binding
    const { missionGoal, hint, templateCode, hintCode } =
      scenes[currentSceneIdx];
    setInfoPopupData({
      missionGoal: missionGoal,
      hint: hint,
      templateCode: templateCode,
      hintCode: hintCode,
    });
    setTemplateCode(templateCode);
  };

  const requestFullscreen = () => {
    if (navigator.userAgent.match(/Android/i)) {
      setIsReadOnly(true);
      var docelem = document.documentElement;

      if (docelem.requestFullscreen) {
        docelem.requestFullscreen();
      } else if (docelem.mozRequestFullScreen) {
        docelem.mozRequestFullScreen();
      } else if (docelem.webkitRequestFullScreen) {
        docelem.webkitRequestFullScreen();
      } else if (docelem.msRequestFullscreen) {
        docelem.msRequestFullscreen();
      }
    }
  };

  const handleNextDestination = (destination) => {
    // const _sampleJson = SampleJson;
    const _sampleJson = lectureScript;
    const _index = _sampleJson.scenes[currentSceneIdx].scripts.findIndex(
      function (_scripts, i) {
        return _scripts.id === destination;
      }
    );

    if (
      _sampleJson.scenes[currentSceneIdx].scripts[_index].type !== "success"
    ) {
      setCurrentScript(_index);
    } else {
      isShowClear && setCurrentScript(currentScriptIdx + 1);
    }
  };

  const handleNextScript = (num) => {
    const { /*goal, outro, */ scenes } = lectureScript;
    if (conditionCheck !== "") return;

    if (isShowClear) {
      // 정답을 맞추고 clear이미지를 클릭헀을때
      if (scenes.length === currentSceneIdx + 1) {
        // 마지막 미션의 정답을 맞췄다면
        setIsShowClear(false);
        const _index = scenes[currentSceneIdx].scripts.findIndex(function (
          _scripts,
          i
        ) {
          return _scripts.type === "success";
        });

        if (_index === -1) {
          const isNoExistSuccess = scenes[currentSceneIdx].scripts.findIndex(
            function (_scripts, i) {
              return _scripts.type === "result";
            }
          );

          setShowFailScript(false);
          setCurrentScript(isNoExistSuccess); // 다음 스크립트
        } else {
          setCurrentScript(_index);
        }
      } else {
        handleNextScene();
        setIsShowAnswerCode(false);
      }
    } else if (outroMedia) {
      // outro영상을 다 봤을때
      handleSceneData();
    } else if (currentScriptIdx + 1 < scriptMaxLength) {
      // 다음 스크립트가 있는지 확인
      let _currentScript = scenes[currentSceneIdx].scripts[currentScriptIdx];
      let _nextScript = scenes[currentSceneIdx].scripts[currentScriptIdx + 1];
      if (["success", "result"].includes(_nextScript.type)) {
        // 다음 스크립트가 성공이미지가 아닐때
        setShowFailScript(false);
        isShowClear && setCurrentScript(num ? num : currentScriptIdx + 1); // 다음 스크립트
      } else {
        // 성공 이미지 혹은 아이템 결과 창일때
        playScriptEffect();

        if (_currentScript.destination) {
          handleNextDestination(_currentScript.destination);
        } else {
          setCurrentScript(num ? num : currentScriptIdx + 1); // 다음 스크립트로 넘기기
        }
      }
    }
  };

  const handleNextScene = (num) => {
    if (currentSceneIdx < sceneMaxLength - 1) {
      setCurrentScene(num !== undefined ? num : currentSceneIdx + 1);
      setCurrentScript(0);
      setChatHistory([]);
      setIsShowClear(false);
      setShowFailScript(false);
      setClueMedia(undefined);
    }
  };

  const onClickRestartBtn = () => {
    setCurrentScene(0);
    setCurrentScript(0);
    setChatHistory([]);
    setIsShowClear(false);
    setShowFailScript(false);
    setClueMedia(undefined);
    setIsCodeEditorOpen(false);
    setIsExecWindowOpen(false);
    setIsInfoPopupOpen(false);
  };

  const changeContentFontSize = (width) => {
    let changeFontSize = 10 + ((width - 424) / 112) * 2;
    if (changeFontSize < 10) changeFontSize = 10;
    if (changeFontSize > 22) changeFontSize = 22;
    setContentBoxFontSize(Math.floor(changeFontSize));
  };

  const getDefaultContentBoxOffset = () => {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const headerHeight = windowWidth > 1024 ? 75 : 55;
    const footerHeight = 47;
    const maxWidth = windowWidth * 0.640625;
    const maxHeight = (windowHeight - headerHeight - footerHeight) * 0.9282;

    let width = maxWidth;
    let height = (width / 3) * 2;

    if (height > maxHeight) {
      height = maxHeight;
      width = (maxHeight / 2) * 3;
    }

    changeContentFontSize(width);
    setContentBoxWidth(width);
    setContentBoxHeight(height);
  };

  const checkAnswer = (_codeResult) => {
    const { scenes } = lectureScript;
    const _scriptAnswer = scenes[currentSceneIdx].answer;

    let _sortedCodeResult = _codeResult
      .split("\n")
      .filter((Element) => Element !== "")
      .sort()
      .join();

    if (_sortedCodeResult === _scriptAnswer.sort().join()) {
      playClearEffect();
      setIsShowClear(true);
      setShowFailScript(false);
      handleCloseAllWindows();

      if (scenes.length === currentSceneIdx + 1) setIsShowProjectItems(true);

      if (!clearedProject) saveCompletedMission();
    } else {
      playFailEffect();
      setSceneMode("chat");
      setShowFailScript(true);
      if (answerFailScript.targetNoti)
        setConditionCheck(answerFailScript.targetNoti);
    }
  };

  const onClickProjectReplay = () => {
    setCurrentScene(0);
    setCurrentScript(0);
  };

  const onClickNextProjectPlay = () => {
    request
      .getNextMyDreamProject(projectId)
      .then((res) => res.json())
      .then((json) => {
        if (!json) {
          // 등록된 다음 Lecture(project)가 없을때.
          alert("다음수업이 없습니다.");
        } else {
          window.location.replace(`/pythonPage/${json.id}`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onSaveSettings = ({ playBGM, playEffect }) => {
    setIsPlayBGM(playBGM);
    setIsPlayEffect(playEffect);
    localStorage.setItem(
      "pythonBuilderSound",
      JSON.stringify({ playBGM: playBGM, playEffect: playEffect })
    );
    const currentScriptData =
      lectureScript.scenes[currentSceneIdx].scripts[currentScriptIdx];

    if (isPlayBGM !== playBGM) {
      if (!playBGM) return;
      try {
        if (currentScriptData.media.backgroundMusic) {
          setBgmSrc(currentScriptData.media.backgroundMusic);
          playBgm(currentScriptData.media.backgroundMusic);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkBeforeSoundSetting = () => {
    let builderSound = localStorage.getItem("pythonBuilderSound");
    if (builderSound) {
      try {
        const { playBGM, playEffect } = JSON.parse(builderSound);
        setIsPlayBGM(playBGM);
        setIsPlayEffect(playEffect);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const saveCompletedMission = () => {
    const { scenes } = lectureScript;
    const values = { completedMissionNum: currentSceneIdx + 1 };
    if (scenes.length === currentSceneIdx + 1) {
      values.completed = true;
      setClearedProject(true);
    }
    request.saveSaasMission(props.match.params.progressId, values);
    // request.saveMyDreamProject(props.match.params.myDreamProjectId, values);
  };

  return (
    <View
      sceneMode={sceneMode}
      isCodeEditorOpen={isCodeEditorOpen}
      isExecWindowOpen={isExecWindowOpen}
      isInfoPopupOpen={isInfoPopupOpen}
      isShowClueBtn={isShowClueBtn}
      handleSceneMode={handleSceneMode}
      handleCodeEditor={handleCodeEditor}
      handleExecWindow={handleExecWindow}
      handleInfoPopup={handleInfoPopup}
      handleClueBtn={handleClueBtn}
      requestFullscreen={requestFullscreen}
      // size options
      contentBoxWidth={contentBoxWidth}
      contentBoxHeight={contentBoxHeight}
      contentBoxFontSize={contentBoxFontSize}
      changeContentFontSize={changeContentFontSize}
      //sceneData
      projectTitle={projectTitle}
      currentScriptData={currentScriptData}
      handleNextScript={handleNextScript}
      handleNextDestination={handleNextDestination}
      handleNextScene={handleNextScene}
      onClickRestartBtn={onClickRestartBtn}
      goal={goal}
      outro={outroMedia}
      chatHistory={chatHistory}
      conditionCheck={conditionCheck}
      setConditionCheck={setConditionCheck}
      // codeEditor
      codeEditor={codeEditor}
      isReadOnly={isReadOnly}
      setIsReadOnly={setIsReadOnly}
      templateCode={templateCode}
      sampleData={sampleData}
      // infoPopup data
      infoPopupData={infoPopupData}
      isShowAnswerCode={isShowAnswerCode}
      // show clear iamge
      setIsShowClear={setIsShowClear}
      // check Answer
      isShowClear={isShowClear}
      checkAnswer={checkAnswer}
      // fail script
      isShowFailScript={isShowFailScript}
      answerFailScript={answerFailScript}
      // finished project
      onClickProjectReplay={onClickProjectReplay}
      onClickNextProjectPlay={onClickNextProjectPlay}
      // project Items
      isShowProjectItems={isShowProjectItems}
      // play sound
      isPlayBGM={isPlayBGM}
      isPlayEffect={isPlayEffect}
      onSaveSettings={onSaveSettings}
      //clue media
      clueMedia={clueMedia}
      myProjectId={props.match.params.myDreamProjectId}
      studiedMinutes={studiedMinutes}
      projectId={projectId}
    />
  );
}
