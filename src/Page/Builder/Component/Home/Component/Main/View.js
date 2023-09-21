import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import Game2dIcon from "../../../../../../Image/icon-2d.svg";
import Game3dIcon from "../../../../../../Image/icon-3d.svg";
import projectDetailIcon from "../../../../../../Image/icon-more.svg";
import editIcon from "../../../../../../Image/icon-edit.svg";
import viewAppIcon from "../../../../../../Image/icon-view-app.svg";
import copyIcon from "../../../../../../Image/copy.svg";
import deleteIcon from "../../../../../../Image/delete.svg";

function View(props) {
  const {
    onClick2DGame,
    onClick3DGame,
    onClickMyProjectMore,
    onClickMyPublishedMore,
    setSlickRef,
    handlePrev,
    handleNext,
    onClickDetailBtn,
    onClickProject,
    onClickPublishProject,
    onClickProjectEdit,
    handleEdit,
    handleDelete,
    handleCopy,
    selectProject,
    myProjects,
    myPublisheds,
    news,
    fetchMyProjects,
    setProjectName,
    intl,
  } = props;

  const bannerSlidSettings = {
    fade: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    arrows: false,
    dots: true,
  };
  return (
    <div className="builder--home__main">
      <div className="main__top">
        <div className="main__making">
          <div className="main__title">
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_TITLE" })}
          </div>
          <div className="making__items">
            <div className="making__item" onClick={onClick2DGame}>
              <img src={Game2dIcon} alt="2d game" />
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_2D_GAME" })}
            </div>
            {/* <div className="making__item" onClick={onClick3DGame}>
              <img src={Game3dIcon} alt="3d game" />
              <p>
                {intl.formatMessage({ id: "ID_BUILDER_MAIN_3D_GAME" })}{" "}
                <span>
                  {intl.formatMessage({ id: "ID_BUILDER_MAIN_BETA" })}
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="main__row row__myProjects">
        <div className="row__header">
          <div className="main__title">
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_LATELY_PROJECT" })}
          </div>
          <div onClick={onClickMyProjectMore} className="myProjects__more">
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_VIEW_MORE" })}
          </div>
        </div>
        <div className="project__Items">
          {myProjects.length ? (
            myProjects.map((item, index) => {
              return (
                <ProjectItem
                  project={item}
                  onClickProject={onClickProject}
                  onClickDetailBtn={onClickDetailBtn}
                  selectProject={selectProject}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleCopy={handleCopy}
                  key={index}
                  fetchMyProjects={fetchMyProjects}
                  setProjectName={setProjectName}
                  intl={intl}
                />
              );
            })
          ) : (
            <div className="project__Items no__Items">
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_PLACEHOLDER01" })}
            </div>
          )}
        </div>
      </div>
      <div className="main__row row__myPublished">
        <div className="row__header">
          <div className="main__title">
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_PUBLISHING_APP" })}
          </div>
          <div onClick={onClickMyPublishedMore} className="myPublished__more">
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_VIEW_MORE" })}
          </div>
        </div>

        <div className="project__Items">
          {myPublisheds.length ? (
            myPublisheds.map((item, index) => {
              return (
                <ProjectItem
                  project={item}
                  onClickProject={onClickProject}
                  onClickPublishProject={onClickPublishProject}
                  onClickDetailBtn={onClickDetailBtn}
                  handleEdit={handleEdit}
                  onClickProjectEdit={onClickProjectEdit}
                  selectProject={selectProject}
                  key={index}
                  type="published"
                  intl={intl}
                />
              );
            })
          ) : (
            <div className="project__Items no__Items">
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_PLACEHOLDER02" })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ProjectItem = (props) => {
  const {
    project,
    onClickProject,
    onClickPublishProject,
    onClickDetailBtn,
    onClickProjectEdit,
    selectProject,
    handleEdit,
    handleDelete,
    handleCopy,
    fetchMyProjects,
    type,
    setProjectName,
    intl,
  } = props;

  return (
    <div className="projectItem">
      <div
        className="projectItem__top"
        onClick={(e) => {
          e.preventDefault();
          onClickProject(project.id);
        }}
      >
        <img className="top__img" src={project.icon} alt="project" />
      </div>
      <div
        className="projectItem__bottom"
        onClick={(e) => {
          e.preventDefault();
          onClickProject(project.id);
        }}
      >
        <div className="bottom__title">{project.title}</div>
        <div className="bottom__time">
          {project.updatedAt &&
            project.updatedAt.split("T")[0].replaceAll("-", ".")}
        </div>
      </div>
      {/* <div
        className={`projectItem__detail ${
          selectProject.id === project.id && "selected"
        }`}
        onClick={() => {
          onClickDetailBtn(project.id);
        }}
      >
        <img src={projectDetailIcon} alt="project Detail Icon" />
        <ul className="projectItem__detail__list">
          <>
            <li
              onClick={() =>
                handleEdit(project.pId, project.name, setProjectName)
              }
            >
              <img src={editIcon} alt="edit" />
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_EDIT" })}
            </li>
            <li
              onClick={() => {
                handleDelete(project.pId, fetchMyProjects);
              }}
            >
              <img src={deleteIcon} alt="" />
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_DELETE" })}
            </li>
            <li
              onClick={() => {
                handleCopy(project.pId, fetchMyProjects);
              }}
            >
              <img src={copyIcon} alt="" />
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_COPY" })}
            </li>
          </>
        </ul>
      </div> */}
    </div>
  );
};

export default injectIntl(View);
