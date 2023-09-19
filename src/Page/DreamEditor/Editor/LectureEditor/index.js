import React, { useEffect, useState } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import Field from "../Field";
import TemplateEditor from "../TemplateEditor";
import "./index.scss";

function LectureEditor(props) {
  const { lectureId } = props;
  const [lecture, setLecture] = useState(null);
  useEffect(() => {
    request
      .getLecture(lectureId)
      .then((res) => res.json())
      .then((json) => {
        setLecture(json.data.lessonInfo);
      });
  }, [lectureId]);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [template, setTemplate] = useState("");
  const [sampleGameURL, setSampleGameURL] = useState("");
  const [tag, setTag] = useState("");
  const [defaultTemplate, setDefaultTemplate] = useState("");
  const [language, setLanguage] = useState("");
  const [number, setNumber] = useState(0);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [totalMissionNum, setTotalMissionNum] = useState(0);

  console.log("totalMissionNum", totalMissionNum);

  const lectureValues = {
    title: title,
    description: introduction,
    template: template,
    sampleGameURL: sampleGameURL,
    language: language,
    number: number,
    thumbnailURL: thumbnailURL,
    isHidden: isHidden,
    totalMissionNum: totalMissionNum,
  };

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title || "");
      setIntroduction(lecture.description || "");
      setTemplate(lecture.template || "");
      setDefaultTemplate(lecture.template || "");
      setSampleGameURL(lecture.sampleGameURL || "");
      setThumbnailURL(lecture.thumbnailURL || "");
      setIsHidden(lecture.isVisible || "");
      setLanguage(lecture.language || "");
      setTotalMissionNum(lecture.totalMissionNum || 0);
    }
  }, [lecture]);

  const onClickSave = () => {
    request
      .updateLecture(lectureId, lectureValues)
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          alert("저장되었습니다 :)");
        }
      });
  };

  const onClickDelete = () => {
    request
      .deleteLesson(lectureId)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        localStorage.clear();
        window.location.reload();
      });
  };

  return (
    <div className="dreamEditor_editor dreamEditor_editor-lecture">
      <div className="dreamEditor_editor_header">
        <div className="dreamEditor_editor_title">레슨 수정하기</div>
        <button
          className="dreamEditor_editor_deleteBtn"
          onClick={onClickDelete}
        >
          레슨 삭제하기
        </button>
        <button className="dreamEditor_editor_saveBtn" onClick={onClickSave}>
          저장하기
        </button>
      </div>
      <div className="dreamEditor_editor_fields">
        <Field.Input
          id="title"
          title="강의 제목"
          value={title}
          onChange={setTitle}
        />
        <Field.Textarea
          id="introduction"
          title="강의 소개"
          value={introduction}
          onChange={setIntroduction}
        />
        <Field.Input
          id="title"
          title="샘플 게임 url"
          value={sampleGameURL}
          onChange={setSampleGameURL}
        />
        <Field.Input id="tag" title="태그" value={tag} onChange={setTag} />
        <div>,로 구분해서 입력해 주세요. (예시 : )</div>
        {/* <Field.Textarea
          id="template"
          title="강의 템플릿"
          value={template}
          onChange={setTemplate}
        /> */}
        <Field.Select
          id="language"
          title="언어"
          value={language}
          options={[
            { value: "JS", label: "JS" },
            // { value: "PYTHON", label: "PYTHON" },
            { value: "OOBC", label: "OOBC" },
          ]}
          onChange={setLanguage}
        />
        <Field.Input
          id="number"
          type="number"
          title="강의 순서"
          value={number}
          onChange={setNumber}
        />
        <Field.File
          id="thumbnailURL"
          title="썸네일"
          value={thumbnailURL}
          onChange={setThumbnailURL}
          lectureName={title}
        />
        <Field.OnOff
          id="isHidden"
          title="콘텐츠 공개"
          value={!isHidden}
          onChange={(value) => {
            setIsHidden(!value);
          }}
        />

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
      </div>
    </div>
  );
}
export default LectureEditor;
