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
  } = props;

  let content;
  switch (currentPageId) {
    // case "makingNew":
    //   content = <MakingNew setCurrentPage={setCurrentPage} />;
    //   break;
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
        {/* <div className="home--header">
          {canClose && (
            <div className="header--close" onClick={closeProjectPopup}>
              닫기
            </div>
          )}
        </div> */}
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
          <div className="content--right">{content}</div>
        </div>
      </div>
    </div>
  );
}
