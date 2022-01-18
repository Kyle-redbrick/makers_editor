import React from "react";
import moment from "moment";
import { PROJECT_CATEGORY } from "../../Container";
// import searchImg from "../../../../../../Image/builder/group-copy.svg";
import "./index.scss";

export default function(props) {
  const {
    intl,
    category,
    createNewProject,
    myprojects,
    keyword,
    handleKeywordChange,
    handleOnScroll,
    projectsRef,
    loadProject,
    templateProjects,
    handleCopy,
    handleEdit,
    handleRemove
  } = props;
  return (
    <div className="ProjectRight" ref={projectsRef} onScroll={handleOnScroll}>
      {category === PROJECT_CATEGORY.NEW
        ? getNewProjects({ createNewProject, templateProjects })
        : getLoadProjects({
            intl,
            myprojects,
            keyword,
            handleKeywordChange,
            loadProject,
            handleCopy,
            handleEdit,
            handleRemove
          })}
    </div>
  );
}

const getNewProjects = props => {
  return (
    <div className="ProjectItems">
      {props.templateProjects.map((template, index) => {
        return (
          <div
            key={index}
            className="ProjectItem"
            onClick={() => props.createNewProject(template.id)}
          >
            <img className="ProjectItem__img" src={template.icon} alt="thumb" />
            <div className="ProjectItem__info">
              <div className="info__name">{template.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getLoadProjects = props => {
  const {
    loadProject,
    myprojects,
    keyword,
    handleCopy,
    handleEdit,
    handleKeywordChange,
    handleRemove,
    intl
  } = props;
  return (
    <div>
      <div className="search__container">
        {/* <img src={searchImg} alt="search icon" /> */}
        <input
          type="text"
          value={keyword}
          className="serach__input"
          onChange={handleKeywordChange}
          placeholder={intl.formatMessage({ id: "ID_PROJECT_SEARCH" })}
        />
      </div>
      <div className="ProjectItems">
        {myprojects.map((item, index) => {
          return (
            <div className="ProjectItem" key={index}>
              <img
                className="ProjectItem__img"
                src={item.icon}
                alt="thumb"
                onClick={() => loadProject(item.pId)}
              />
              <div className="ProjectItem__info">
                <div className="info__name">
                  {item.name.length > 11
                    ? `${item.name.substring(0, 11)}...`
                    : item.name}
                </div>
                <div className="info__date">
                  {moment(item.updatedAt).format("YYYY.MM.DD")}
                </div>
              </div>
              <div className="ProjectItem__Tools">
                <div
                  className="ProjectItem__Tool"
                  onClick={() => handleEdit(item.pId, item.name)}
                >
                  수정
                </div>
                <div
                  className="ProjectItem__Tool"
                  onClick={() => handleRemove(item.pId, item.name)}
                >
                  삭제
                </div>
                <div
                  className="ProjectItem__Tool"
                  onClick={() => handleCopy(item.pId)}
                >
                  복사
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
