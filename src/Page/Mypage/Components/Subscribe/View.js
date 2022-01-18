import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

export default function View(props) {
  const {
    mode,
    users,
    handleSubscribe,
    subscribeInfo
  } = props;
  const titleId = mode === "subscribe" ? "ID_MYPAGE_USERINFO_SUBSCRIBE" : "ID_MYPAGE_USERINFO_INTERESTED";
  
  return (
    <div className="SubscribeList">
      <div className="SubscribeListTitle"><FormattedMessage id={titleId} /></div>
      <div className="SubscribeUsers">
        {users.map((user, i)=>{
          const isSubscribe = subscribeInfo.emails.includes(user.email)
          let subBtnClassName, subBtnTextId;
          if(isSubscribe) {
            subBtnClassName = "SubscribeButton SubscribeButtonActive";
            subBtnTextId = "ID_MYPAGE_SUBSCRIBE_SUBSCRIBING";
          } else {
            subBtnClassName = "SubscribeButton";
            subBtnTextId = "ID_MYPAGE_SUBSCRIBE_SUBSCRIBE";
          }

          return (
            <div className="SubscribeUser" key={user.email}>
              <img className="SubscribeUserIcon" src={user.icon} alt="user icon" />
              <div className="SubscribeRightArea">
                <div className="SubscribeUserName">{user.name}</div>
                <div className="SubscribeCountWrap">
                  <div className="SubscribeUserAppCount"><FormattedMessage id="ID_MYPAGE_SUBSCRIBE_USERINFO_GAME" values={{count: user.publishedProjectCount}} /></div>
                  <div className="SubscribeUserSubCount"><FormattedMessage id="ID_MYPAGE_SUBSCRIBE_USERINFO_SUBSCRIBE" values={{count: user.subscribeCount}} /></div>
                </div>
                <div className={subBtnClassName} onClick={()=>handleSubscribe(user.email,isSubscribe)}><FormattedMessage id={subBtnTextId} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};