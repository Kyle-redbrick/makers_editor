import React from "react";
import { FormattedMessage } from "react-intl";
import CodeViewer from "../CodeViewer";
import AnswerWriter from "../AnswerWriter";
import moment from "moment";
import "./index.scss";

export default function(props) {
  const {
    onClickDetailBack,
    onClickShowProject,
    onSuccessWriteAnswer,
    detailItem
  } = props;

  return (
    <div className="QuestionDetail">
      <div className="QuestionDetailBack" onClick={onClickDetailBack}>
        <FormattedMessage id="ID_QNA_MODE_PREV" />
      </div>
      <div className="QuestionDetailUserInfo">
        <div className="QuestionDetailUserIcon">
          <img src={detailItem.user.icon} alt="user icon" />
        </div>
        <div className="QuestionDetailUserName">{detailItem.user.name}</div>
        <div className="QuestionDetailDate">
          {moment(detailItem.createdAt).format("YY-MM-DD HH:mm")}
        </div>
      </div>
      <div className="QuestionDetailTitle">{detailItem.title}</div>
      <div className="QuestionDetailContent">
        {detailItem.hasState && (
          <div
            className="QuestionDetailShowProject"
            onClick={() => onClickShowProject(detailItem.id)}
          >
            <FormattedMessage id="ID_QNA_DETAIL_SHOW_PROJECT" />
          </div>
        )}
        {detailItem.content}
      </div>
      {detailItem.code && (
        <div className="QuestionDetailCode">
          <CodeViewer code={detailItem.code} />
        </div>
      )}
      <AnswerWriter
        questionId={detailItem.id}
        onSuccessWriteAnswer={onSuccessWriteAnswer}
      />
      <div className="QuestionDetailAnswers">
        {detailItem.answers.map((answer, i) => {
          return <AnswerItem answer={answer} key={i} />;
        })}
      </div>
    </div>
  );
}

const AnswerItem = props => {
  const { answer } = props;
  return (
    <div className="QuestionDetailAnswer">
      <div className="QuestionDetailAnswerUserInfo">
        <div className="QuestionDetailAnswerUserIcon">
          <img src={answer.user.icon} alt="user icon" />
        </div>
        <div className="QuestionDetailAnswerUserName">{answer.user.name}</div>
        <div className="QuestionDetailAnswerDate">
          {moment(answer.createdAt).format("YY-MM-DD HH:mm")}
        </div>
      </div>
      <div className="QuestionDetailAnswerContent">{answer.content}</div>
      {answer.code && (
        <div className="QuestionDetailAnswerCode">
          <CodeViewer code={answer.code} />
        </div>
      )}
    </div>
  );
};
