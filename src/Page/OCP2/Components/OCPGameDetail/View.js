import React from "react";
import downloadImg from "../../Assets/icon-download-inActive.svg";
import activeDownloadImg from "../../Assets/icon-download-active.svg";
import resetIcon from "../../Assets/icon-reset.svg";
// import linkArrowIcon from "../../Assets/icon-link-event.svg";
import linkExitIcon from "../../Assets/icon-link-exit.svg";
import moreIcon from "../../Assets/icon-more.svg";
import "./index.scss";
import { OCPGame } from "../../../../Common/Util/Constant";
import { FormattedMessage } from "react-intl";
import chromeBtnImage from "../../../../Image/chrome-download.png";
import fullBtnIcon from "../../Assets/icon-fullscreen.svg";
import { detectIE } from "../../../../Common/Util/detectBrowser";
import reviewEventMobile from "../../Assets/banner-reviewEvent-mobile.png";
import reviewEventPC from "../../Assets/banner-reviewEvent-pc.png";

export default function View(props) {
  const {
    mission,
    isShowGameDetail,
    handleGameDetailBack,
    stages,
    userinfo,
    onClickStage,
    onClickStartStage,
    onClickEventLink,
    commentText,
    handleCommentChange,
    onClickCommentTextArea,
    comments,
    onClickComment,
    onClickReport,
    onClickDelete,
    onClickCertification,
    onClickReset,
    isCommentValid,
    commentCount,
    onClickMore,
    onClickSignIn,
    onClickFullScreen,
    isShowFullScreen
  } = props;
  if (!mission) return <></>;
  const { grade, gameSrc } = mission;
  const gradeText =
    grade === "beginner" ? "초급" : grade === "intermediate" ? "중급" : "고급";

  const isActiveDownload = mission.level === 10;

  let placeholder = "모든 미션을 클리어한 후 댓글을 작성할 수 있습니다";
  if (mission && mission.level === 10) {
    if (userinfo.email) {
      placeholder = "댓글을 작성해 주세요";
    } else {
      placeholder = "로그인 후 댓글을 쓰실 수 있습니다";
    }
  }
  return (
    <div
      className={`OCPGameDetail ${isShowGameDetail && "OCPGameDetail-visible"}`}
    >
      <div
        className={`OCPGameDetail_Overlay ${isShowFullScreen &&
          "OCPGameDetail_Overlay-fullscreen"}`}
        onClick={() => {
          if (isShowFullScreen) return;
          handleGameDetailBack();
        }}
      >
        {isShowFullScreen && (
          <div className="OCPGameDetail_Game_Inner-fullscreen">
            <iframe
              className="OCPGameDetail_Game_IFrame"
              title="wizlab"
              src={gameSrc && gameSrc}
              scrolling="yes"
              frameBorder="0"
            />
            <div
              className="OCPGameDetail-fullScreenBtn"
              onClick={onClickFullScreen}
            >
              <img src={fullBtnIcon} alt="full-btn" />
            </div>
          </div>
        )}
      </div>
      <div className="OCPGameDetail_Container">
        <div
          className="OCPGameDetail_Container-exit-mobile"
          onClick={handleGameDetailBack}
        >
          <img src={linkExitIcon} alt="img" />
        </div>
        <div className="OCPGameDetail_Container_inner">
          <div className="OCPGameDetail-title">{`${OCPGame[mission.gameType].title} ${gradeText}미션`}</div>
          <div className="OCPGameDetail_bottom">
            <div className="OCPGameDetail_bottom-description">
              {mission.title}
            </div>
            <div className="OCPGameDetail_bt_right">
              {mission.guide && (
                <div className="OCPGameDetail_bottom_download">
                  <a
                    className="download"
                    href={mission.guide}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    수업지원도구
                  </a>
                  <img src={downloadImg} alt="download" />
                </div>
              )}
              <div
                className="OCPGameDetail_Container-exit"
                onClick={handleGameDetailBack}
              >
                <img src={linkExitIcon} alt="img" />
              </div>
            </div>
          </div>
          <section className="OCPGameDetail_Game">
            {detectIE() ? (
              <div className="BlockedNoti">
                <div className="BlockedNoti__inner">
                  <p className="BlockedNoti__text">
                    <FormattedMessage id="ID_BROWSER_BLOCK_TEXT1" />
                  </p>
                  <p className="BlockedNoti__text">
                    <FormattedMessage id="ID_BROWSER_BLOCK_TEXT2" />
                  </p>
                  <a
                    href={"https://www.google.com/chrome/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="BlockedNoti__chromeBtn"
                      src={chromeBtnImage}
                      alt="download-chrome"
                    />
                  </a>
                </div>
              </div>
            ) : (
              <div className="OCPGameDetail_Game_Inner">
                <iframe
                  className="OCPGameDetail_Game_IFrame"
                  title="wizlab"
                  src={gameSrc && gameSrc}
                  scrolling="yes"
                  frameBorder="0"
                />
                <div
                  className="OCPGameDetail-fullScreenBtn"
                  onClick={onClickFullScreen}
                >
                  <img src={fullBtnIcon} alt="full-btn" />
                </div>
              </div>
            )}
          </section>

          <section className="OCPGameDetail_stages">
            <div className="OCPGameDetail_st_titles">
              <div
                onClick={() => {
                  onClickStartStage();
                }}
                className={`OCPGameDetail_st_tl-title`}
              >
                도전시작!
              </div>
              <div className="OCPGameDetail_st_tl_bottom">
                <div className="OCPGameDetail_st_tl-description">
                  위즈랩 회원은 언제든 "이어하기"를 할 수 있어요
                  {!userinfo.email && (
                    <span
                      onClick={onClickSignIn}
                      className="OCPGameDetail_st_tl-signin"
                    >
                      로그인
                    </span>
                  )}
                </div>
              </div>

              {!userinfo.email && (
                <div
                  onClick={onClickReset}
                  className="OCPGameDetail_st_tl-reset"
                >
                  Reset
                  <img src={resetIcon} alt="reset" />
                </div>
              )}
            </div>
            <div className="OCPGameDetail_st_itemwrap-pc">
              {[...stages, -1].map((item, index) => {
                const isLast = item === -1;
                const isClear =
                  !isLast && mission.level && item.level <= mission.level;
                const isLineActive =
                  mission.level && item.level < mission.level;

                let isEnable = false;
                if (mission.level) {
                  if (mission.level === 0) {
                    isEnable = item.level === 0;
                  } else {
                    isEnable = item.level === mission.level + 1;
                  }
                } else {
                  isEnable = index === 0;
                }
                return (
                  <div
                    key={`OCPGameDetail_st_iw-${index}`}
                    className="OCPGameDetail_st_iw"
                  >
                    <div
                      className={`OCPGameDetail_st_iw-round ${isClear &&
                        "OCPGameDetail_st_iw-round-clear"}  ${isLast &&
                        "OCPGameDetail_st_iw-round-last"} ${isEnable &&
                        "OCPGameDetail_st_iw-round-enable"}`}
                      onClick={() => {
                        if (isLast) {
                          onClickCertification(isActiveDownload);
                        } else {
                          onClickStage(item.level);
                        }
                      }}
                    >
                      {!isLast ? (
                        item.level
                      ) : (
                        <img
                          src={
                            isActiveDownload ? activeDownloadImg : downloadImg
                          }
                          alt="img"
                        />
                      )}
                    </div>
                    {item !== -1 && (
                      <hr
                        className={`OCPGameDetail_st_iw-line ${isLineActive &&
                          "OCPGameDetail_st_iw-line-active"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="OCPGameDetail_st_itemwrap-mobile">
              {stages.map((item, index) => {
                const isClear = mission.level && item.level <= mission.level;
                const isLineActive =
                  mission.level && item.level < mission.level;
                let isEnable = false;
                if (mission.level) {
                  if (mission.level === 0) {
                    isEnable = item.level === 0;
                  } else {
                    isEnable = item.level === mission.level + 1;
                  }
                } else {
                  isEnable = index === 0;
                }
                const isShowLine = index % 5 !== 4;
                const innerWidth = window.innerWidth - 20 * 2;
                const itemWidth = (innerWidth - 40 * 4) / 5;
                const style = {};
                style["width"] = `${itemWidth}px`;
                style["height"] = `${itemWidth}px`;

                return (
                  <div
                    key={`OCPGameDetail_st_iw-${index}`}
                    className="OCPGameDetail_st_iw"
                  >
                    <div
                      id={`OCPGameDetail_st_iw-mobile-round-${index}`}
                      style={style}
                      className={`OCPGameDetail_st_iw-round ${isClear &&
                        "OCPGameDetail_st_iw-round-clear"} ${isEnable &&
                        "OCPGameDetail_st_iw-round-enable"}`}
                      onClick={() => {
                        onClickStage(item.level, true);
                      }}
                    >
                      {item.level}
                    </div>
                    {isShowLine && (
                      <hr
                        className={`OCPGameDetail_st_iw-line ${isLineActive &&
                          "OCPGameDetail_st_iw-line-active"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => {
                onClickCertification(isActiveDownload);
              }}
              className="OCPGameDetail_st_itemwrap-mobile-download"
            >
              <img
                src={isActiveDownload ? activeDownloadImg : downloadImg}
                alt="img"
              />
              인증서 다운로드
            </div>
          </section>

          <section onClick={onClickEventLink} className="OCPGameDetail_event">
            <img
              className="OCPGameDetail_ev-banner-pc"
              src={reviewEventPC}
              alt="img"
            />
            <img
              className="OCPGameDetail_ev-banner-mobile"
              src={reviewEventMobile}
              alt="img"
            />
          </section>
          <section className="OCPGameDetail_comment">
            <div className="OCPGameDetail_cm_container">
              <div className="OCPGameDetail_cm_ct_comment">
                <div
                  className="OCPGameDetail_cm_ct_cm_leftWrap"
                  onClick={onClickCommentTextArea}
                >
                  <textarea
                    type="text"
                    value={commentText}
                    onChange={handleCommentChange}
                    readOnly={!userinfo.email || mission.level !== 10}
                    placeholder={placeholder}
                    maxLength={500}
                    disabled
                  />
                  <div className="OCPGameDetail_cm_ct_cm_lw-textCount">
                    {`(${
                      commentText ? String(commentText.length) : "0"
                    } / 500자)`}
                  </div>
                </div>
              </div>
              <div className="OCPGameDetail_cm_ct_bottomWrap">
                <div
                  onClick={onClickComment}
                  className="OCPGameDetail_cm_ct_submitBtn"
                >
                  댓글 달기
                </div>
                <div
                  className={`OCPGameDetail_cm_ct-commentValidation ${!isCommentValid &&
                    "OCPGameDetail_cm_ct-commentValidation-active"}`}
                >
                  내용을 작성해주세요
                </div>
              </div>
              {commentCount && (
                <div className="OCPGameDetail_cm_ct-commentCount">{`현재 ${commentCount}명이 참여하고 있습니다.`}</div>
              )}

              <div className="OCPGameDetail_cm_ct_comments">
                {comments.map((comment, index) => (
                  <div
                    key={`OCPGameDetail_cm_ct_comments-${index}`}
                    className="OCPGameDetail_cm_ct_cms_item"
                    style={
                      index === comments.length - 1
                        ? { marginBottom: "0px" }
                        : {}
                    }
                  >
                    <img src={comment.user.icon} alt="img" />
                    <div className="OCPGameDetail_cm_ct_cms_item_rightWrap">
                      <div className="OCPGameDetail_cm_ct_cms_item_rw_leftContents">
                        <div className="OCPGameDetail_cm_ct_cms_item_rw_top">
                          <div className="OCPGameDetail_cm_ct_cms_item_rw_top-nikname">
                            {comment.user.name}
                          </div>

                          <div className="OCPGameDetail_cm_ct_cms_item_rw_top_timeInfo">
                            {comment.interval}
                          </div>
                        </div>
                        <div className="OCPGameDetail_cm_ct_cms_item_rw-content">
                          {comment.content}
                        </div>
                      </div>

                      {userinfo.email && (
                        <div
                          onClick={() => {
                            comment.email === userinfo.email
                              ? onClickDelete(comment)
                              : onClickReport(comment);
                          }}
                          className="OCPGameDetail_cm_ct_cms_item_rw-rightBtn"
                        >
                          {comment.email === userinfo.email ? "삭제" : "신고"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                onClick={onClickMore}
                className="OCPGameDetail_cm_ct-moreBtn"
              >
                <img src={moreIcon} alt="img" />
                더보기
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
