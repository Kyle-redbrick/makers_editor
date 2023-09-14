import React from "react";
import "./index.scss";
import FilteringHeader from "../FilteringHeader";

import projectDetailIcon from "../../../../../../Image/icon-more.svg";
import editIcon from "../../../../../../Image/icon-edit.svg";
import viewAppIcon from "../../../../../../Image/icon-view-app.svg";
import { injectIntl } from "react-intl";

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
  } = props;
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
            return (
              <div
                className={`projectItem projectItem__${
                  item.live ? "" : "unactive"
                } `}
                key={index}
              >
                <div
                  className="projectItem__top"
                  onClick={() => onClickProject(item.pId, item.type)}
                >
                  <img src={item.icon} className="top__img" alt="icon" />
                </div>

                <div className="projectItem__bottom">
                  <div className="bottom__title">{item.title}</div>
                  <div className="bottom__time">
                    {item.updatedAt &&
                      item.updatedAt.split("T")[0].replaceAll("-", ".")}
                  </div>
                </div>
                <div
                  className={`projectItem__detail ${
                    selectProject.pId === item.pId &&
                    selectProject.type === "published" &&
                    "selected"
                  }`}
                  onClick={() => {
                    onClickDetailBtn(item.pId, "published");
                  }}
                >
                  {/* <img src={projectDetailIcon} alt="project Detail Icon" />
                  <ul className="projectItem__detail__list">
                    <li onClick={() => onClickProjectEdit(item)}>
                      <img src={editIcon} alt="" />
                      {intl.formatMessage({ id: "ID_BUILDER_MAIN_EDIT" })}
                    </li>
                  </ul> */}
                </div>
              </div>
            );
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
