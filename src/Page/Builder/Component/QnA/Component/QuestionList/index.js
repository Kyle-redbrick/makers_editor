import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import "./index.scss";

export default function(props) {
  const {
    qnaItems,
    offset,
    onClickPrev,
    onClickNext,
    onClickItem,
    onClickToggleViewMode,
    onClickWriteQuestion,
    onClickRefresh,
    listViewMode,
    isLastPage
  } = props;
  return (
    <div className="QuestionList">
      <div className="QuestionTools">
        <div className="QuestionTool" onClick={onClickRefresh}>
          <FormattedMessage id="ID_QNA_REFRESH" />
        </div>
        <div className="QuestionTool" onClick={onClickToggleViewMode}>
          {listViewMode === "ALL" ? (
            <FormattedMessage id="ID_QNA_MODE_MY" />
          ) : (
            <FormattedMessage id="ID_QNA_MODE_ALL" />
          )}
        </div>
        <div className="QuestionTool" onClick={onClickWriteQuestion}>
          <FormattedMessage id="ID_QNA_MODE_NEW_QUESTION" />
        </div>
      </div>
      <div className="QuestionItems">
        {qnaItems.map((item, i) => {
          return <QuestionItem item={item} onClickItem={onClickItem} key={i} />;
        })}
      </div>
      <div className="QuestionNavi">
        <div
          className={`QuestionNaviItem QuestionNaviPrev ${offset <= 0 &&
            "QuestionNaviItemDisabled"}`}
          onClick={onClickPrev}
        >
          <FormattedMessage id="ID_QNA_MODE_PREV" />
        </div>
        <div
          className={`QuestionNaviItem QuestionNaviNext ${isLastPage &&
            "QuestionNaviItemDisabled"}`}
          onClick={onClickNext}
        >
          <FormattedMessage id="ID_QNA_MODE_NEXT" />
        </div>
      </div>
    </div>
  );
}

const QuestionItem = props => {
  const { item, onClickItem } = props;
  return (
    <div className="QuestionItem" onClick={() => onClickItem(item.id)}>
      <div className="QuestionItemId">{item.id}</div>
      <div className="QuestionItemTitle">
        <div className="QuestionItemTitleText">{item.title}</div>
        {item.answerCount > 0 && (
          <div className="QuestionItemTitleCount">
            <FormattedMessage
              id="ID_QNA_ANSWERS_COUNT"
              values={{ count: item.answerCount }}
            />
          </div>
        )}
      </div>
      <img className="QuestionItemIcon" src={item.user.icon} alt="user icon" />
      <div className="QuestionItemName">{item.user.name}</div>
      <div className="QuestionItemDate">
        {moment(item.createdAt).format("MM-DD HH:mm")}
      </div>
    </div>
  );
};
