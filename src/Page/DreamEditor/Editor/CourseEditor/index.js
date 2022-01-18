import React from "react";
import "./index.scss";

function CourseEditor(props) {
  // const { courseId } = props;
  return (
    <div className="dreamEditor_editor dreamEditor_editor-course">
      <div className="dreamEditor_editor_header">
        <div className="dreamEditor_editor_title">코스 수정하기</div>
      </div>
      <div className="dreamEditor_editor_placeholder">
        코스 수정은 관리자에게 문의해주세요
      </div>
    </div>
  );
}
export default CourseEditor;
