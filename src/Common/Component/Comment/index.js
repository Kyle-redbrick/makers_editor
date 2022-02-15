import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../Util/HTTPRequest";
// import { showReport } from "../../Util/AlertManager";
import View from "./View";
import "./index.scss";
import { spamType } from "../../Util/Constant";
import checkBlockedUser from "../../Util/CheckBlockedUser";
import { injectIntl } from "react-intl";
import PopUp, { showPopUp } from "../PopUp";
import DreamReport from "../DreamReport";

class Comment extends Component {
  limit = 10;

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      parentType: props.parentType,
      parentId: props.parentId,
      mainInputMessage: "",
      subInputMessage: "",
      subInputTargetId: "",
      subInputTargetType: "",
      parentCommentId: "",
      targetUser: null,
      editTargetType: "",
      editTargetId: null,
      editInputMessage: "",
      openedFolds: [],
      commentHeight: "",
      commentWriteOnType: ''
    };
  }

  componentDidMount() {
    this.setState(
      {
        parentType: this.props.parentType,
        parentId: this.props.parentId,
      },
      () => {
        this.fetchComments();
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentId !== this.props.parentId) {
      this.setState(
        {
          parentType: this.props.parentType,
          parentId: this.props.parentId,
        },
        () => {
          this.fetchComments();
        }
      );
    }
  }

  fetchComments() {
    const { parentType, parentId, comments } = this.state;
    const limit = this.limit;
    const offset = comments.length;
    const params = {
      parentType,
      parentId,
      limit,
      offset,
    };
    request
      .getComments(params)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          comments: json,
        });
      })
      .catch((e) => console.error(e));
  }

  getMoreComments() {
    const { parentType, parentId, comments } = this.state;
    const limit = this.limit;
    const offset = comments.length;
    const params = {
      parentType,
      parentId,
      limit,
      offset,
    };
    request
      .getComments(params)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          comments: [...this.state.comments, ...json],
        });
      })
      .catch((e) => console.error(e));
  }

  handleLoadMore = (e) => {
    e.preventDefault();
    this.getMoreComments();
  };

  handleInputFocus = (type) => {
    this.setState({ commentWriteOnType : type })
  }

  handleAddComment = (e, type) => {
    e.preventDefault();

    const isBlocked = checkBlockedUser(this.props.userinfo);
    if (isBlocked) {
      return;
    }

    const { parentType, parentId, mainInputMessage, subInputMessage, parentCommentId, targetUser } = this.state;
    const { formatMessage } = this.props.intl;
    const email = this.props.userinfo.email;
    let params = { parentType, parentId, email };
    if (type === "main") {
      params.message = mainInputMessage;
      if (!params.message || params.message.length < 2) {
        return;
      }
      request
        .postComment(params)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            json.user = this.props.userinfo;
            json.replies = [];
            this.setState(
              {
                comments: [json, ...this.state.comments],
                mainInputMessage: "",
              },
              () => {
                this.props.handleProjectCommentCount(this.props.allCommentCount + 1);
              }
            );
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
                    id: "ID_SPAM_POPUP_CONFIRM",
                  })}
                />,
                {
                  darkmode: true,
                  dismissButton: false,
                  dismissOverlay: true,
                }
              );
            }
          }
        })
        .catch((e) => console.error(e));
    } else if (type === "sub") {
      params.message = subInputMessage;
      params.commentId = parentCommentId;
      if (targetUser) {
        params.targetEmail = targetUser.email;
      }
      if (!params.message || params.message.length < 2) {
        return;
      }
      request
        .postReply(params)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            json.user = this.props.userinfo;
            json.targetUser = targetUser;
            this.setState({
              comments: this.state.comments.map((item) => {
                if (item.id === params.commentId) {
                  return { ...item, replies: [json, ...item.replies] };
                }
                return item;
              }),
              subInputTargetId: "",
              subInputMessage: "",
              parentCommentId: "",
              targetUser: null,
            });
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
                    id: "ID_SPAM_POPUP_CONFIRM",
                  })}
                />,
                {
                  darkmode: true,
                  dismissButton: false,
                  dismissOverlay: true,
                }
              );
            }
          }
        })
        .catch((e) => console.error(e));
    }
  };

  handleDeleteComment = async ({ id } = {}) => {
    try {
      await request.deleteComment({ id }).then((res) => res.json());
      this.setState((state) => ({
        comments: state.comments.map((item) => {
          if (item.id === id) {
            item.isDeleted = true;
            return item;
          } else {
            return item;
          }
        }),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  handleDeleteReply = async ({ id, commentId } = {}) => {
    try {
      await request.deleteReply({ id }).then((res) => res.json());
      this.setState((state) => ({
        comments: state.comments.map((item) => {
          if (item.id === commentId) {
            return {
              ...item,
              replies: item.replies.map((reply) => {
                if (reply.id === id) {
                  reply.isDeleted = true;
                  return reply;
                } else {
                  return reply;
                }
              }),
            };
          } else {
            return item;
          }
        }),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  handleInputChange = (e, type) => {
    if (type === "main") {
      this.setState({ mainInputMessage: e.target.value });
    } else if (type === "sub") {
      this.setState({ subInputMessage: e.target.value });
    } else if (type === "edit") {
      this.setState({ editInputMessage: e.target.value });
    }
  };

  handleSetInputTarget = (e, subInputTargetType, subInputTargetId, parentCommentId, targetUser) => {
    e.preventDefault();
    this.setState({
      subInputTargetType,
      subInputTargetId,
      parentCommentId,
      targetUser,
    });
  };

  handleSetEditTarget = ({ editTargetType, editTargetId, editInputMessage } = {}) => {
    this.setState({
      editTargetType,
      editTargetId,
      editInputMessage,
    });
  };

  handleEditComment = async (e) => {
    e.preventDefault();
    const { editInputMessage, editTargetId } = this.state;
    if (editInputMessage < 2) {
      return;
    }
    try {
      await request.editComment({ id: editTargetId, message: editInputMessage }).then((res) => res.json());
      this.setState((state) => ({
        editTargetType: "",
        editTargetId: null,
        editInputMessage: "",
        comments: state.comments.map((item) => {
          if (item.id === editTargetId) {
            item.message = editInputMessage;
          }
          return item;
        }),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  handleEditReply = (e) => {
    e.preventDefault();
    const { editInputMessage, editTargetId } = this.state;
    if (editInputMessage < 2) {
      return;
    }
    try {
      request
        .editReply({ id: editTargetId, message: editInputMessage })
        .then((res) => res.json())
        .then((json) => {
          this.setState(
            (state) => ({
              editTargetType: "",
              editTargetId: null,
              editInputMessage: "",
              comments: state.comments.map((item) => {
                if (item.replies.find((reply) => reply.id === editTargetId)) {
                  return {
                    ...item,
                    replies: item.replies.map((reply) => {
                      if (reply.id === editTargetId) {
                        reply.message = editInputMessage;
                      }
                      return reply;
                    }),
                  };
                } else {
                  return item;
                }
              }),
            }),
            () => {
              // console.log(this.state);
            }
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  handleReportComment = comment => {
    showPopUp(
      <DreamReport
        targetType="gameComment"
        targetContentId={comment.id}
        targetUserId={comment.user.id}
      />,
      { darkmode: true, dismissButton: false }
    );
  }
  handleReportReply = reply => {
    showPopUp(
      <DreamReport
        targetType="gameReply"
        targetContentId={reply.id}
        targetUserId={reply.user.id}
      />,
      { darkmode: true, dismissButton: false }
    );
  }

  onClickFoldMore = (commentId) => {
    this.setState({ openedFolds: [...this.state.openedFolds, commentId] });
  };

  handleCommentsShow = () => {
    this.setState({ isCommentsShow: !this.state.isCommentsShow });
  };

  render() {
    const {
      comments,
      subInputTargetId,
      subInputTargetType,
      mainInputMessage,
      targetUser,
      openedFolds,
      isCommentsShow,
      commentWriteOnType
    } = this.state;
    const hasMore = this.props.allCommentCount > comments.length;
    return (
      <View
        comments={comments}
        allCommentCount={this.props.allCommentCount}
        hasMore={hasMore}
        handleLoadMore={this.handleLoadMore}
        handleAddComment={this.handleAddComment}
        handleInputChange={this.handleInputChange}
        handleSetInputTarget={this.handleSetInputTarget}
        mainInputMessage={mainInputMessage}
        subInputTargetId={subInputTargetId}
        subInputTargetType={subInputTargetType}
        isLoggedIn={!!this.props.userinfo.email}
        user={this.props.userinfo}
        targetUser={targetUser}
        handleDeleteComment={this.handleDeleteComment}
        handleDeleteReply={this.handleDeleteReply}
        userinfo={this.props.userinfo}
        handleSetEditTarget={this.handleSetEditTarget}
        editTargetType={this.state.editTargetType}
        editTargetId={this.state.editTargetId}
        editInputMessage={this.state.editInputMessage}
        handleEditComment={this.handleEditComment}
        handleEditReply={this.handleEditReply}
        handleReportComment={this.handleReportComment}
        handleReportReply={this.handleReportReply}
        openedFolds={openedFolds}
        onClickFoldMore={this.onClickFoldMore}
        handleCommentsShow={this.handleCommentsShow}
        isMobile={this.props.isMobile}
        isCommentsShow={isCommentsShow}
        handleButtonHeightChange={this.handleButtonHeightChange}
        commentWriteOnType={commentWriteOnType}
        handleInputFocus={this.handleInputFocus}
      />
    );
  }
}

export default connect(
  (state) => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Comment));
