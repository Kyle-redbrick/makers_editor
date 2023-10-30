import React from "react";
import "./index.scss";
import { useState } from "react";
import FilteringHeader from "../FilteringHeader";

import projectDetailIcon from "../../../../../../Image/icon-more.svg";
import editIcon from "../../../../../../Image/icon-edit.svg";
import viewAppIcon from "../../../../../../Image/icon-view-app.svg";
import { injectIntl } from "react-intl";
import copyIcon from "../../../../../../Image/copy.svg";
import deleteIcon from "../../../../../../Image/delete.svg";

function View(props) {
  const {
    myPublisheds,
    onClickProject,
    onClickShowProject,
    handleOnScroll,
    projectsRef,
    handleProjectLive,
    onClickProjectEdit,
    setFilteringData,
    onClickDetailBtn,
    selectProject,
    intl,
    handleCopy,
    handleDelete,
    handleEdit,
    fetchMyPublisheds,
    onClickCodeCopy,
  } = props;

  const projectItem = (item, index) => {
    const [isCodeCopiable, setIsCodeCopiable] = useState(item.isCodeCopiable);
    return (
      <React.Fragment key={index}>
        <div
          className={`projectItem projectItem__${item.live ? "" : "unactive"}`}
        >
          <div
            className="projectItem__top"
            onClick={() => onClickProject(item.id)}
          >
            <img src={item.icon} className="top__img" alt="icon" />
          </div>

          <div className="projectItem__bottom">
            <div className="bottom__title">{item.title}</div>
            <div className="bottom__time">
              {item.updatedAt &&
                item.updatedAt.split("T")[0].replaceAll("-", ".")}
              <div className="code__allow">
                {isCodeCopiable ? <p>공개</p> : <p>비공개</p>}
                {
                  <div className="publishform__code_allow__wrapper">
                    <div
                      className={`publishform__code_allow ${
                        isCodeCopiable ? "On" : "Off"
                      }`}
                      onClick={(event) => {
                        setIsCodeCopiable(!isCodeCopiable);
                        onClickCodeCopy(
                          { isCodeCopiable: !isCodeCopiable },
                          item.id
                        );
                      }}
                    >
                      <span />
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div
            className={`projectItem__detail ${
              selectProject.id === item.id && "selected"
            }`}
            onClick={() => {
              onClickDetailBtn(item.id);
            }}
          >
            <img src={projectDetailIcon} alt="project Detail Icon" />
            <ul className="projectItem__detail__list">
              <li onClick={() => handleEdit(item.id, fetchMyPublisheds)}>
                <img src={editIcon} alt="" />
                {intl.formatMessage({ id: "ID_BUILDER_MAIN_EDIT" })}
              </li>
              <li onClick={() => handleDelete(item.id, fetchMyPublisheds)}>
                <img src={deleteIcon} alt="" />
                {intl.formatMessage({ id: "ID_BUILDER_MAIN_DELETE" })}
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div
      className="builder--home__myPublished"
      onScroll={handleOnScroll}
      ref={projectsRef}
    >
      <p className="myPublished__title">
        {intl.formatMessage({ id: "ID_BUILDER_MYPUBLISHED_TITLE" })}
      </p>
      <FilteringHeader setFilteringData={setFilteringData} />
      <div className="bottom__projectItems">
        {myPublisheds.length ? (
          myPublisheds.map((item, index) => {
            return projectItem(item, index);
          })
        ) : (
          <div className="project__Items no__Items">
            {intl.formatMessage({ id: "ID_BUILDER_MYPROJECT_NO_ITEM" })}
          </div>
        )}
      </div>
    </div>
  );
}

export default injectIntl(View);
