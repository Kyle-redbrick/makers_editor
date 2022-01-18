import React from "react";
import moment from "moment";
import { injectIntl } from "react-intl";
import Layout from "../../Common/Component/Layout";
import "./index.scss";
import Comment from "./Comment";
import htmlparser from "react-html-parser";
import backIcon from "../../Image/dreamclass/newsDetailBackIcon.svg";

function View(props) {
  const {
    topic,
    title,
    createdAt,
    description,
    onClickHome,
    onClickPrevNews,
    onClickNextNews,
    comments,
    id,
    onClickNewReply,
    previousNews,
    nextNews,
    email,
    onAddNewComment,
    intl
  } = props;

  return (
    <Layout>
      <div className="page--newsDetail">
        <div className="page--newsDetail--wrapper">
          <div className="newsDetail__viewList">
            <img src={backIcon} alt="" onClick={onClickHome}/>
          </div>
          <div className="newsDetail__container">
            <div className="container__header pc">
              <div className="header__title">
                [{topic}] <span className="header__title__text">{title}</span>
                <span className="new">{intl.formatMessage({ id: "ID_NEWS_NEW" })}</span>
              </div>
              <div className="header__createdAt">
                {moment(createdAt).format("YYYY.MM.DD")}
              </div>
            </div>
            <div className="container__header mobile">
              <div className="header__title">
                <p>{title}</p>
                <span>{intl.formatMessage({ id: "ID_NEWS_NEW" })}</span>
              </div>
              <div className="header__createdAt">
                {moment(createdAt).format("YYYY.MM.DD")}
              </div>
            </div>
            <div className="container__content">
              <div className="content__text">{htmlparser(description)}</div>
            </div>
            <div className="container__list">
              {previousNews && (
                <div className="list" onClick={onClickPrevNews}>
                  <span>{intl.formatMessage({ id: "ID_NEWS_DETAIL_PREV" })}</span>
                  <p>{previousNews.title}</p>
                </div>
              )}
              {nextNews && (
                <div className="list" onClick={onClickNextNews}>
                  <span>{intl.formatMessage({ id: "ID_NEWS_DETAIL_NEXT" })}</span>
                  <p>{nextNews.title}</p>
                </div>
              )}
            </div>
            <div className="container__buttons">
              <div className="button" onClick={onClickHome}>
                {intl.formatMessage({ id: "ID_NEWS_DETAIL_LIST" })}
              </div>
            </div>
            <div className="container__comment">
              <p className="comment_length">{intl.formatMessage({ id: "ID_NEWS_DETAIL_COMMENT" })}</p>
              {email ? (
                <div className="article_newComment">
                  <Comment newsId={id} onAddNewComment={onAddNewComment} />
                </div>
              ) : (
                <div className="article_newComment">
                  <Comment newsId={id} notLoginUser />
                </div>
              )}
              {comments.map((comment, index) => (
                <Comment
                  key={comment.id}
                  newsId={id}
                  comment={comment}
                  onClickNewReply={() => {
                    onClickNewReply(comment.id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default injectIntl(View);