import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
import DraftEditor from "../../../Common/Component/DraftEditor";
import DreamReport from "../../../Common/Component/DreamReport";
import SignIn from "../../../Common/Component/SignIn";
import Comment from "../Comment";
import Menus from "../Util/Menus";
import { dateFormatter } from "../Util/DateFormatter";
import "./index.scss";

import moreImg from "../../../Image/social_more.svg";
import likeImg from "../../../Image/social_like.svg";
import likeActiveImg from "../../../Image/social_like-active.svg";
import commentImg from "../../../Image/social_comment.svg";
import arrowDownImg from "../../../Image/social_arrow-down.svg";
import officialIcon from "../../../Image/certification-mark.svg";

class Article extends Component {
  constructor(props) {
    super(props);
    const { article } = props;
    const { isLiked, likeCount, questEnd } = article;
    const comments = article.comments.map(comment => {
      let contents;
      try {
        contents = JSON.parse(comment.contents);
      } catch {}
      return {
        ...comment,
        contents,
        createdAt: dateFormatter(comment.createdAt),
        showNewReply: false
      };
    });

    this.state = {
      fold: true,
      isLiked,
      likeCount,
      questEnd,
      comments,
      commentsMax: 2
    };
  }
  componentDidMount() {
    this.draftEditor.setContents(this.props.article.contents);
    setTimeout(() => {
      this.setFolding();
    }, 10);
  }

  // util
  setFolding = () => {
    const { id } = this.props.article;
    const draftEditor = document.getElementById(`article_contents-${id}`);
    if (draftEditor) {
      const height = draftEditor.offsetHeight;
      if (height < 420) {
        this.setState({ fold: false });
      }
    }
  };

  // user
  onClickUser = () => {
    const { user } = this.props.article;
    window.scrollTo(0, 0);
    this.props.history.push(`/userpage/${user.id}`);
  };

  // more
  onClickMore = () => {
    const menus = [];
    const { email, article, intl } = this.props;
    const { formatMessage } = intl;
    const { user } = article;
    // const shareMenu = {
    //   name: "공유하기",
    //   onClick: this.onClickShare
    // };
    // menus.push(shareMenu);
    if (user.email === email) {
      const editMenu = {
        name: formatMessage({ id: "ID_SOCIAL_MORE_UPDATE" }),
        onClick: this.onClickUpdate
      };
      menus.push(editMenu);
      const deleteMenu = {
        name: formatMessage({ id: "ID_SOCIAL_MORE_DELTE" }),
        onClick: this.onClickDelete
      };
      menus.push(deleteMenu);
    }
    const reportMenu = {
      name: formatMessage({ id: "ID_SOCIAL_MORE_REPORT" }),
      onClick: this.onClickReport
    };
    menus.push(reportMenu);
    showPopUp(
      <Menus
        menus={menus}
        cancelButtonName={formatMessage({ id: "ID_SOCIAL_MORE_CANCEL" })}
      />,
      {
        dismissOverlay: true,
        dismissButton: false,
        defaultPadding: false,
        darkmode: true
      }
    );
  };
  onClickSubscribe = () => {
    const { user } = this.props.article;
    this.props.onClickSubscribe(user);
  };
  onClickUpdate = () => {
    const { id } = this.props.article;
    this.props.history.push(`/socialwrite/${id}`);
  };
  onClickReport = () => {
    if (this.props.email) {
      showPopUp(
        <DreamReport
          targetType="socialArticle"
          targetContentId={this.props.article.id}
          targetUserId={this.props.article.user.id}
        />,
        {
          darkmode: true,
          mobileFullscreen: false,
          dismissButton: false
        }
      );
    } else {
      showPopUp(<SignIn />, {
        darkmode: true,
        mobileFullscreen: true
      });
    }
  };
  onClickShare = () => {
    // const menus = [
    //   {
    //     name: "페이스북에 공유",
    //     onClick: () => {
    //       console.log("facebook");
    //     }
    //   },
    //   {
    //     name: "트위터에 공유",
    //     onClick: () => {
    //       console.log("twitter");
    //     }
    //   },
    //   {
    //     name: "이메일로 공유",
    //     onClick: () => {
    //       console.log("email");
    //     }
    //   },
    //   {
    //     name: "링크 복사",
    //     onClick: () => {
    //       console.log("link");
    //     }
    //   }
    // ];
    // showPopUp(<Menus menus={menus} />, {
    //   defaultPadding: false,
    //   darkmode: true
    // });
  };
  onClickDelete = () => {
    const { formatMessage } = this.props.intl;
    showPopUp(
      <PopUp.TwoButton
        title={formatMessage({ id: "ID_SOCIAL_ARTICLE_DELETE_TITLE" })}
        cancelButtonName={formatMessage({
          id: "ID_SOCIAL_ARTICLE_DELETE_CANCEL"
        })}
        confirmButtonName={formatMessage({
          id: "ID_SOCIAL_ARTICLE_DELETE_CONFIRM"
        })}
        confirmAction={() => {
          const { article } = this.props;
          request
            .deleteSocialArticle(article.id)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.props.onClickDelete();
                showPopUp(
                  <PopUp.OneButton
                    title={formatMessage({
                      id: "ID_SOCIAL_ARTICLE_DELETED_TITLE"
                    })}
                    buttonName={formatMessage({
                      id: "ID_SOCIAL_ARTICLE_DELETED_CONFIRM"
                    })}
                  />,
                  {
                    dismissOverlay: true,
                    dismissButton: false,
                    darkmode: true
                  }
                );
              }
            })
            .catch(err => {
              console.error(err);
            });
        }}
      />,
      {
        dismissOverlay: true,
        dismissButton: false,
        darkmode: true
      }
    );
  };

  // contents
  setDraftEditorRef = draftEditor => {
    if (draftEditor) this.draftEditor = draftEditor;
  };
  onClickContentsMore = () => {
    this.setState({ fold: false });
  };

  // reactions
  onClickLike = () => {
    if (this.lastLikeTime) {
      if (new Date().getTime() - this.lastLikeTime < 1200) {
        this.lastLikeTime = new Date().getTime();
        showPopUp(
          <PopUp.OneButton
            title={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
            })}
            buttonName={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
            })}
          />,
          { darkmode: true }
        );
        return;
      }
    }
    this.lastLikeTime = new Date().getTime();

    const { email, article } = this.props;
    if (email) {
      request
        .likeSocialArticle({ email, articleId: article.id })
        .then(res => res.json())
        .then(json => {
          const { isLiked } = json;
          this.setState(prevState => ({
            isLiked,
            likeCount: prevState.likeCount + (isLiked ? 1 : -1)
          }));
        });
    } else {
      showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
    }
  };

  // comment
  onAddNewComment = comment => {
    this.setState(prevState => ({
      comments: [].concat(
        prevState.comments,
        {
          ...comment,
          contents: JSON.parse(comment.contents),
          createdAt: dateFormatter(comment.createdAt)
        }
      ),
      commentsMax: prevState.commentsMax + 1
    }));
  };
  onClickNewReply = commentId => {
    const comments = [...this.state.comments].map(comment => ({
      ...comment,
      showNewReply: comment.showNewReply ? false : comment.id === commentId
    }));
    this.setState({ comments });
  };
  onClickSelectQuest = commentId => {
    request
      .selectSocialQuest({ articleId: this.props.article.id, commentId })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({ questEnd: true });
        }
      });
  };
  onClickCommentsMore = () => {
    const { comments } = this.state;
    let commentsMax = this.state.commentsMax + 5;
    if (commentsMax > comments.length) commentsMax = comments.length;
    this.setState({ commentsMax });
  };

  render() {
    const { email, article, onClickTag, intl } = this.props;
    const { formatMessage } = intl;
    const {
      fold,
      isLiked,
      likeCount,
      questEnd,
      comments,
      commentsMax
    } = this.state;
    const { id, title, user, articleTags, questPoint, createdAt } = article;
    const commentCount = comments.reduce(
      (prev, comment) => prev + comment.childComments.length + 1,
      0
    );
    return (
      <div className="article">
        {/* ===== 헤더 ============================== */}
        <div className="article_header">
          <div className="article_user">
            <img
              className="article_user_img"
              src={user.icon}
              alt={user.name}
              onClick={this.onClickUser}
            />
            <div className="article_user_section">
              <div className="article_user_info">
                <div className="article_user_name" onClick={this.onClickUser}>
                  {user.name}
                </div>
                {user.isOfficial && (
                  <div className="article_user_official">
                    <img
                      className="article_user_official_img"
                      src={officialIcon}
                      alt={user.name}
                    />
                  </div>
                )}

                {email !== user.email && (
                  <>
                    <div className="article_user_divider" />
                    <button
                      className={`article_user_subscribe ${
                        user.isSubscribed ? "article_user_subscribe-active" : ""
                      }`}
                      onClick={this.onClickSubscribe}
                    >
                      {user.isSubscribed
                        ? formatMessage({ id: "ID_SOCIAL_ARTICLE_SUBSCRIBED" })
                        : formatMessage({ id: "ID_SOCIAL_ARTICLE_SUBSCRIBE" })}
                    </button>
                  </>
                )}
              </div>
              <div className="article_user_date">{createdAt}</div>
            </div>
          </div>
          <img
            className="article_more"
            src={moreImg}
            alt="more"
            onClick={this.onClickMore}
          />
        </div>
        {/* ===== 태그 ============================== */}
        {articleTags && articleTags.length > 0 && (
          <div className="article_tags">
            {articleTags.map((articleTag, index) => (
              <span
                className="article_tag"
                key={index}
                onClick={() => {
                  onClickTag(articleTag.tag.name);
                }}
              >
                #{articleTag.tag.name}
              </span>
            ))}
          </div>
        )}
        {/* ===== 제목 + 퀘스트 ============================== */}
        <div className="article_title_wrapper">
          {title && title !== "" && (
            <div className="article_title">{title}</div>
          )}
          {questPoint > 0 && (
            <div
              className={`article_quest ${questEnd ? "article_quest-end" : ""}`}
            >
              {questEnd
                ? formatMessage({ id: "ID_SOCIAL_ARTICLE_QUEST_END" })
                : formatMessage(
                    { id: "ID_SOCIAL_ARTICLE_QUEST" },
                    { questPoint }
                  )}
            </div>
          )}
        </div>
        {/* ===== 콘텐츠 ============================== */}
        <div
          id={`article_contents-${id}`}
          className={`article_contents ${fold ? "article_contents-fold" : ""}`}
        >
          <DraftEditor ref={this.setDraftEditorRef} readonly={true} />
        </div>
        {fold && (
          <div
            className="article_contents_more"
            onClick={this.onClickContentsMore}
          >
            <img
              className="article_contents_more_img"
              src={arrowDownImg}
              alt="arrowDown"
            />
          </div>
        )}
        {/* ===== 액션 + 퀘스트(모바일) ============================== */}
        <div className="article_reactions">
          <div
            className="article_reaction article_reaction-like"
            onClick={this.onClickLike}
          >
            <img
              className="article_reaction_img"
              src={isLiked ? likeActiveImg : likeImg}
              alt="like"
            />
            <div className="article_reaction_count">{likeCount}</div>
          </div>
          <div
            className="article_reaction article_reaction-comment"
            onClick={this.onClickNewComment}
          >
            <img
              className="article_reaction_img"
              src={commentImg}
              alt="comment"
            />
            <div className="article_reaction_count">{commentCount}</div>
          </div>
          {/* {questPoint > 0 && (
            <div
              className={`article_quest article_quest-mobile ${
                questEnd ? "article_quest-end" : ""
              }`}
            >
              {questEnd
                ? formatMessage({ id: "ID_SOCIAL_ARTICLE_QUEST_END" })
                : formatMessage(
                    { id: "ID_SOCIAL_ARTICLE_QUEST" },
                    { questPoint }
                  )}
            </div>
          )} */}
        </div>
        {/* ===== 댓글 ============================== */}
        {comments.length > 0 && (
          <div className="article_comments">
            {comments.length > commentsMax && (
              <div
                className="article_comments_more"
                onClick={this.onClickCommentsMore}
              >
                <div className="article_comments_more_text">
                  {formatMessage({ id: "ID_SOCIAL_ARTICLE_COMMENTS_MORE" })}
                </div>
              </div>
            )}
            {comments
              .slice(
                comments.length - commentsMax > 0
                  ? comments.length - commentsMax
                  : 0,
                comments.length
              )
              .map((comment, index) => (
                <Comment
                  key={comment.id}
                  article={article}
                  comment={comment}
                  onClickNewReply={() => {
                    this.onClickNewReply(comment.id);
                  }}
                  onClickSelectQuest={this.onClickSelectQuest}
                />
              ))}
          </div>
        )}
        {email && (
          <div className="article_newComment">
            <Comment article={article} onAddNewComment={this.onAddNewComment} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(state => ({ email: state.userinfo.email }))(
  withRouter(injectIntl(Article))
);
