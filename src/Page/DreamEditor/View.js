import React from "react";
import ProjectList from "./ProjectList";
import Editor from "./Editor";
import "./index.scss";

function View(props) {
  const { selectedElement, onChangeSelectedElement } = props;
  return (
    <div className="dreamEditor">
      <section>
        <ProjectList onChangeSelectedElement={onChangeSelectedElement} />
      </section>
      <section>
        <Editor element={selectedElement} />
      </section>
    </div>
  );
}
export default View;
