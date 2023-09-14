import React, { useEffect, useState } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import Field from "../Field";
import "../LectureEditor/index.scss";

function CourseEditor(props) {
  const lectureId = props.courseId;
  const [lecture, setLecture] = useState(null);
  useEffect(() => {
    request
      .getCourseInfo(lectureId)
      .then((res) => res.json())
      .then((json) => {
        setLecture(json.data.courseInfo);
      });
  }, [lectureId]);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [template, setTemplate] = useState("");
  const [sampleGameURL, setSampleGameURL] = useState("");
  const [language, setLanguage] = useState("");
  const [number, setNumber] = useState(0);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isHidden, setIsHidden] = useState(false);

  const lectureValues = {
    title: title,
    description: introduction,
    // template: template,
    // sampleGameURL: sampleGameURL,
    // language: language,
    // number: number,
    thumbnailURL: thumbnailURL,
    isHidden: isHidden,
  };

  useEffect(() => {
    if (lecture) {
      setTitle(lecture.title || "");
      setIntroduction(lecture.description || "");
      setTemplate(lecture.template || "");
      setSampleGameURL(lecture.sampleGameURL || "");
      setThumbnailURL(lecture.thumbnailURL || "");
      setIsHidden(lecture.isVisible || "");
      setLanguage(lecture.locale || "");
    }
  }, [lecture]);

  const onClickSave = () => {
    request
      .updateCourse(lectureId, lectureValues)
      .then((res) => res.json())
      .then((json) => {
        if (json.result) {
          alert("저장되었습니다 :)");
        }
      });
  };

  const onClickDelete = (lectureId) => {
    request
      .deleteCourse(lectureId)
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON", json);
        localStorage.clear();
        window.location.reload();
      });
  };

  return (
    <div className="dreamEditor_editor dreamEditor_editor-lecture">
      <div className="dreamEditor_editor_header">
        <div className="dreamEditor_editor_title">코스 수정하기</div>
        <button
          className="dreamEditor_editor_deleteBtn"
          onClick={onClickDelete}
        >
          코스 삭제하기
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
        {/* <Field.Input
          id="title"
          title="샘플 게임 url"
          value={sampleGameURL}
          onChange={setSampleGameURL}
        />
        <Field.Textarea
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
            { value: "PYTHON", label: "PYTHON" },
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
      </div>
    </div>
  );
}
export default CourseEditor;
