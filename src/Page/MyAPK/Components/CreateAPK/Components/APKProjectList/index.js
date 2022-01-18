import React, { useState } from "react";
import "./index.scss";
import moment from "moment";
import checkIcon from "../../../../../../Image/icon-check-apk.svg";

const APKProjectList = props => {
  const { projects } = props;
  const { handleNextProcessType } = props;

  const [selectedProject, setSelectedProject] = useState(undefined);

  return (
    <section className="APKProjectList">
      <div className="APKProjectList_inner">
        <div className="APKProjectList-title">
          APK를 만들 앱을 선택해주세요.
        </div>
        <div className="APKProjectList-subtitle">
          위즈랩에 퍼블리싱한 앱만 APK를 만들 수 있습니다.
        </div>
        <div className="APKProjectList_projectlist">
          {projects.map((project, index) => (
            <ProjectItem
              key={`APKProjectList_pl_item-${index}`}
              project={project}
              index={index}
              selectedProject={selectedProject}
              onClickProject={() => {
                setSelectedProject(
                  selectedProject
                    ? selectedProject.projectIndex === index
                      ? undefined
                      : { ...project, projectIndex: index }
                    : { ...project, projectIndex: index }
                );
              }}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <div className="APKProjectList_footer">
          <div className="APKProjectList_footer-title">{`"${selectedProject.name}" 앱의 APK를 만드시겠습니까?`}</div>
          <div
            className="APKProjectList_footer-completeBtn"
            onClick={() => {
              const payload = {
                selectedProject
              };
              handleNextProcessType(payload);
            }}
          >
            선택 완료
          </div>
        </div>
      )}
    </section>
  );
};

export default APKProjectList;

const ProjectItem = props => {
  const { project, index, onClickProject, selectedProject } = props;
  const isMobileWidth = window.innerWidth < 780
  const isTabletWidth = window.innerWidth < 1080
  const itemCount = isMobileWidth ? 2 : isTabletWidth ? 3 : 6
  const isLastInHorizontal = index % itemCount === itemCount - 1;
  const isSelectProject =
    selectedProject && selectedProject.projectIndex === index;
  return (
    <div
      className={`APKProjectList_pl_item ${isLastInHorizontal &&
        "APKProjectList_pl_item-last"}`}
      onClick={onClickProject}
    >
      <div
        className={`APKProjectList_pl_item-icon ${isSelectProject &&
          "APKProjectList_pl_item-icon-selected"}`}
      >
        <img src={project.icon} alt="icon" />
      </div>
      {isSelectProject && (
        <div className="APKProjectList_pl_it-check">
          <img src={checkIcon} alt="check" />
        </div>
      )}
      <div className="APKProjectList_pl_it_bottomWrap">
        <div className="APKProjectList_pl_it_bw-title">{project.name}</div>
        <div className="APKProjectList_pl_it_bw-date">
          {moment(project.editedAt).format("YYYY.M.D")}
        </div>
      </div>
    </div>
  );
};
