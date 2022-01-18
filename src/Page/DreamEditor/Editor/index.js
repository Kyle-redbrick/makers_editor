import React from "react";
import CourseEditor from "./CourseEditor";
import LectureEditor from "./LectureEditor";
import ProjectEditor from "./ProjectEditor";
import "./index.scss";

function Editor(props) {
  const { element } = props;

  if (element) {
    switch (element.type) {
      case "course":
        return <CourseEditor courseId={element.id} />;
      case "lecture":
        return <LectureEditor lectureId={element.id} />;
      case "project":
        return <ProjectEditor projectId={element.id} />;
      default:
        return (
          <div className="dreamEditor_editor">
            <div className="dreamEditor_editor_placeholder">
              알 수 없는 타입({element.type})
            </div>
          </div>
        );
    }
  } else {
    return (
      <div className="dreamEditor_editor">
        <div className="dreamEditor_editor_placeholder">
          목록에서 프로젝트를 선택해주세요
        </div>
      </div>
    );
  }
}
export default Editor;
