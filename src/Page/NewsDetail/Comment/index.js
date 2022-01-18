import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import * as request from "../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../Common/Component/PopUp";
import SignIn from "../../../Common/Component/SignIn";
import "./index.scss";
import officialIcon from "../../../Image/certification-mark.svg";
import moreImg from "../../../Image/social_more.svg";
// import arrowDownImg from "../../../Image/social_arrow-down.svg";
import emptyImg from "../../../Image/empty-img.png";
import checkBlockedUser from "../../../Common/Util/CheckBlockedUser";
import DreamReport from "../../../Common/Component/DreamReport";
import Menus from "../Menus";

class Comment extends Component {
  constructor(props) {
    super(props);
    const { comment } = props;
    if (comment) {
      this.state = {
        readonly: true,
        isDeleted: comment.isDeleted,
        childComments: comment.childComments,
        message: comment.message
      };
    } else {
      this.state = {
        readonly: false,
        message: ""
      };
    }
  }
  addComment = async () => {
    const { formatMessage } = this.props.intl;
    const isBlocked = checkBlockedUser(this.props.user);
    if (isBlocked) {
      return;
    }
    if (!this.state.message) {
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
      return;
    }
    if (this.state.message.length > 1000) {
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

    const { user, newsId, parentCommentId } = this.props;

    let res = await request.createNewsReply({
      message: this.state.message,
      writerId: user.id,
      parentCommentId,
      newsId
    });
    res = await res.json();
    if (res.success) {
      if (parentCommentId) {
        this.props.onAddNewReply(res.comment);
      } else {
        this.props.onAddNewComment(res.comment);
      }
      let el = document.querySelector("#news__input");
      if (el) {
        el.value = "";
      }
    } else {
      if (res.spam) {
        this.showSpamPopup(res.spam);
        return;
      }
      showPopUp(
        <PopUp.OneButton
          title={formatMessage({ id: "ID_NEWS_COMMENT_FAIL_TITLE" })}
          buttonName={formatMessage({ id: "ID_NEWS_COMMENT_FAIL_CONFIRM" })}
        />,
        {
          dismissOverlay: true,
          dismissButton: false,
          darkmode: true
        }
      );
    }
  };
  updateComment = async () => {
    const { formatMessage } = this.props.intl;
    if (this.state.message) {
      let res = await request.updateNewsReply({
        message: this.state.message,
        commentId: this.props.comment.id
      });
      res = await res.json();
      if (res.success) {
        this.setState({ readonly: true }, () => {
          this.setState({ message: this.state.message });
        });
      } else {
        if (res.spam) {
          this.showSpamPopup(res.spam);
          return;
        }
        showPopUp(
          <PopUp.OneButton
            title={formatMessage({ id: "ID_NEWS_COMMENT_UPDATE_FAIL_TITLE" })}
            buttonName={formatMessage({ id: "ID_NEWS_COMMENT_FAIL_CONFIRM" })}
          />,
          {
            dismissOverlay: true,
            dismissButton: false,
            darkmode: true
          }
        );
      }
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
  onChangeComment = e => {
    this.setState({ message: e.target.value });
  };

  // actions
  onClickUser = () => {
    if (this.state.readonly) {
      const { writer } = this.props.comment;
      window.scrollTo(0, 0);
      this.props.history.push(`/userpage/${writer.id}`);
    }
  };

  //답글 달기 버튼 눌렀을때
  onClickNewReply = () => {
    const { email } = this.props.user;
    if (email) {
      this.props.onClickNewReply();
    } else {
      showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
    }
  };
  onClickCommentsMore = () => {};
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
    const { isDeleted } = comment;
    const { formatMessage } = intl;
    if (!isDeleted && user.id === comment.writer.id) {
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
    } else {
      const reportMenu = {
        name: formatMessage({ id: "ID_SOCIAL_MORE_REPORT" }),
        onClick: this.onClickReport
      };
      menus.push(reportMenu);
    }

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
    this.setState({ readonly: false });
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
        confirmAction={async () => {
          let res = await request.deleteNewsReply({
            commentId: this.props.comment.id
          });
          res = await res.json();
          if (res.success) {
            this.setState({ isDeleted: true }, () => {
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
          } else {
            showPopUp(
              <PopUp.OneButton
                title={formatMessage({
                  id: "ID_NEWS_COMMENT_DELETE_FAIL_TITLE"
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
          }
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
          targetType="newsComment"
          targetContentId={this.props.comment.pId}
          targetUserId={this.props.comment.writer.id}
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
  //  답글 작성 완료 버튼 누르고 서버 데이터 생성했을때
  onAddNewReply = comment => {
    this.props.onClickNewReply();
    this.setState(prevState => {
      return {
        childComments: [].concat(prevState.childComments, [comment])
      };
    });
  };

  showSpamPopup = message => {
    let warning;
    const { formatMessage } = this.props.intl;

    switch (message) {
      case "badWord":
        warning = formatMessage({
          id: "ID_SPAM_POPUP_TITLE_BAD_WORD"
        });
        break;

      case "duplication":
        warning = formatMessage({
          id: "ID_SPAM_POPUP_TITLE_DUPLICATION"
        });

        break;
      case "time":
        warning = formatMessage({ id: "ID_SPAM_POPUP_TITLE_TIME" });
        break;
      default:
        warning = formatMessage({ id: "ID_SPAM_POPUP_TITLE_TIME" });
        break;
    }
    showPopUp(
      <PopUp.OneButton
        title={warning}
        buttonName={formatMessage({ id: "ID_SPAM_POPUP_CONFIRM" })}
      />,
      {
        dismissOverlay: true,
        dismissButton: false,
        darkmode: true
      }
    );
  };

  render() {
    const { readonly, isDeleted, childComments, message } = this.state;
    const { formatMessage } = this.props.intl;
    const { id, showNewReply } = readonly ? this.props.comment : {};
    const user = readonly ? this.props.comment.writer : this.props.user;
    const isLoginUser = this.props.user.email;
    return (
      <div className="comment">
        <img
          className="comment_user_img"
          src={!this.props.notLoginUser ? user.icon : emptyImg}
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
                {/* ===== 액션 ============================== */}
                <div className="comment_actions">
                  <button
                    className="comment_action"
                    onClick={this.onClickNewReply}
                  >
                    {formatMessage({ id: "ID_NEWS_COMMENT_ACTIONS_REPLY" })}
                  </button>
                </div>
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
                className={`comment_contents comment_contents-readonly`}
              >
                {isDeleted
                  ? formatMessage({ id: "ID_SOCIAL_COMMENT_DELETED" })
                  : message}
              </div>

              {/* ===== 답글쓰기 ============================== */}
              {showNewReply && (
                <div className="comment_newcomment">
                  <Comment
                    intl={this.props.intl}
                    user={this.props.user}
                    newsId={this.props.newsId}
                    parentCommentId={id}
                    onAddNewReply={this.onAddNewReply}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* ===== 수정 ============================== */}
              <div className="comment_editor">
                {/* <input
                  type="text"
                  value={message}
                  id="news__input"
                  onChange={this.onChangeComment}
                /> */}
                {isLoginUser ? (
                  <textarea
                    value={message}
                    id="news__input"
                    onChange={this.onChangeComment}
                    placeholder="댓글을 작성해 주세요"
                  />
                ) : (
                  <textarea
                    id="news__input"
                    placeholder="로그인 후 댓글을 쓰실 수 있습니다."
                    readOnly
                  />
                )}
                <div
                  className="comment_editor_submit"
                  onClick={isLoginUser && this.onClickSubmit}
                >
                  <span>{formatMessage({ id: "ID_NEWS_COMMENT_SUBMIT" })}</span>
                </div>
              </div>
            </>
          )}
          {/* ===== 대댓글 ============================== */}
          {childComments && childComments.length > 0 && (
            <div className="comment_childcomments">
              {childComments.map((childComment, index) => {
                return (
                  <Comment
                    key={childComment.id}
                    newsId={this.props.newsId}
                    comment={childComment}
                    intl={this.props.intl}
                    user={this.props.user}
                    onClickNewReply={this.onClickNewReply}
                  />
                );
              })}
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
