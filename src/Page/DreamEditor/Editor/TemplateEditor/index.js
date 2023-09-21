import React, { useEffect, useState } from "react";
import { Provider, connect } from "react-redux";
import * as request from "../../../../Common/Util/HTTPRequest";
import AssetLibrary from "../../../Builder/utils/assetLibrary";
import * as projectActions from "../../../Builder/Store/Reducer/project";
import store from "../../../Builder/Store";
import Field from "../Field";
import ConditionsField from "./ConditionsField";
import SlideField from "./SlideField";
import OOBCHelper from "./OOBCHelper";
import "./index.scss";

function TemplateEditor(props) {
  useEffect(() => {
    let parsed;
    try {
      parsed = JSON.parse(props.defaultTemplate) || createEmptyTemplate();
    } catch (err) {
      parsed = createEmptyTemplate();
    }
    setMissions(parsed.missions || []);
  }, [props.defaultTemplate]);

  const [missions, setMissions] = useState([]);
  const [currentMissionIndex, setCurrentMissionIndex] = useState(-1);
  const currentMission = missions[currentMissionIndex];
  const currentMissionNum = currentMissionIndex + 1;
  const maxMissionIndex = missions.length - 1;
  const maxMissionNum = maxMissionIndex + 1;
  useEffect(() => {
    if (missions.length > 0) {
      if (currentMissionIndex < 0) {
        setCurrentMissionIndex(0);
      }
    } else {
      setCurrentMissionIndex(-1);
    }
    if (props.onChangeTotalMissionNum) {
      props.onChangeTotalMissionNum(missions.length);
    }
  }, [missions]);

  const isPrevEnabled = currentMissionNum > 1;
  const isNextEnabled = currentMissionNum < maxMissionNum;
  const isDeleteEnabled = !!currentMission;
  const onClickPrev = () => {
    const prevMissionIndex = currentMissionIndex - 1;
    if (prevMissionIndex >= 0) {
      setCurrentMissionIndex(prevMissionIndex);
    }
  };
  const onClickNext = () => {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex <= maxMissionIndex) {
      setCurrentMissionIndex(nextMissionIndex);
    }
  };
  const onClickDelete = () => {
    const confirmed = window.confirm(
      "미션을 삭제할까요? (저장하기 전까지 복구할 수 있어요)"
    );
    if (confirmed) {
      const _missions = [...missions];
      _missions.splice(currentMissionIndex, 1);
      if (currentMissionIndex > 0) {
        setCurrentMissionIndex(currentMissionIndex - 1);
      } else {
        if (_missions.length <= 0) {
          setCurrentMissionIndex(-1);
        }
      }
      setMissions(_missions);
    }
  };
  const onClickAdd = () => {
    const _missions = [...missions];
    _missions.splice(currentMissionIndex + 1, 0, createEmptyMission());
    setMissions(_missions);
    setCurrentMissionIndex(currentMissionIndex + 1);
  };

  const [title, setTitle] = useState("");
  const [pId, setPId] = useState("");
  const [state, setState] = useState("");
  const [mediaURL, setMediaURL] = useState("");
  const [slide, setSlide] = useState("");
  const [conditions, setConditions] = useState([]);
  useEffect(() => {
    if (currentMission) {
      setTitle(currentMission.title || "");
      setPId(currentMission.pId || "");
      setState(currentMission.state || "");
      setSlide(currentMission.slide || "");
      setConditions(currentMission.conditions || []);
    } else {
      setTitle("");
      setPId("");
      setState("");
      setSlide("");
      setConditions([]);
    }
    setMediaURL("");
  }, [currentMission]);
  useEffect(() => {
    if (currentMission) {
      currentMission.title = title;
      currentMission.pId = pId;
      currentMission.state = state;
      currentMission.slide = slide;
      currentMission.conditions = conditions;
    }
  }, [title, pId, state, slide, conditions]);
  useEffect(() => {
    if (state) {
      try {
        const parsedState = JSON.parse(state);
        AssetLibrary.loadAssetsFromScene(parsedState.scene, () => {
          props.setProject({ state: parsedState });
        });
      } catch (err) {}
    }
  }, [state]);

  // 프로젝트 불러오기
  const onClickLoadDevelopingProject = () => {
    request
      .getSaasDevelopingProject(pId)
      .then((res) => res.json())
      .then((developingProject) => {
        setState(developingProject.data.projectInfo.state);
      });
  };

  // 입력할 때 template 수정
  if (props.onChangeTemplate) {
    useEffect(() => {
      const parsed = { missions };
      const template = JSON.stringify(parsed);
      props.onChangeTemplate(template);
    }, [missions, title, pId, state, slide, conditions]);
  }

  return (
    <div className="dreamEditor_editor dreamEditor_editor-template">
      <div className="dreamEditor_editor-template_header">
        <div className="dreamEditor_editor-template_header_mission">
          {currentMission ? (
            <>
              <div className="dreamEditor_editor-template_header_mission_title">
                {currentMissionNum}단계 {title}
              </div>
              <div className="dreamEditor_editor-template_header_mission_number">
                (총 {maxMissionNum}단계)
              </div>
            </>
          ) : (
            <div className="dreamEditor_editor-template_header_mission_placeholder">
              미션을 추가해주세요
            </div>
          )}
        </div>
        <button
          className="dreamEditor_editor-template_header_menu dreamEditor_editor-template_header_menu-delete"
          disabled={!isDeleteEnabled}
          onClick={onClickDelete}
        >
          삭제
        </button>
        <button
          className="dreamEditor_editor-template_header_menu dreamEditor_editor-template_header_menu-add"
          onClick={onClickAdd}
        >
          추가
        </button>
        <button
          className="dreamEditor_editor-template_header_menu dreamEditor_editor-template_header_menu-prev"
          disabled={!isPrevEnabled}
          onClick={onClickPrev}
        >
          {"< 이전"}
        </button>
        <button
          className="dreamEditor_editor-template_header_menu dreamEditor_editor-template_header_menu-next"
          disabled={!isNextEnabled}
          onClick={onClickNext}
        >
          {"다음 >"}
        </button>
      </div>
      <div className="dreamEditor_editor-template_body">
        {currentMission && (
          <>
            <Field.Input
              id="title"
              title="미션 제목"
              value={title}
              onChange={setTitle}
            />
            <Field.Input
              id="pId"
              title="템플릿 pId"
              value={pId}
              onChange={setPId}
            >
              <button onClick={onClickLoadDevelopingProject}>
                프로젝트 불러오기
              </button>
            </Field.Input>
            <Field.Textarea
              id="state"
              title="템플릿 state"
              value={state}
              onChange={setState}
            />
            <Field.File
              id="mediaURL"
              title="업로드하기"
              value={mediaURL}
              comment="* 업로드해서 나오는 URL을 복사해서 마크다운에 입력해주세요 (확장자는 jpg, png, mp4, gif 가능해요)"
              onChange={setMediaURL}
              templateState={true}
            />
            <SlideField
              id="slide"
              title="슬라이드"
              value={slide}
              onChange={setSlide}
            />
            <OOBCHelper
              id="oobc"
              title="OOBC 컨텍스트 작성 도우미"
              comment="OOBC로 코딩한 후에 컨텍스트를 복사해서 슬라이드 마크다운에 붙여넣어주세요"
            />
            <ConditionsField
              id="conditions"
              title="성공조건"
              value={conditions}
              onChange={setConditions}
            />
          </>
        )}
      </div>
    </div>
  );
}

function withProvider(Component) {
  return function (props) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
}
export default withProvider(
  connect((state) => ({ scene: state.scene }), {
    setProject: projectActions.setProject,
  })(TemplateEditor)
);

function createEmptyMission() {
  return {
    title: "",
    slide: "",
    pId: "",
    state: "",
    conditions: [],
  };
}
function createEmptyTemplate() {
  return {
    missions: [createEmptyMission()],
  };
}
