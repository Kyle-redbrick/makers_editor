import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";
import Main from "./Component/Main";
import MakingNew from "./Component/MakingNew";
import MyProject from "./Component/MyProject";
import MyPublished from "./Component/MyPublished";

export default function View(props) {
  const {
    pageList,
    onClickPage,
    currentPageId,
    setCurrentPage,
    handleEdit,
    onClickProjectEdit,
    onClickDetailBtn,
    selectProject,
    resetSelectProject,
    // canClose,
    // closeProjectPopup,
    handleDelete,
    handleCopy,
    isTrial,
  } = props;

  let content;
  switch (currentPageId) {
    case "myProject":
      content = (
        <MyProject
          setCurrentPage={setCurrentPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
          onClickDetailBtn={onClickDetailBtn}
          selectProject={selectProject}
        />
      );
      break;
    case "myPublished":
      content = (
        <MyPublished
          setCurrentPage={setCurrentPage}
          onClickProjectEdit={onClickProjectEdit}
          onClickDetailBtn={onClickDetailBtn}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
          selectProject={selectProject}
        />
      );
      break;
    // case "main":
    default:
      content = (
        <Main
          resetSelectProject={resetSelectProject}
          setCurrentPage={setCurrentPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleCopy={handleCopy}
          onClickProjectEdit={onClickProjectEdit}
          onClickDetailBtn={onClickDetailBtn}
          selectProject={selectProject}
        />
      );
      break;
  }
  return (
    <div className="builder--home">
      <div className="builder--home__inner">
        <div className="home--content">
          <div className="content--left">
            <div className="pageList">
              {pageList &&
                pageList.map((item, index) => {
                  const { id, onImg, offImg } = item;
                  const localeID = "ID_BUILDER_" + id.toUpperCase();
                  return (
                    <div
                      className={`pageList__item ${
                        currentPageId === id ? "pageList__item__active" : ""
                      }`}
                      key={index}
                      onClick={() => onClickPage(id)}
                    >
                      <img src={currentPageId === id ? onImg : offImg} alt="" />
                      <div>
                        <FormattedMessage id={localeID} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {!isTrial && <div className="content--right">{content}</div>}
          {isTrial && (
            <div className="content--right--no__Auth">
              권한이 없는 페이지입니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
