import React, { useEffect, useState } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import Field from "../Field";
import "./index.scss";

function LectureEditor(props) {
  const { lectureId } = props;
  const [lecture, setLecture] = useState(null);
  useEffect(
    () => {
      request
        .getDreamLecture(lectureId)
        .then(res => res.json())
        .then(setLecture);
    },
    [lectureId]
  );

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [level, setLevel] = useState("");
  const [number, setNumber] = useState(0);
  const [heroURL, setHeroURL] = useState("");
  const [v_thumbnailURL, setVThumbnailURL] = useState("");
  const [h_thumbnailURL, setHThumbnailURL] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [isLive, setIsLive] = useState(false);
  useEffect(
    () => {
      if (lecture) {
        setLevel(lecture.level || "");
        setNumber(lecture.number || 0);
        setIsHidden(lecture.isHidden || false);
        setIsLive(lecture.isLive || false);
        
        setTitle(
          lecture.localized[0]
          ? lecture.localized[0].title
          : ""
        );
        setIntroduction(
          lecture.localized[0]
          ? lecture.localized[0].introduction
          : ""
        );
        setHeroURL(
          lecture.localized[0]
          ? lecture.localized[0].heroURL
          : ""
        );
        setVThumbnailURL(
          lecture.localized[0]
          ? lecture.localized[0].v_thumbnailURL
          : ""
        );
        setHThumbnailURL(
          lecture.localized[0]
          ? lecture.localized[0].h_thumbnailURL
          : ""
        );
      }
    },
    [lecture]
  );

  const onClickSave = () => {
    const updateValues = getUpdateValues();
    request
      .updateDreamLecture(lectureId, updateValues)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setLecture({
            ...lecture,
            ...updateValues,
            localized: [
              lecture.localized[0]
              ? { ...lecture.localized[0], ...updateValues.localized }
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
  const getUpdateValues = () => {
    const updateValues = {
      localized: getUpdateLocalizedValues()
    };
    const values = {
      level,
      number: parseInt(number),
      isHidden,
      isLive
    };
    for (let key in values) {
      if (values[key] !== lecture[key]) {
        updateValues[key] = values[key];
      }
    }
    return updateValues;
  };
  const getUpdateLocalizedValues = () => {
    const origin = lecture.localized[0]
    const values = {
      title,
      introduction,
      heroURL,
      v_thumbnailURL,
      h_thumbnailURL
    };
    if(origin) {
      const updateValues = {};
      for (let key in values) {
        if (values[key] !== lecture.localized[0][key]) {
          updateValues[key] = values[key];
        }
      }
      return updateValues;
    } else {
      return values;
    }
  }

  return (
    <div className="dreamEditor_editor dreamEditor_editor-lecture">
      <div className="dreamEditor_editor_header">
        <div className="dreamEditor_editor_title">강의 수정하기</div>
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
        <Field.Select
          id="level"
          title="강의 난이도"
          value={level}
          options={[
            { value: "easy", label: "초급" },
            { value: "normal", label: "중급" },
            { value: "hard", label: "고급" }
          ]}
          onChange={setLevel}
        />
        <Field.Input
          id="number"
          type="number"
          title="강의 순서"
          value={number}
          onChange={setNumber}
        />
        <Field.File
          id="heroURL"
          title="메인 배너"
          value={heroURL}
          onChange={setHeroURL}
        />
        <Field.File
          id="v_thumbnailURL"
          title="세로 썸네일"
          value={v_thumbnailURL}
          onChange={setVThumbnailURL}
        />
        <Field.File
          id="h_thumbnailURL"
          title="가로 썸네일"
          value={h_thumbnailURL}
          onChange={setHThumbnailURL}
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
      </div>
    </div>
  );
}
export default LectureEditor;
