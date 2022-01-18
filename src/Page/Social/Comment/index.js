import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
import DraftEditor from "../../../Common/Component/DraftEditor";
import DreamReport from "../../../Common/Component/DreamReport";
import SignIn from "../../../Common/Component/SignIn";
import Menus from "../Util/Menus";
import { dateFormatter } from "../Util/DateFormatter";
import "./index.scss";
import { spamType } from "../../../Common/Util/Constant";
import checkBlockedUser from "../../../Common/Util/CheckBlockedUser";
import moreImg from "../../../Image/social_more.svg";
import likeImg from "../../../Image/social_like.svg";
import likeActiveImg from "../../../Image/social_like-active.svg";
import mediaImageImg from "../../../Image/social_media_image.svg";
import arrowDownImg from "../../../Image/social_arrow-down.svg";
import officialIcon from "../../../Image/certification-mark.svg";

class Comment extends Component {
  constructor(props) {
    super(props);
    const { comment } = props;
    if (comment) {
      this.contents = comment.contents;
      const childComments = comment.childComments
        ? comment.childComments.map(childComment => ({
            ...childComment,
            contents: JSON.parse(childComment.contents),
            createdAt: dateFormatter(childComment.createdAt)
          }))
        : [];
      this.state = {
        readonly: true,
        fold: true && !comment.deleted,
        deleted: comment.deleted,
        isLiked: comment.isLiked,
        likeCount: comment.likeCount,
        questSelected: comment.questSelected,
        childComments,
        childCommentsMax: 2
      };
    } else {
      this.state = { readonly: false, fold: true };
    }
  }
  componentDidMount() {
    const { readonly, deleted } = this.state;
    if (readonly && !deleted) {
      this.draftEditor.setContents(this.props.comment.contents);
      setTimeout(() => {
        this.setFolding();
      }, 100);
    }
  }
  addComment = () => {
    const { formatMessage } = this.props.intl;
    const isBlocked = checkBlockedUser(this.props.user);
    if (isBlocked) {
      return;
    }

    const contents = this.draftEditor.getContents();

    if (this.draftEditor.getText().length > 1000) {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WARNNING" })}
          buttonName={formatMessage({
            id: "ID_BUILDER_ALERT_CONFIRMBTN"
          })}
        />,
        { darkmode: true, dismissButton: false }
      );

      return;
    }

    if (contents) {
      const { user, article, parentCommentId } = this.props;
      request
        .addSocialComment({
          email: user.email,
          articleId: article.id,
          parentCommentId,
          text: this.draftEditor.getText(),
          contents: JSON.stringify(contents)
        })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            if (parentCommentId) {
              this.props.onAddNewReply(json.comment);
            } else {
              this.props.onAddNewComment(json.comment);
            }
            this.draftEditor.emptyContents();
          } else {
            if (json.spam) {
              let title;
              switch (json.spam) {
                case spamType.SPAM_BAD_WORD:
                  title = "ID_SPAM_POPUP_TITLE_BAD_WORD";
                  break;
                case spamType.SPAM_DUPLICATION:
                  title = "ID_SPAM_POPUP_TITLE_DUPLICATION";
                  break;
                case spamType.SPAM_TIME:
                  title = "ID_SPAM_POPUP_TITLE_TIME";
                  break;
                default:
                  break;
              }

              showPopUp(
                <PopUp.OneButton
                  title={formatMessage({ id: title })}
                  buttonName={formatMessage({
                    id: "ID_SPAM_POPUP_CONFIRM"
                  })}
                />,
                {
                  darkmode: true,
                  dismissButton: false,
                  dismissOverlay: true
                }
              );
            }
          }
        });
    } else {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_TITLE" })}
          buttonName={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_CONFIRM" })}
        />,
        {
          dismissOverlay: true,
          dismissButton: false,
          darkmode: true
        }
      );
    }
  };
  updateComment = () => {
    const { formatMessage } = this.props.intl;
    const contents = this.draftEditor.getContents();
    if (contents) {
      request
        .updateSocialComment({
          id: this.props.comment.id,
          text: this.draftEditor.getText(),
          contents: JSON.stringify(contents)
        })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({ readonly: true }, () => {
              this.draftEditor.setContents(contents);
            });
          }
        });
    } else {
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_TITLE" })}
          buttonName={formatMessage({ id: "ID_SOCIAL_WRITE_EMPTY_CONFIRM" })}
        />,
        {
          dismissOverlay: true,
          dismissButton: false,
          darkmode: true
        }
      );
    }
  };

  // util
  setFolding = () => {
    if (this.state.readonly) {
      const { id } = this.props.comment;
      const draftEditor = document.getElementById(`comment_contents-${id}`);
      if (draftEditor) {
        const height = draftEditor.offsetHeight;
        if (height < 180) {
          this.setState({ fold: false });
        }
      }
    }
  };

  // draft
  setDraftEditorRef = draftEditor => {
    if (draftEditor) this.draftEditor = draftEditor;
  };
  onChangeContents = contents => {
    this.contents = contents;
  };

  // actions
  onClickUser = () => {
    if (this.state.readonly) {
      const { user } = this.props.comment;
      window.scrollTo(0, 0);
      this.props.history.push(`/userpage/${user.id}`);
    }
  };
  onClickContentsMore = () => {
    this.setState({ fold: false });
  };
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

    const { user, comment } = this.props;
    const { email } = user;
    if (email) {
      request
        .likeSocialComment({ email, commentId: comment.id })
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
  onClickNewReply = () => {
    const { email } = this.props.user;
    if (email) {
      this.props.onClickNewReply();
    } else {
      showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
    }
  };
  onClickSelectQuest = () => {
    const { formatMessage } = this.props.intl;
    showPopUp(
      <PopUp.TwoButton
        title={formatMessage({ id: "ID_SOCIAL_COMMENT_QUESTSELECT_TITLE" })}
        cancelButtonName={formatMessage({
          id: "ID_SOCIAL_COMMENT_QUESTSELECT_CANCEL"
        })}
        confirmButtonName={formatMessage({
          id: "ID_SOCIAL_COMMENT_QUESTSELECT_CONFIRM"
        })}
        confirmAction={() => {
          this.setState({ questSelected: true });
          this.props.onClickSelectQuest(this.props.comment.id);
        }}
      />,
      { dismissButton: false, darkmode: true }
    );
  };
  onClickCommentsMore = () => {
    const { childComments } = this.state;
    let childCommentsMax = this.state.childCommentsMax + 2;
    if (childCommentsMax > childComments.length)
      childCommentsMax = childComments.length;
    this.setState({ childCommentsMax });
  };
  onClickSubmit = () => {
    if (this.props.comment) {
      this.updateComment();
    } else {
      this.addComment();
    }
  };

  // more
  onClickMore = () => {
    if (!this.state.readonly) return;

    const menus = [];
    const { user, comment, intl } = this.props;
    const { deleted } = comment;
    const { formatMessage } = intl;
    // const shareMenu = {
    //   name: "공유하기",
    //   onClick: this.onClickShare
    // };
    // menus.push(shareMenu);
    if (!deleted && user.email === comment.user.email) {
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
  onClickUpdate = () => {
    this.setState({ readonly: false }, () => {
      this.draftEditor.setContents(this.props.comment.contents);
    });
  };
  onClickDelete = () => {
    const { formatMessage } = this.props.intl;
    showPopUp(
      <PopUp.TwoButton
        title={formatMessage({ id: "ID_SOCIAL_COMMENT_DELETE_TITLE" })}
        cancelButtonName={formatMessage({
          id: "ID_SOCIAL_COMMENT_DELETE_CANCEL"
        })}
        confirmButtonName={formatMessage({
          id: "ID_SOCIAL_COMMENT_DELETE_CONFIRM"
        })}
        confirmAction={() => {
          request
            .deleteSocialComment(this.props.comment.id)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({ fold: false, deleted: true }, () => {
                  showPopUp(
                    <PopUp.OneButton
                      title={formatMessage({
                        id: "ID_SOCIAL_COMMENT_DELETED_TITLE"
                      })}
                      buttonName={formatMessage({
                        id: "ID_SOCIAL_COMMENT_DELETED_CONFIRM"
                      })}
                    />,
                    {
                      dismissOverlay: true,
                      dismissButton: false,
                      darkmode: true
                    }
                  );
                });
              }
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
  onClickReport = () => {
    if (this.props.user.id) {
      showPopUp(
        <DreamReport
          targetType="socialComment"
          targetContentId={this.props.comment.id}
          targetUserId={this.props.comment.user.id}
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

  // events
  onAddNewReply = comment => {
    this.props.onClickNewReply();
    this.setState(prevState => ({
      childComments: [].concat(prevState.childComments, {
        ...comment,
        contents: JSON.parse(comment.contents),
        createdAt: dateFormatter(comment.createdAt)
      }),
      childCommentsMax: prevState.childCommentsMax + 1
    }));
  };

  render() {
    const {
      readonly,
      fold,
      deleted,
      isLiked,
      likeCount,
      questSelected,
      childComments,
      childCommentsMax
    } = this.state;
    const { formatMessage } = this.props.intl;
    const { id, createdAt, showNewReply } = readonly ? this.props.comment : {};
    const user = readonly ? this.props.comment.user : this.props.user;

    return (
      <div className="comment">
        <img
          className="comment_user_img"
          src={user.icon}
          alt={user.name}
          onClick={this.onClickUser}
        />
        <div className="comment_section">
          {readonly ? (
            <>
              {/* ===== 헤더 ============================== */}
              <div className="comment_header">
                <div className="comment_user_name" onClick={this.onClickUser}>
                  {user.name}
                </div>
                {user.isOfficial && (
                  <div className="comment_user_official">
                    <img
                      className="comment_user_official_img"
                      src={officialIcon}
                      alt={user.name}
                    />
                  </div>
                )}
                {/* <div className="comment_user_level">GOLD</div> */}
                {readonly && (
                  <img
                    className="comment_more"
                    src={moreImg}
                    alt="more"
                    onClick={this.onClickMore}
                  />
                )}
              </div>
              {/* ===== 콘텐츠 ============================== */}
              <div
                id={`comment_contents-${id}`}
                className={`comment_contents comment_contents-readonly ${
                  fold ? "comment_contents-fold" : ""
                }`}
              >
                {deleted ? (
                  formatMessage({ id: "ID_SOCIAL_COMMENT_DELETED" })
                ) : (
                  <DraftEditor ref={this.setDraftEditorRef} readonly={true} />
                )}
              </div>
              {fold && (
                <div
                  className="comment_contents_more"
                  onClick={this.onClickContentsMore}
                >
                  <div className="comment_contents_more_text">
                    {formatMessage({ id: "ID_SOCIAL_COMMENT_CONTENTS_MORE" })}
                  </div>
                  <img
                    className="comment_contents_more_img"
                    src={arrowDownImg}
                    alt="arrowDown"
                  />
                </div>
              )}
              {/* ===== 액션 ============================== */}
              <div className="comment_actions">
                <button className="comment_action comment_action-disabled">
                  {createdAt}
                </button>
                <img
                  className="comment_action_img"
                  src={isLiked ? likeActiveImg : likeImg}
                  alt="like"
                  onClick={this.onClickLike}
                />
                <button className="comment_action" onClick={this.onClickLike}>
                  {likeCount}
                </button>
                <button
                  className="comment_action"
                  onClick={this.onClickNewReply}
                >
                  {formatMessage({ id: "ID_SOCIAL_COMMENT_ACTIONS_REPLY" })}
                </button>
                {this.props.article.questPoint > 0 &&
                  this.props.user.email === this.props.article.user.email &&
                  this.props.user.email !== this.props.comment.user.email && (
                    <>
                      <button
                        className={`comment_action ${
                          questSelected
                            ? "comment_action-active comment_action-disabled"
                            : ""
                        }`}
                        onClick={() => {
                          if (questSelected) return;
                          this.onClickSelectQuest();
                        }}
                      >
                        {questSelected
                          ? formatMessage({
                              id: "ID_SOCIAL_COMMENT_ACTIONS_QUEST_SELECTED"
                            })
                          : formatMessage({
                              id: "ID_SOCIAL_COMMENT_ACTIONS_QUEST_SELECT"
                            })}
                      </button>
                    </>
                  )}
                {childComments.length > childCommentsMax && (
                  <button
                    className="comment_action"
                    onClick={this.onClickCommentsMore}
                  >
                    {formatMessage({ id: "ID_SOCIAL_COMMENT_COMMENTS_MORE" })}
                  </button>
                )}
              </div>
              {/* ===== 답글쓰기 ============================== */}
              {showNewReply && (
                <div className="comment_newcomment">
                  <Comment
                    intl={this.props.intl}
                    user={this.props.user}
                    article={this.props.article}
                    parentCommentId={id}
                    onAddNewReply={this.onAddNewReply}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* ===== 수정 ============================== */}
              <div className="comment_edtior">
                <DraftEditor
                  ref={this.setDraftEditorRef}
                  readonly={false}
                  onChangeContents={this.onChangeContents}
                  placeholder={formatMessage({
                    id: "ID_SOCIAL_COMMENT_PLACEHOLDER"
                  })}
                />
                <img
                  className="comment_edtior_media"
                  src={mediaImageImg}
                  alt="mediaImage"
                  onClick={() => {
                    this.draftEditor.onClickFile();
                  }}
                />
                <div
                  className="comment_edtior_submit"
                  onClick={this.onClickSubmit}
                >
                  {formatMessage({ id: "ID_SOCIAL_COMMENT_SUBMIT" })}
                </div>
              </div>
            </>
          )}
          {/* ===== 답글목록 ============================== */}
          {childComments && childComments.length > 0 && (
            <div className="comment_childcomments">
              {childComments
                .slice(
                  childComments.length - childCommentsMax,
                  childComments.length
                )
                .map((childComment, index) => (
                  <Comment
                    key={childComment.id}
                    intl={this.props.intl}
                    user={this.props.user}
                    article={this.props.article}
                    comment={childComment}
                    onClickNewReply={this.onClickNewReply}
                    onClickSelectQuest={this.props.onClickSelectQuest}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ user: state.userinfo }))(
  withRouter(injectIntl(Comment))
);
