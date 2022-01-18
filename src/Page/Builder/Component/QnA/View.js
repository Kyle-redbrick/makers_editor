import React from "react";
import "./index.scss";
import closeImg from "../../../../Image/builder/x-copy-3.svg";
import { FormattedMessage } from "react-intl";
import QuestionList from "./Component/QuestionList";
import QuestionWriter from "./Component/QuestionWriter";
import QuestionDetail from "./Component/QuestionDetail";

export default function(props) {
  const {
    handleSelectTab,
    handleChangeZIndex,
    zIndex,
    qnaItems,
    listViewMode,
    onClickPrev,
    onClickNext,
    onClickItem,
    onClickDetailBack,
    onClickRefresh,
    onClickToggleViewMode,
    onClickWriteQuestion,
    onClickWriterBack,
    onClickShowProject,
    onSuccessWrite,
    onSuccessWriteAnswer,
    offset,
    isLastPage,
    detailItem,
    isWriteMode
  } = props;

  return (
    <div
      className="QnA"
      onMouseDown={() => handleChangeZIndex("qna")}
      style={{ zIndex }}
    >
      <div className="QnATitleLine handle">
        <div className="QnATitle">
          <FormattedMessage id="ID_QNA_TITLE" />
        </div>
        <div className="QnAClose" onClick={() => handleSelectTab("qna")}>
          <img src={closeImg} alt="img" />
        </div>
      </div>

      <div className="QnAContent">
        {(() => {
          if (isWriteMode) {
            return (
              <QuestionWriter
                onClickWriterBack={onClickWriterBack}
                onSuccessWrite={onSuccessWrite}
              />
            );
          } else if (detailItem) {
            return (
              <QuestionDetail
                onClickDetailBack={onClickDetailBack}
                onClickShowProject={onClickShowProject}
                onSuccessWriteAnswer={onSuccessWriteAnswer}
                detailItem={detailItem}
              />
            );
          } else {
            return (
              <QuestionList
                listViewMode={listViewMode}
                qnaItems={qnaItems}
                offset={offset}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
                onClickItem={onClickItem}
                onClickToggleViewMode={onClickToggleViewMode}
                onClickWriteQuestion={onClickWriteQuestion}
                onClickRefresh={onClickRefresh}
                isLastPage={isLastPage}
              />
            );
          }
        })()}
      </div>
    </div>
  );
}
