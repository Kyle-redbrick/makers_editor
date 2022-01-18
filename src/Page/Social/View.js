import React from "react";
import Layout from "../../Common/Component/Layout";
import Article from "./Article";
import "./index.scss";

import searchImg from "../../Image/social_search.svg";

export default function View(props) {
  const {
    intl,
    userinfo,
    currentCategory,
    keywords,
    activities,
    categories,
    onClickCategory,
    onClickWrite,
    onSearchKeyDown,
    onDeleteKeyword,
    onResetKeyword,
    onClickArticleTag,
    onClickArticleDelete,
    onClickArticleSubscribe
  } = props;
  const { formatMessage } = intl;
  return (
    <Layout>
      <div className="social">
        <div className="social_write" onClick={onClickWrite}>
          {userinfo.icon && (
            <img
              className="social_write_userImg"
              src={userinfo.icon}
              alt="user"
            />
          )}
          <div className="social_write_placeholder" onClick={onClickWrite}>
            {formatMessage({ id: "ID_SOCIAL_WRITE_PLACEHOLDER" })}
          </div>
        </div>
        <div className="social_header">
          <div className="social_categories">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`social_category ${
                  category === currentCategory ? "social_category-current" : ""
                }`}
                onClick={() => {
                  onClickCategory(category);
                }}
              >
                {formatMessage({
                  id: "ID_SOCIAL_CATEGORY_" + category.toUpperCase()
                })}
              </div>
            ))}
          </div>
          <div className="social_search">
            <input
              className="social_search_input"
              placeholder={formatMessage({
                id: "ID_SOCIAL_SEARCH_PLACEHOLDER"
              })}
              onKeyDown={onSearchKeyDown}
            />
            <img className="social_search_icon" src={searchImg} alt="search" />
          </div>
        </div>
        {keywords.length > 0 && (
          <div className="social_keywords">
            {keywords.map((keyword, index) => (
              <div
                key={index}
                className="social_keyword"
                onClick={() => {
                  onDeleteKeyword(index);
                }}
              >
                #{keyword}
              </div>
            ))}
            <div
              className="social_keyword social_keyword-reset"
              onClick={onResetKeyword}
            >
              {formatMessage({ id: "ID_SOCIAL_SEARCH_INIT" })}
            </div>
          </div>
        )}
        <div className="social_body">
          {activities.map((activity, index) => (
            <div className="activity" key={index}>
              <Activity
                activity={activity}
                onClickTag={onClickArticleTag}
                onClickDelete={onClickArticleDelete}
                onClickSubscribe={onClickArticleSubscribe}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const Activity = props => {
  const { activity } = props;
  switch (activity.type) {
    case "socialArticle":
      return (
        <Article
          article={activity.article}
          onClickTag={props.onClickTag}
          onClickSubscribe={props.onClickSubscribe}
          onClickDelete={props.onClickDelete}
        />
      );
    default:
      return;
  }
};
