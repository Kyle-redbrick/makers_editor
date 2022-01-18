import React from "react";
import Header from "./Component/Header";
import "./index.scss";
import moment from "moment";
import searchImg from "../../../../Image/builder/group-search.svg";
import wizliveBannerImg from "../../../../Image/wizlive_square_banner.png";
import DropDown from "./Component/DropDown";
import { WIZLIVE_BANNER_LINK } from "../../../../Common/Util/Constant";
export default function(props) {
  const {
    canClose,
    closeProjectPopup,
    myprojects,
    handleKeywordChange,
    keyword,
    intl,
    loadProject,
    handleEdit,
    handleRemove,
    handleCopy,
    templateProjects,
    createNewProject,
    handleOnScroll,
    projectsRef,
    projectItemWidth,
    lastItemIndex,
    userId,
    email
  } = props;

  return (
    <div
      className="ProjectContainer"
      onScroll={handleOnScroll}
      ref={projectsRef}
    >
      <div className="ProjectContainer__inner">
        <Header canClose={canClose} closeProjectPopup={closeProjectPopup} />
        <div className="Project__template">
          {/* empty */}
          <div className="Project__template__header">
            <div className="Project__title">
              {intl.formatMessage({ id: "ID_PROJECT_EMPTY_TITLE" })}
            </div>
          </div>
          <div className="ProjectItems empty">
            {templateProjects
              .filter(p => p.description === "empty")
              .map((template, index) => {
                return (
                  <div
                    style={{ width: `${projectItemWidth * 2}px` }}
                    className="ProjectItem__wrapper"
                    key={index}
                  >
                    <div
                      className="ProjectItem ProjectItemEmpty"
                      onClick={() => createNewProject(template)}
                    >
                      <div className="ProjectItem_ImgWrap">
                        <img
                          className="ProjectItem__img"
                          src={template.icon}
                          alt="thumb"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* template */}
          <div className="Project__template__header">
            <div className="Project__title">
              {intl.formatMessage({ id: "ID_PROJECT_TEMPLATE_TITLE" })}
            </div>
          </div>
          <div className="ProjectItems template">
            {templateProjects
              .filter(p => p.description !== "empty")
              .map((template, index) => {
                return (
                  <div
                    style={{ width: `${projectItemWidth}px` }}
                    className="ProjectItem__wrapper"
                    key={index}
                  >
                    <div
                      className="ProjectItem"
                      onClick={() => createNewProject(template)}
                    >
                      <div className="ProjectItem_ImgWrap">
                        <img
                          className="ProjectItem__img"
                          src={template.icon}
                          alt="thumb"
                        />
                      </div>
                      <div className="ProjectItem__info">
                        <div className="info__name">{template.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* wizlive banner */}
            {templateProjects.length > 0 && (
              <div
                style={{ width: `${projectItemWidth}px` }}
                className="ProjectItem__wrapper"
              >
                <div className="ProjectItem">
                  <div className="ProjectItem_ImgWrap">
                    <a
                      href={WIZLIVE_BANNER_LINK(2, userId)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="ProjectItem__img"
                        src={wizliveBannerImg}
                        alt="thumb"
                      />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {email && (
          <div className="Project__myProject">
            <div className="Project__myProject__header">
              <div className="Project__title">
                {intl.formatMessage({ id: "ID_PROJECT_MYPROJECT_TITLE" })}
              </div>
              <div className="search__container">
                <img src={searchImg} alt="search icon" />
                <input
                  type="text"
                  value={keyword}
                  className="serach__input"
                  onChange={handleKeywordChange}
                  placeholder={intl.formatMessage({ id: "ID_PROJECT_SEARCH" })}
                />
              </div>
            </div>

            <div id="ProjectItems" className="ProjectItems">
              {myprojects.map((item, index) => {
                return (
                  <div
                    style={{ width: `${projectItemWidth}px` }}
                    className="ProjectItem__wrapper"
                    key={index}
                  >
                    <div className="ProjectItem__myproject">
                      <div className="ProjectItem_ImgWrap">
                        <img
                          className="ProjectItem__img"
                          src={item.icon}
                          alt="thumb"
                          onClick={() => loadProject(item.pId, item.type)}
                        />
                        <div className="ProjectItem_type">
                          {item.type === "js" ? "TEXT" : "BLOCK"}
                        </div>
                      </div>
                      <div className="ProjectItem__info">
                        <div className="ProjectItem__info_wrapper">
                          <div className="info__name">{item.name}</div>
                          <div className="info__date">
                            {moment(item.updatedAt).format("YYYY.MM.DD")}
                          </div>
                        </div>
                        <DropDown
                          handleEdit={handleEdit}
                          handleRemove={handleRemove}
                          handleCopy={handleCopy}
                          index={index}
                          item={item}
                          lastItemIndex={lastItemIndex}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
