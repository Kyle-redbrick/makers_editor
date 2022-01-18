import React, { useEffect, useState } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import TemplateEditor from "../TemplateEditor";
import Field from "../Field";
import "./index.scss";

function ProjectEditor(props) {
  const { projectId } = props;
  const [project, setProject] = useState(null);
  useEffect(
    () => {
      request
        .getDreamProject(projectId)
        .then(res => res.json())
        .then(project => {
          project.tags = project.tags ? project.tags.map(tag => tag.tag) : [];
          setProject(project);
        });
    },
    [projectId]
  );

  let courseType;
  try {
    courseType = project.lecture.course.type;
  } catch {}

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [number, setNumber] = useState(0);
  const [defaultTemplate, setDefaultTemplate] = useState("");
  const [template, setTemplate] = useState("");
  const [totalMissionNum, setTotalMissionNum] = useState(0);
  const [sampleGameURL, setSampleGameURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [tags, setTags] = useState([]);
  const [apiCommands, setAPICommands] = useState("");
  const [programmingConcepts, setProgrammingConcepts] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isLive, setIsLive] = useState(false);
  useEffect(
    () => {
      if (project) {
        setNumber(project.number || 0);
        setTotalMissionNum(project.totalMissionNum || 0);
        setIsHidden(project.isHidden || false);
        setIsLive(project.isLive || false);
        
        setTitle(
          project.localized[0]
          ? project.localized[0].title
          : ""
        );
        setIntroduction(
          project.localized[0]
          ? project.localized[0].introduction
          : ""
        );
        setDefaultTemplate(
          project.localized[0]
          ? project.localized[0].template
          : ""
        );
        setTemplate(
          project.localized[0]
          ? project.localized[0].template
          : ""
        );
        setSampleGameURL(
          project.localized[0]
          ? project.localized[0].sampleGameURL
          : ""
        );
        setThumbnailURL(
          project.localized[0]
          ? project.localized[0].thumbnailURL
          : ""
        );
        
        setAPICommands(
          project.tags
            .filter(tag => tag.type === "apiCommand")
            .map(tag => tag.name)
            .join(",") || ""
        );
        setProgrammingConcepts(
          project.tags
            .filter(tag => tag.type === "programmingConcept")
            .map(tag => tag.name)
            .join(",") || ""
        );
      }
    },
    [project]
  );
  useEffect(
    () => {
      const tags = [];

      apiCommands
        .split(",")
        .map(apiCommand => apiCommand.trim())
        .filter(apiCommand => !!apiCommand)
        .forEach(apiCommand => {
          tags.push({ type: "apiCommand", name: apiCommand });
        });

      programmingConcepts
        .split(",")
        .map(programmingConcept => programmingConcept.trim())
        .filter(programmingConcept => !!programmingConcept)
        .forEach(programmingConcept => {
          tags.push({
            type: "programmingConcept",
            name: programmingConcept
          });
        });

      setTags(tags);
    },
    [apiCommands, programmingConcepts]
  );

  const onClickSave = () => {
    const updateValues = getUpdatedValues();
    request
      .updateDreamProject(projectId, updateValues)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setProject({
            ...project,
            ...updateValues,
            localized: [
              project.localized[0]
              ? { ...project.localized[0], ...updateValues.localized }
              : updateValues.localized
            ]
          });
          alert("저장되었습니다 :)");
        } else {
          throw json;
        }
      })
      .catch(err => {
        console.error(err);
        alert(JSON.stringify(err));
      });
  };
  const getUpdatedValues = () => {
    const updatedValues = {
      localized: getUpdateLocalizedValues()
    };
    
    const values = {
      number: parseInt(number),
      totalMissionNum,
      tags,
      isHidden,
      isLive
    };
    
    for (let key in values) {
      if (isUpdated(key, values[key])) {
        updatedValues[key] = values[key];
      }
    }
    return updatedValues;
  };
  const getUpdateLocalizedValues = () => {
    const origin = project.localized[0]

    const values = {
      title,
      introduction,
      sampleGameURL,
      thumbnailURL,
    };
    if(courseType !== "python") {
      values.template = template;
    }

    if(origin) {
      const updateValues = {};
      for (let key in values) {
        if (values[key] !== project.localized[0][key]) {
          updateValues[key] = values[key];
        }
      }
      return updateValues;
    } else {
      return values;
    }
  }
  const isUpdated = (key, value) => {
    switch (key) {
      case "tags":
        const prevTags = project[key];
        const nextTags = value;

        if (prevTags.length !== nextTags.length) {
          return true;
        }

        const isTagEqual = (a, b) => a.type === b.type && a.name === b.name;
        for (let nextTag of nextTags) {
          if (prevTags.find(prevTag => isTagEqual(prevTag, nextTag))) {
            continue;
          } else {
            return true;
          }
        }

        return false;
      default:
        return value !== project[key];
    }
  };

  return (
    <div className="dreamEditor_editor dreamEditor_editor-project">
      <div className="dreamEditor_editor_header">
        <div className="dreamEditor_editor_title">프로젝트 수정하기</div>
        <button className="dreamEditor_editor_saveBtn" onClick={onClickSave}>
          저장하기
        </button>
      </div>
      <div className="dreamEditor_editor_fields">
        <Field.Input
          id="title"
          title="프로젝트 제목"
          value={title}
          onChange={setTitle}
        />
        <Field.Textarea
          id="introduction"
          title="프로젝트 소개"
          value={introduction}
          onChange={setIntroduction}
        />
        <Field.File
          id="thumbnailURL"
          title="썸네일 이미지"
          value={thumbnailURL}
          onChange={setThumbnailURL}
        />
        <Field.Input
          id="number"
          type="number"
          title="프로젝트 순서"
          value={number}
          onChange={setNumber}
        />
        <Field.Input
          id="programmingConcepts"
          title="학습개념"
          value={programmingConcepts}
          onChange={setProgrammingConcepts}
          comment={`반드시 \`,\`로 구분해주세요. 예) 순차구조,이벤트`}
        />
        <Field.Input
          id="apiCommands"
          title="주요 명령어"
          value={apiCommands}
          onChange={setAPICommands}
          comment={`반드시 \`,\`로 구분해주세요. 예) playAnimation,say`}
        />
        <Field.Input
          id="title"
          title="샘플게임 주소"
          value={sampleGameURL}
          onChange={setSampleGameURL}
        />
        <Field.OnOff
          id="isHidden"
          title="콘텐츠 공개"
          value={!isHidden}
          onChange={value => {
            setIsHidden(!value);
          }}
        />
        <Field.OnOff
          id="isLive"
          title="콘텐츠 이용가능"
          value={isLive}
          onChange={setIsLive}
        />
        {courseType !== "python" && (
          <div className="dreamEditor_editor_field dreamEditor_editor_field-template">
            <div className="dreamEditor_editor_field_title">템플릿</div>
            <div className="dreamEditor_editor_field_body">
              <TemplateEditor
                defaultTemplate={defaultTemplate}
                onChangeTotalMissionNum={setTotalMissionNum}
                onChangeTemplate={setTemplate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProjectEditor;
