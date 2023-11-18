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
        setTag(json.data.lessonInfo.lessonTags);
        setKeyCommand(json.data.lessonInfo.lessonKeyCommands);
      });
  }, [lectureId]);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [template, setTemplate] = useState("");
  const [sampleGameURL, setSampleGameURL] = useState("");
  const [tag, setTag] = useState("");
  const [keyCommand, setKeyCommand] = useState("");
  const [defaultTemplate, setDefaultTemplate] = useState("");
  const [language, setLanguage] = useState("");
  const [number, setNumber] = useState(0);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [totalMissionNum, setTotalMissionNum] = useState(0);

  const lectureValues = {
    title: title,
    description: introduction,
    template: template,
    sampleGameURL: sampleGameURL,
    language: language,
    number: number,
    thumbnailURL: thumbnailURL,
    isVisible: isVisible,
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
      setIsVisible(lecture.isVisible || "");
      setLanguage(lecture.language || "");
      setTotalMissionNum(lecture.totalMissionNum || 0);
    }
  }, [lecture]);

  const onClickSave = async () => {
    if (typeof keyCommand === "string") {
      const keyCommands = keyCommand.split(",").map(function (keyCommand) {
        return keyCommand.trim();
      });
      console.log("keyCommands : ", keyCommands);
      await request.keyCommandsUpdate(lectureId, keyCommands);
    }

    if (typeof tag === "string") {
      const tags = tag.split(",").map(function (tag) {
        return tag.trim();
      });
      await request.tagUpdate(lectureId, tags);
    }

    await request
      .updateLecture(lectureId, lectureValues)
      .then((res) => res.json())
      .then((json) => {
        console.log("json :", json.data.lessonInfo.id);
        localStorage.removeItem("dreamEditorSelectedElement");
        alert("저장되었습니다. :)");
        window.location.reload();
      });
  };

  const onClickDelete = () => {
    request
      .deleteLesson(lectureId)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
        localStorage.removeItem("dreamEditorSelectedElement");
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
        <Field.Input
          id="tag"
          title="태그"
          value={tag}
          onChange={setTag}
          comment={`반드시 \`,\`로 구분해주세요. 예) playAnimation,say`}
        />
        <Field.Input
          id="command"
          title="주요 명령어"
          value={keyCommand}
          onChange={setKeyCommand}
          comment={`반드시 \`,\`로 구분해주세요.`}
        />
        <Field.Select
          id="language"
          title="언어"
          value={language}
          options={[
            { value: "JS", label: "JS" },
            { value: "OOBC", label: "OOBC" },
          ]}
          onChange={setLanguage}
        />
        {/* <Field.Input
          id="number"
          type="number"
          title="강의 순서"
          value={number}
          onChange={setNumber}
        /> */}
        <Field.File
          id="thumbnailURL"
          title="썸네일"
          value={thumbnailURL}
          onChange={setThumbnailURL}
          lectureName={title}
          lectureId={lectureId}
        />
        <Field.OnOff
          id="isVisible"
          title="콘텐츠 공개"
          value={isVisible}
          onChange={setIsVisible}
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
