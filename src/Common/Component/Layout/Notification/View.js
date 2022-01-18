import React from "react";
import moment from "moment";
import UserIconWrapper from "../../../../Common/Component/UserIconWrapper";
import { FormattedMessage } from "react-intl";
import "./index.scss";

export default function View(props) {
  const {
    notifications,
    handleOnClickMore,
    handleOnClickItem,
    isListEnded,
    // onClickNotification
  } = props;

  return (
    <div className="NotiPopup">
      {/* <img
        className="NotiClose"
        src={closeImg}
        alt="close"
        onClick={onClickNotification}
      /> */}
      <div className="NotiContent">
        {notifications.map((noti, index) => {
          const icon = getIcon(noti);
          const message = getMessage(noti);
          const createdAt = moment(noti.createdAt).format("YYYY-MM-DD HH:mm");
          const clickable = isClickable(noti);
          return (
            <div
              key={index}
              className={`NotiItem ${clickable && "NotiItemCursor"}`}
              onClick={() => handleOnClickItem(noti)}
            >
              {icon.type === "user" ? (
                <div className="NotiItemIcon NotiItemUsericon">
                  <UserIconWrapper iconSrc={icon.icon} />
                </div>
              ) : (
                <div
                  className="NotiItemIcon NotiItemProjecticon"
                  style={{ backgroundImage: `url('${icon.icon}')` }}
                />
              )}

              <div className="NotiItemInfo">
                <div className="NotiItemMsg">{message}</div>
                <div className="NotiItemDate">{createdAt}</div>
              </div>
            </div>
          );
        })}
        {!isListEnded && notifications.length > 0 && (
          <div className="NotiItemMore" onClick={handleOnClickMore}>
            <FormattedMessage id="ID_NOTI_MORE" />
          </div>
        )}
        {notifications.length === 0 && (
          <div className="NotiEmpty">
            <FormattedMessage id="ID_NOTI_EMPTY" />
          </div>
        )}
      </div>
    </div>
  );
}

function getMessage(noti) {
  const { type, message, targetUser, targetProject } = noti;
  switch (type) {
    case "notice":
      return message;
    case "publishedComment":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_PUBLISHED_COMMENT" 
          values={{ targetUser : targetUser ? targetUser.name : "",  targetProject: targetProject ? targetProject.name : "" }}
        />
      );
    case "publishedReply":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_PUBLISHED_REPLY" 
          values={{ targetUser : targetUser ? targetUser.name : "",  targetProject: targetProject ? targetProject.name : "" }}
        />
      );
    case "articleComment":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_ARTICLE_COMMENT" 
          values={{ targetUser : targetUser ? targetUser.name : "",  targetCommunityArticle: noti.targetCommunityArticle ? noti.targetCommunityArticle.title : "" }}
        />
      );
    case "articleReply":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_ARTICLE_REPLY" 
          values={{ targetUser : targetUser ? targetUser.name : "",  targetCommunityArticle: noti.targetCommunityArticle ? noti.targetCommunityArticle.title : "" }}
        />
      );
    case "like":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_LIKE" 
          values={{ targetUser : targetUser ? targetUser.name : "", targetProject : targetProject ? targetProject.name : "" }}
        />
      );
    case "playCount":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_PLAY_COUNT" 
          values={{ targetProject: targetProject ? targetProject.name : "", message: message }}
        />
      );
    case "subscribe":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_SUBSCRIBE" 
          values={{ targetUser : targetUser ? targetUser.name : "" }}
        />
      );
    case "newApp":
      return (
        <FormattedMessage 
          id="ID_LAYOUT_NOTI_NEWAPP" 
          values={{ targetUser : targetUser ? targetUser.name : "", targetProject : targetProject ? targetProject.name : "" }}
        />
      );
    case "custom":
      return message;
    case "socialReply":
    case "commentReply":
      return <FormattedMessage id="ID_LAYOUT_NOTI_REPLY" targetUser={targetUser.name} message={message}/>;
    default:
      return <FormattedMessage id="ID_LAYOUT_NOTI_DEFAULT" />;
  }
}

function getIcon(noti) {
  const { type, targetUser, targetProject } = noti;
  try {
    switch (type) {
      case "publishedComment":
      case "publishedReply":
      case "articleComment":
      case "articleReply":
      case "like":
      case "subscribe":
        return { icon: targetUser.icon, type: "user" };
      case "newApp":
      case "playCount":
        return { icon: targetProject.icon, type: "project" };
      default:
        return {
          icon:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/wizschool_noti_logo.png",
          type: "default"
        };
    }
  } catch (e) {
    return {
      icon:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/wizschool_noti_logo.png",
      type: "default"
    };
  }
}

function isClickable(noti) {
  // const { type } = noti;
  // switch (type) {
  //   case "publishedComment":
  //   case "publishedReply":
  //   case "articleComment":
  //   case "articleReply":
  //   case "like":
  //   case "subscribe":
  //   case "newApp":
  //   case "playCount":
  //   ca
  //     return true;
  //   default:
  //     return false;
  // }
  return true;
}
