import React from "react";
import { URL } from "../../../../../../../Common/Util/Constant";

export default function ChatbotLecture(props) {
  const { lectures } = props;
  return (
    <div className="ChatbotLectures">
      {lectures.map((lecture, index) => {
        return <div key={index} className="ChatbotLecture" onClick={()=>onClickLecture(lecture)}>
          <div className="ChatbotLectureTitle">{lecture.title}</div>
          <img className="ChatbotLectureImg" src={URL.S3_DREAMCLASS + lecture.thumbnailURL} alt="lecture" />
          <div className="ChatbotLectureDesc">{lecture.introduction}</div>
        </div>
      })}
    </div>
  );
}

function onClickLecture(lecture) {
  // console.log(11111111,lecture)
  // TODO : go to lecture's page
}
