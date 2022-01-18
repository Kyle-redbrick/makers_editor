import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import ContextMenu from "../ContextMenu";
import { SIGNOUT_PROFILE_IMAGE } from "../../Util/Constant";
import { dateFormatter } from "../../Util/DateFormatter";
import UserIconWrapper from "../../../Common/Component/UserIconWrapper";
import moreDown from "../../../Image/more-down.svg";
import TextareaAutosize from "react-textarea-autosize";
import arrowDownImg from "../../../Image/social_arrow-down.svg";
import userDefaultImg from "../../../Image/userDefaultImg.png";
const View = props => {
  const {
    userinfo,
    comments,
    isLoggedIn,
    user,
    hasMore,
    handleLoadMore,
    handleInputChange,
    handleAddComment,
    handleSetInputTarget,
    mainInputMessage,
    subInputMessage,
    subInputTargetId,
    subInputTargetType,
    targetUser,
    handleDeleteComment,
    handleDeleteReply,
    editTargetType,
    editTargetId,
    editInputMessage,
    handleEditComment,
    handleEditReply,
    handleReportComment,
    handleReportReply,
    openedFolds,
    onClickFoldMore,
    intl,
    // handleCommentsShow,
    // isCommentsShow,
    // isMobile,
    handleInputFocus,
    commentWriteOnType
  } = props;
  return (
    <div className="CommentView">
      <div
        className={`CommentViewRight CommentViewRight__on`}
      >
        <WriteView
          type="main"
          user={user}
          inputValue={mainInputMessage}
          handleInputChange={e => handleInputChange(e, "main")}
          handleAddComment={e => handleAddComment(e, "main")}
          isLoggedIn={isLoggedIn}
          handleInputFocus={handleInputFocus}
          commentWriteOnType={commentWriteOnType}
        />
        <ul className="CommentItemList">
          {comments.map(comment => {
            comment.message = comment.isDeletedFromAdmin
              ? intl.formatMessage({
                  id: "ID_COMMENT_DELETED_FROM_ADMIN"
                })
              : comment.isDeleted
              ? intl.formatMessage({ id: "ID_COMMENT_DELETED" })
              : comment.message;
            let isFold =
              (comment.message.length > 180 ||
                comment.message.split("\n").length > 5) &&
              openedFolds &&
              !openedFolds.includes(comment.id);

            return (
              <li className="CommentItem" key={comment.id}>
                <div className="CommentItem__header">
                  {comment.user.signedOut ? (
                    <div className="UserTag SignOutUser">
                      <p className="UserTagIcon">
                        <img
                          className="UserTagIcon__img"
                          alt="user icon"
                          src={SIGNOUT_PROFILE_IMAGE}
                        />
                      </p>
                      <p className="UserTagName">
                        (<FormattedMessage id="ID_SIGNEDOUT_USER" />)
                      </p>
                    </div>
                  ) : (
                    <Link
                      to={`/userpage/${comment.user.id}`}
                      className="UserTag__link"
                    >
                      <div className="UserTag">
                        <UserIconWrapper
                          iconSrc={comment.user.icon}
                          style={{
                            width: "45px",
                            height: "45px",
                            minWidth: "45px",
                            minHeight: "45px"
                          }}
                        />
                        <span className="UserTagName">{comment.user.name}</span>
                        <div className="CommentDot" />
                        <div className="CommentItem__Info">
                          <div className="CommentItem__date">
                            {dateFormatter(comment.createdAt)}
                          </div>                          
                        </div>
                      </div>
                    </Link>
                  )}
                  {!comment.isDeleted && !comment.user.signedOut && (
                    <div className="CommentItem__headerBtnRow">
                      <ContextMenu
                        onClickEdit={
                          comment.user.email === userinfo.email &&
                          (() => {
                            props.handleSetEditTarget({
                              editTargetType: "comment",
                              editTargetId: comment.id,
                              editInputMessage: comment.message
                            });
                          })
                        }
                        onClickReport={
                          !(comment.user.email === userinfo.email) &&
                          (() => {
                            handleReportComment(comment);
                          })
                        }
                        onClickDelete={
                          comment.user.email === userinfo.email &&
                          (() => {
                            handleDeleteComment({
                              id: comment.id,
                              commentId: comment.id
                            });
                          })
                        }
                      />
                    </div>
                  )}
                </div>
                <div
                  className="CommentItem__body CommentEditForm"
                  id="EditForm"
                >
                  {editTargetType === "comment" &&
                  editTargetId === comment.id ? (
                    <EditView
                      inputValue={editInputMessage}
                      handleInputChange={e => handleInputChange(e, "edit")}
                      handleSubmit={handleEditComment}
                      handleCancel={() => {
                        props.handleSetEditTarget({
                          editTargetType: "",
                          editTargetId: null,
                          editInputMessage: ""
                        });
                      }}
                    />
                  ) : (
                    <>
                      <p
                        className={`CommentItem__content CommentItem__content__${
                          isFold ? "fold" : ""
                        }`}
                      >
                        {comment.message}
                      </p>
                      {isLoggedIn &&
                        !comment.isDeleted &&
                        !comment.user.signedOut && (
                          <p
                            className="CommentItem__replyBtn"
                            onClick={e =>
                              handleSetInputTarget(
                                e,
                                "comment",
                                comment.id,
                                comment.id,
                                null
                              )
                            }
                          >
                            <FormattedMessage id="ID_COMMENT_REPLY_BUTTON" />
                          </p>
                        )}
                      {isFold && !comment.isDeleted && (
                        <div
                          className="content__more"
                          onClick={() => onClickFoldMore(comment.id)}
                        >
                          <div className="content__more__text">
                            <FormattedMessage id="ID_SOCIAL_COMMENT_CONTENTS_MORE" />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {subInputTargetType === "comment" &&
                  comment.id === subInputTargetId ? (
                    <WriteView
                      type="sub"
                      user={user}
                      inputValue={subInputMessage}
                      handleInputChange={e => handleInputChange(e, "sub")}
                      handleAddComment={e => handleAddComment(e, "sub")}
                      isLoggedIn={isLoggedIn}
                      handleInputFocus={handleInputFocus}
                      commentWriteOnType={commentWriteOnType}
                    />
                  ) : (
                    <></>
                  )}
                  <ul className="CommentItemList">
                    {comment.replies.map(reply => {
                      reply.message = reply.isDeletedFromAdmin
                        ? intl.formatMessage({
                            id: "ID_COMMENT_DELETED_FROM_ADMIN"
                          })
                        : reply.isDeleted
                        ? intl.formatMessage({
                            id: "ID_COMMENT_DELETED"
                          })
                        : reply.message;
                      let isFold =
                        (reply.message.length > 180 ||
                          reply.message.split("\n").length > 5) &&
                        openedFolds &&
                        !openedFolds.includes(reply.id);

                      return (
                        <li className="CommentItem" key={reply.id}>
                          <div className="CommentItem__header">
                            {reply.user.signedOut ? (
                              <div className="UserTag">
                                <p className="UserTagIcon">
                                  <img
                                    className="UserTagIcon__img"
                                    alt="user icon"
                                    src={SIGNOUT_PROFILE_IMAGE}
                                  />
                                </p>
                                <p className="UserTagName">
                                  (<FormattedMessage id="ID_SIGNEDOUT_USER" />)
                                </p>
                              </div>
                            ) : (
                              <Link
                                to={`/userpage/${reply.user.id}`}
                                className="UserTag__link"
                              >
                                <div className="UserTag">
                                  <UserIconWrapper
                                    iconSrc={reply.user.icon}
                                    style={{
                                      width: "40px",
                                      height: "42px",
                                      minWidth: "40px",
                                      minHeight: "42px"
                                    }}
                                  />
                                  <p className="UserTagName">
                                    {reply.user.name}
                                  </p>
                                  <div className="CommentDot" />
                                  <div className="CommentItem__Info">
                                    <div className="CommentItem__date">
                                      {dateFormatter(reply.createdAt)}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                            {!reply.isDeleted && !reply.user.signedOut && (
                              <div className="CommentItem__headerBtnRow">
                                <ContextMenu
                                  onClickEdit={
                                    reply.user.email === userinfo.email &&
                                    (() => {
                                      props.handleSetEditTarget({
                                        editTargetType: "reply",
                                        editTargetId: reply.id,
                                        editInputMessage: reply.message
                                      });
                                    })
                                  }
                                  onClickReport={
                                    !(reply.user.email === userinfo.email) &&
                                    (() => {
                                      handleReportReply(reply);
                                    })
                                  }
                                  onClickDelete={
                                    reply.user.email === userinfo.email &&
                                    (() => {
                                      handleDeleteReply({
                                        id: reply.id,
                                        commentId: reply.id
                                      });
                                    })
                                  }
                                />
                              </div>
                            )}
                          </div>
                          <div className="CommentItem__body reply">
                            {editTargetType === "reply" &&
                            editTargetId === reply.id ? (
                              <EditView
                                inputValue={editInputMessage}
                                handleInputChange={e =>
                                  handleInputChange(e, "edit")
                                }
                                handleSubmit={handleEditReply}
                                handleCancel={() => {
                                  props.handleSetEditTarget({
                                    editTargetType: "",
                                    editTargetId: null,
                                    editInputMessage: ""
                                  });
                                }}
                              />
                            ) : (
                              <>
                                <p
                                  className={`CommentItem__content CommentItem__content__${
                                    isFold ? "fold" : ""
                                  }`}
                                >
                                  {reply.targetUser && (
                                    <span className="CommentItem__targetUser">
                                      {reply.targetUser.signedOut ? (
                                        <FormattedMessage id="ID_SIGNEDOUT_USER" />
                                      ) : (
                                        "@" + reply.targetUser.name
                                      )}
                                    </span>
                                  )}
                                  {reply.message}
                                </p>
                                {isLoggedIn &&
                                  !reply.isDeleted &&
                                  !reply.user.signedOut && (
                                    <p
                                      className="CommentItem__replyBtn"
                                      onClick={e =>
                                        handleSetInputTarget(
                                          e,
                                          "reply",
                                          reply.id,
                                          comment.id,
                                          reply.user
                                        )
                                      }
                                    >
                                      <FormattedMessage id="ID_COMMENT_REPLY_BUTTON" />
                                    </p>
                                  )}
                                {isFold && !reply.isDeleted && (
                                  <div
                                    className="content__more"
                                    onClick={() => onClickFoldMore(reply.id)}
                                  >
                                    <div className="content__more__text">
                                      <FormattedMessage id="ID_SOCIAL_COMMENT_CONTENTS_MORE" />
                                    </div>
                                    <img
                                      className="content__more__img"
                                      src={arrowDownImg}
                                      alt="arrowDown"
                                    />
                                  </div>
                                )}
                              </>
                            )}

                            {subInputTargetType === "reply" &&
                            reply.id === subInputTargetId ? (
                              <WriteView
                                type="sub"
                                user={user}
                                targetUser={targetUser}
                                inputValue={subInputMessage}
                                handleInputChange={e =>
                                  handleInputChange(e, "sub")
                                }
                                handleAddComment={e =>
                                  handleAddComment(e, "sub")
                                }
                                isLoggedIn={isLoggedIn}
                                handleInputFocus={handleInputFocus}
                                commentWriteOnType={commentWriteOnType}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
        {hasMore && (
          <div className="CommentView__loadMoreBtn" onClick={handleLoadMore}>
            <FormattedMessage id="ID_COMMENT_MOREBTN" />
            <img src={moreDown} alt="more" />
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(View);

const WriteView = injectIntl(props => {
  const {
    type,
    user,
    handleAddComment,
    handleInputChange,
    inputValue,
    isLoggedIn,
    handleButtonHeightChange,
    handleInputFocus,
    commentWriteOnType
  } = props;
  return (
    <div className={`CommentWrite ${commentWriteOnType ? "commentMode" : ""}`}>
      <div className="UserTag">
        <div>
          <UserIconWrapper
            iconSrc={isLoggedIn ? user.icon : userDefaultImg}
            userDefault={isLoggedIn ? false : true}
          />
        </div>
      </div>

      <form className="CommentWriteForm">
        <TextareaAutosize
          className="CommentWriteForm__textarea"
          onChange={handleInputChange}
          onKeyDown={handleButtonHeightChange}
          value={inputValue}
          placeholder={
            isLoggedIn
              ? props.intl.formatMessage({
                  id: "ID_COMMENT_TEXTAREA_PH"
                })
              : props.intl.formatMessage({
                  id: "ID_COMMENT_TEXTAREA_LOGIN"
                })
          }
          disabled={!isLoggedIn}
          onFocus={() => handleInputFocus(type)}
        />
         <div className={`CommentWriteForm__btnRow ${commentWriteOnType === type ? "show" : "hidden"}`}>
          <button
            id="cancelBtn"
            className="CommentWriteForm__cancelBtn"
            onClick={() => handleInputFocus('')}
          >
            {props.intl.formatMessage({
              id: "ID_COMMENT_CANCEL_BUTTON"
            })}
          </button>
          <input
            id="submitBtn"
            className={`CommentWriteForm__submitBtn submitBtn--${
              isLoggedIn ? "on" : "off"
            }`}
            type="submit"
            onClick={handleAddComment}
            value={props.intl.formatMessage({
              id: "ID_COMMENT_SUBMITBTN"
            })}
            disabled={!isLoggedIn}
          />
        </div>
      </form>
    </div>
  );
});

const EditView = injectIntl(props => {
  const {
    handleSubmit,
    handleInputChange,
    inputValue,
    targetUser,
    handleCancel
  } = props;
  return (
    <form className="CommentWriteForm EditCommentWriteForm">
      {targetUser && (
        <span className="CommentItem__targetUser">{targetUser.name}</span>
      )}
      <TextareaAutosize
        className="CommentWriteForm__textarea"
        onChange={handleInputChange}
        value={inputValue}
        placeholder={props.intl.formatMessage({
          id: "ID_COMMENT_TEXTAREA_PH"
        })}
      />
      <div
        className="CommentWriteForm__btnRow Edit"
        style={{ marginBottom: "30px" }}
      >
        <button
          className="CommentWriteForm__cancelBtn"
          id="cancleBtn"
          type="button"
          onClick={handleCancel}
        >
          {props.intl.formatMessage({ id: "ID_COMMENT_CANCEL_BUTTON" })}
        </button>
        <input
          className="CommentWriteForm__submitBtn"
          id="editBtn"
          type="submit"
          onClick={handleSubmit}
          value={props.intl.formatMessage({ id: "ID_COMMENT_EDIT_BUTTON" })}
        />
      </div>
    </form>
  );
});
