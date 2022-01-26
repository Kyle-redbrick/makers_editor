import React from "react";
import { Link } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import Game from "./Component/Game";
import Comment from "../Comment";
import "./index.scss";
import closeImg from "../../../Image/dreamclass/close-preview.svg";
import likeOnImg from "../../../Image/dreamclass/review-like-liked.svg";
import likeOffImg from "../../../Image/dreamclass/review-like.svg";
import replyIconImg from "../../../Image/dreamclass/review-comments.svg";
import shareIconImg from "../../../Image/dreamclass/review-share.svg";
import editIconImg from "../../../Image/dreamclass/review-edit.svg";
import copyProjectIconImg from "../../../Image/dreamclass/code-copy.svg";
import sirenIconImg from "../../../Image/dreamclass/review-siren.svg";
import officialIcon from "../../../Image/certification-mark.svg";

import shareCopyImg from "../../../Image/dreamclass/share_icon_copy.png";
import shareFbImg from "../../../Image/dreamclass/share_icon_fb.png";
import shareKakaoImg from "../../../Image/dreamclass/share_icon_kakao.png";

function View(props) {
  const {
    userinfo,
    project,
    handleLikeToggle,
    handleShareProject,
    handleCopyProject,
    handleEditProject,
    isLiked,
    isSubscribed,
    isShareBoxOpen,
    subscribeCount,
    handleClose,
    moveToComment,
    handleSubscribe,
    commentRef,
    handleReport,
    isDescFold,
    handleFold,
    isMobile,
    handleProjectCommentCount,
    allCommentCount,
    handleShareKakao,
    handleShareFB,
    handleCopyUrl
  } = props;
  const isMine = userinfo.email && userinfo.email === project.user.email;
  const screenMode = project.screenMode ? project.screenMode : "HORIZONTAL";

  return (
    <div id="wizappDetail">
      <div className="header__close header__close--pc" onClick={handleClose}>
        <img src={closeImg} alt="close"/>
      </div>
      <div className="wizappDetail__inner">
        <div className="wizappDetail__header">
          <div
            className="header__close header__close--mobile"
            onClick={handleClose}
          >
            <img src={closeImg} alt="close"/>
          </div>
          <div className="header__project--thumbnail">
            <img src={project.icon} alt="thumbnail" />
          </div>
          <div className="header__project--info">
            <p className="info__title">{project.name}</p>
            <p className="info__sub">
              <span className="viewCount">{project.viewCount}</span>
            </p>
          </div>
        </div>
        <div className="wizappDetail__content">
          <div className="content__game">
            <Game project={project} pId={project.pId} screenMode={screenMode} />
          </div>
          <div className="header__project--buttons">
            <div className="likeButton" onClick={handleLikeToggle}>
              <img src={isLiked ? likeOnImg : likeOffImg} alt="like" />
              <label className="CountLabel">{project.likeCount}</label>
            </div>
            <div className="replyButton" onClick={moveToComment} style={{display: "none"}}>
              <img src={replyIconImg} alt="reply" />
              <label className="CountLabel">{allCommentCount}</label>
            </div>
            {project.isCopyAllowed && (
              <div className="game__copyButton" onClick={handleCopyProject}>
                <img src={copyProjectIconImg} alt=""/>
                <label>
                  <FormattedMessage id="ID_WIZAPPDETAIL_COPY_CODE" />
                </label>
              </div>
            )}
            <div className={`shareButton ${isShareBoxOpen ? "open" : "close"}`} onClick={(e) => handleShareProject(e)}>
              <img src={shareIconImg} alt="share" />
              <label className="CountLabel">
                <FormattedMessage id="ID_WIZAPPDETAIL_SHARE" />
              </label>

              {isShareBoxOpen && 
                <div className="shareDetailBox">
                  <div onClick={() => handleShareKakao(project.pId)} className="QRPopupSNSItem">
                    <img src={shareKakaoImg} alt="share kakao" />
                    <span><FormattedMessage id="ID_WIZAPPDETAIL_SHARE_KAKAO" /></span>
                  </div>
                  <div onClick={() => handleShareFB(project.pId)} className="QRPopupSNSItem">
                    <img src={shareFbImg} alt="share fb" />
                    <span><FormattedMessage id="ID_WIZAPPDETAIL_SHARE_FACEBOOK" /></span>
                  </div>
                  <div onClick={() => handleCopyUrl(project.pId)} className="QRPopupSNSItem">
                    <img src={shareCopyImg} alt="share url" />
                    <span><FormattedMessage id="ID_WIZAPPDETAIL_SHARE_COPY_LINK" /></span>
                  </div>
                </div>
              }
            </div>
            {!isMine && (
              <div className="sirenButton" onClick={handleReport}>
                <img src={sirenIconImg} alt="siren" />
                <label className="CountLabel">
                  <FormattedMessage id="ID_WIZAPPDETAIL_SIREN" />
                </label>
              </div>
            )}
            {isMine && (
              <div className="EditButton button" onClick={handleEditProject}>
                <img src={editIconImg} alt="edit" />
                <label className="CountLabel">
                  <FormattedMessage id="ID_WIZAPPDETAIL_EDIT" />
                </label>
              </div>
            )}
          </div>

          <div className="content__user">
            <p className="content__maker__title"><FormattedMessage id="ID_WIZAPPDETAIL_MAKER_COMMENT" /></p>
            <div className="content__maker__wrapper">
              <Link
                to={`/userpage/${project.user.id}`}
                style={{ textDecoration: "none" }}
              >
                <img className="user__img" src={project.user.icon} alt="" />
                <div className="user__info__box">
                  <p className="user__name">
                    {project.user.name}
                    {userinfo.isOfficial && (
                      <img
                        className="user__officialImg"
                        src={officialIcon}
                        alt={userinfo.name}
                      />
                    )}
                  </p>
                  <p className="user__subscribe">
                    <FormattedMessage id="ID_WIZAPPDETAIL_FOLLOWER" />{" "}
                    {subscribeCount}
                    <FormattedMessage id="ID_WIZAPPDETAIL_FOLLOWER_COUNT" />
                  </p>
                </div>
              </Link>

              {!isMine && (
                <button
                  style={{display: "none"}}
                  className={`UserSubscribe UserInfo__subscribe ${isSubscribed &&
                    "subscribe"}`}
                  onClick={() => handleSubscribe(project.user.email)}
                >
                  {isSubscribed ? (
                    <FormattedMessage id="ID_WIZAPPDETAIL_FOLLOWING" />
                  ) : (
                    <FormattedMessage id="ID_WIZAPPDETAIL_DO_FOLLOW" />
                  )}
                </button>
              )}
            </div>
            <div className={`description description--${isDescFold ? "fold" : "full"}`}>
              {project.description}
            </div>
            {isDescFold && (
              <div className="description--more" onClick={() => handleFold()}>
                <FormattedMessage id="ID_WIZAPPDETAIL_VIEW_MORE" />
              </div>
            )}
          </div>
        </div>
        <div className="wizappDetail__bottom" style={{display: "none"}}>
          <p className="wizappDetail__bottom--comment-count">
            <FormattedMessage id="ID_WIZAPPDETAIL_COMMENT" />
          </p>
          <div className="wizappDetail__bottom--wrapper">
            <div className="wizappDetail__bottom--comment" ref={commentRef}>
              <Comment
                parentType="published"
                parentId={project.pId}
                allCommentCount={allCommentCount}
                isMobile={isMobile}
                handleProjectCommentCount={handleProjectCommentCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default injectIntl(View);
