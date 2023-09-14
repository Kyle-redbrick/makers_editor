import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import moment from "moment";
import heartIcon from "../../../../Image/heart.svg";
import commentIcon from "../../../../Image/comment.svg";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import IconHeart from "../../../../Image/icon-heart.svg";
import IconEyes from "../../../../Image/icon-eyes.svg";
import "./index.scss";

export default function View(props) {
  const {
    intl,
    mode,
    count,
    isMyPage,
    publisheds,
    onClickPublishedSetting,
    handleProjectLive,
  } = props;

  return (
    <div className="Publish">
      <p className="title">
        <FormattedMessage id="ID_MYPAGE_TABTAPE_PUBLISH" />
        <div className="Publish__list-length">{publisheds.length}</div>
      </p>
      {publisheds.length > 0 ? (
        <div className="Publish_GridContainer">
          {publisheds.map((published, index) => (
            <PublishItem
              key={index}
              isMyPage={isMyPage}
              published={published}
              onClickPublishedSetting={onClickPublishedSetting}
              intl={intl}
              handleProjectLive={handleProjectLive}
            />
          ))}
        </div>
      ) : (
        <div className="noPublish">
          {intl.formatMessage({ id: "ID_MYPAGE_PUBLISH_NOTHING" })}
        </div>
      )}
    </div>
  );
}

const PublishItem = (props) => {
  const {
    intl,
    published,
    onClickPublishedSetting,
    isMyPage,
    handleProjectLive,
  } = props;
  const isLive = published.live;
  const badgeIcon = (type) => {
    switch (type) {
      case "javascript":
        return badgeJsShadow;
      case "oobc":
        return badgePuzzleShadow;
      default:
        break;
    }
  };
  return (
    <div
      className={`Publish_GridItem ${isMyPage && "Publish_GridItem--mypage"}`}
    >
      {published.live ? (
        <Link
          className={`Publish_GridItem-wrap Publish_GridItem--clickable--on`}
          to={`?pId=${published.pId}`}
          style={{ textDecoration: "none" }}
        >
          <img
            className="Publish_GridItem-img"
            src={published.icon}
            alt="img"
          />
          <img className="typeIcon" src={badgeIcon("oobc")} alt="" />
        </Link>
      ) : (
        <div
          className={`Publish_GridItem-wrap Publish_GridItem--clickable--off`}
        >
          <img
            className="Publish_GridItem-img"
            src={published.icon}
            alt="img"
          />
          <img className="typeIcon" src={badgeIcon("oobc")} alt="" />
        </div>
      )}

      {!isMyPage && (
        <div className="Publish_GridItem_SubInfo">
          <div className="Publish_GridItem_SubInfo_Item">
            <img src={heartIcon} alt="img" />
            <div className="Publish_GridItem_SubInfo_Item-text">
              {published.likeCount}
            </div>
          </div>
          <div
            className="Publish_GridItem_SubInfo_Item"
            style={{ display: "none" }}
          >
            <img src={commentIcon} alt="img" />
            <div className="Publish_GridItem_SubInfo_Item-text">
              {published.commentCount}
            </div>
          </div>
        </div>
      )}
      <div
        className="Publish_GridItem-title"
        style={isMyPage ? null : { marginTop: "15px" }}
      >
        {published.name}
      </div>

      {isMyPage && (
        <div className="Publish_GridItem_Detail">
          <div className="Publish_GridItem_Wrap">
            <div className="Publish_GridItem_Wrap-date">
              {moment(published.createdAt).format("YYYY.MM.DD")}
            </div>
          </div>

          <div className="Publish_GridItem_Bottom">
            <div className="Publish_GridItem_Live_Wrapper">
              <div
                className={`Publish_GridItem_Live_Toggle ${
                  isLive ? "On" : "Off"
                }`}
                onClick={() => handleProjectLive(published)}
              >
                <span />
              </div>
              <p className="Publish_GridItem_Live_Text">
                {isLive
                  ? intl.formatMessage({ id: "ID_MYPAGE_PROJECT_LIVE" })
                  : intl.formatMessage({ id: "ID_MYPAGE_PROJECT_NOLIVE" })}
              </p>
            </div>

            <div
              className="Publish_GridItem_Edit"
              onClick={() => onClickPublishedSetting(published)}
            >
              {intl.formatMessage({ id: "ID_PUBLISH_ITEM_EDIT" })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
