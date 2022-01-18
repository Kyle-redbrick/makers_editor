import React from "react";
import "./index.scss";
import moment from "moment";

function View(props) {
  const {
    email,
    templateProjects,
    myProjects,
    loadProject,
    createNewProject,
    projectsRef
  } = props;

  const EmptyProjects = () => (
    <div className="projectCategory projectCategory-empty">
      <div className="projectCategory_header">
        <div className="projectCategory_title">빈 프로젝트</div>
      </div>
      <div className="projectCategory_items projectCategory_items-empty">
        <div className="projectItem_container">
          {templateProjects
            .filter(p => p.description === "empty")
            .map((emptyTemplate, index) => {
              return (
                <div
                  key={index}
                  className="projectItem projectItem-empty"
                  onClick={() => createNewProject(emptyTemplate)}
                >
                  <div className="projectItem_name">CREATE</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  const MyProjects = () => (
    <div className="projectCategory projectCategory-my">
      <div className="projectCategory_header">
        <div className="projectCategory_title">내 프로젝트</div>
      </div>
      <div className="projectCategory_items projectCategory_items-my">
        <div className="projectItem_container">
          {myProjects.map((item, index) => {
            return (
              <div key={index} className="projectItem_wrapper">
                <div className="projectItem projectItem-my">
                  <div className="projectItem_ImgWrap">
                    <img
                      className="projectItem__img"
                      src={item.icon}
                      alt="thumb"
                      onClick={() => loadProject(item.pId)}
                    />
                  </div>
                  <div className="projectItem__info">
                    <div className="projectItem__info_wrapper">
                      <div className="info__name">{item.name}</div>
                      <div className="info__date">
                        {moment(item.updatedAt).format("YYYY.MM.DD")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="projectContainer" ref={projectsRef}>
      <div className="projectContainer_header">
        <div className="projectContainer_title">프로젝트</div>
      </div>
      {EmptyProjects()}
      {email && MyProjects()}
    </div>
  );
}

export default View;
