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
    handleProjectLive
  } = props;

  let num;

  switch (mode) {
    case "publish":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT01"});
      break;
    case "subscribe":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT02"});
      break;
    case "interested":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT02"});
      break;
    default:
      break;
  }
  
  return (
    <div className="Publish">
      <p className="title">
        <FormattedMessage id="ID_MYPAGE_TABTAPE_PUBLISH" />
        {/* TODO publish length number 들어가야함 */}
        <div className="Publish__list-length">8</div>
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

const PublishItem = props => {
  const {
    intl,
    published,
    onClickPublishedSetting,
    isMyPage,
    handleProjectLive
  } = props;
  const isLive = published.live;
  const badgeIcon = (type) => {
    switch(type) {
      case "javascript":
        return badgeJsShadow;
      case "oobc":
        return badgePuzzleShadow;
      default:
        break;
    }
  };
  return (
    <div className={`Publish_GridItem ${isMyPage && "Publish_GridItem--mypage"}`}>
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
          <img className="typeIcon" src={badgeIcon('oobc')} alt="" />
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
          <img className="typeIcon" src={badgeIcon('oobc')} alt="" />
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
          <div className="Publish_GridItem_SubInfo_Item" style={{display: "none"}}>
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

      {/* TODO user name */}
      <div className="Publish_GridItem--user-name">
        usernane
      </div>
      
      {/* TODO 찜 횟수 / view 횟수 */}
      <div className="Publish_GridItem--info">
        <div className="Publish_GridItem--heart">
          <img alt="하트 아이콘" src={IconHeart} />
          <span className="Publish_GridItem--number">52</span>
        </div>

        <div className="Publish_GridItem--view">
          <img alt="눈 아이콘" src={IconEyes} />
          <span className="Publish_GridItem--number">2345</span>
        </div>
      </div>
    </div>
  );
};