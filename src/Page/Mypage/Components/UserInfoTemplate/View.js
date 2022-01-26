import React from "react";
import UserIconWrapper from "../../../../Common/Component/UserIconWrapper";
import bitsIcon from "../../../../Image/dreamclass/ranking-icon-36-learning.svg"
import editIcon from "../../../../Image/dreamclass/review-34-edit.svg"
import publishedAppIcon from "../../../../Image/dreamclass/my-profile-publishing.svg"
import followerIcon from "../../../../Image/dreamclass/my-profile-followers.svg"
import followingIcon from "../../../../Image/dreamclass/my-profile-following.svg"
import { FormattedNumber } from "react-intl";

export default function View(props) {
  const {
    intl,
    user,
    isMyPage,
    subscribeInfo,
    handleSelectTab,
    selectedTab,
    onClickSettingBtn
  } = props;

  if(!user) {
    return <section className="UserInfoTemplate" />;
  }

  return (
    <section className="UserInfoTemplate">
      <div className="UserInfoTemplate_UserInfo">
        <div className="UserInfoTemplate_UserInfo_ImgWrap">
          <div className="UserInfoTemplate_UserInfo_ImgWrap-icon">
            <UserIconWrapper iconSrc={user.icon} />
          </div>
        </div>
        <div className="UserInfoTemplate_UserInfo_TextWrap">
          <div className="UserInfoTemplate_UserInfo_TextWrap_FirstLine">
            <div className="UserInfoTemplate_UserInfo_TextWrap_FirstLine-nik">
              {user.name}
            </div>
          </div>
          <div className="UserInfoTemplate_UserInfo_Bits">
            <img src={bitsIcon} alt=""/>
            <FormattedNumber value={user.dreamPoint} /> <span className="bits">BITS</span>
          </div>
          <div className="UserInfoTemplate_UserInfo_etc">
            <div className="UserInfoTemplate_UserInfo_TextWrap-status">
              {user.statusMessage ? user.statusMessage : ""}
            </div>
            {isMyPage && (
              <div 
                className="UserInfoTemplate_UserInfo_setting_Btn"
                onClick={onClickSettingBtn}
              >
                <img
                  className="UserInfoTemplate_UserInfo_TextWrap_FirstLine-settingBtn"
                  src={editIcon}
                  alt="img"
                />
                {intl.formatMessage({ id : "ID_USER_INFO_TEMPLATE_ITEM_EDIT" })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="UserInfoTemplate_Wrap">
        <ItemWrap
          intl={intl}
          mode="publish"
          count={user.publishedProjectCount}
          image={publishedAppIcon}
          handleSelectTab={handleSelectTab}
          selectedTab={selectedTab}
        />
        {/* <ItemWrap
          intl={intl}
          mode="subscribe"
          count={user.subscribeCount}
          image={followerIcon}
          handleSelectTab={handleSelectTab}
          selectedTab={selectedTab}
          style={{display: "none"}}
        />
        <ItemWrap
          intl={intl}
          mode="interested"
          count={isMyPage ? subscribeInfo.emails.length : user.interestedCount}
          image={followingIcon}
          handleSelectTab={handleSelectTab}
          selectedTab={selectedTab}
          style={{display: "none"}}
        /> */}
      </div>
    </section>
  );
}

const ItemWrap = props => {
  const {
    intl,
    mode,
    count,
    image,
    handleSelectTab,
    selectedTab
  } = props;
  
  let num;
  let title;

  switch (mode) {
    case "publish":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT01"});
      title = intl.formatMessage({id: `ID_MYPAGE_USERINFO_PUBLISH`})
      break;
    case "subscribe":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT02"});
      title = intl.formatMessage({id: `ID_MYPAGE_USERINFO_SUBSCRIBE`})
      break;
    case "interested":
      num = count + intl.formatMessage({id: "ID_USER_INFO_TEMPLATE_UNIT02"});
      title = intl.formatMessage({id: `ID_MYPAGE_USERINFO_INTERESTED`})
      break;
    default:
      break;
  }

  return (
    <div
      className={`UserInfoTemplate_ItemWrap ${selectedTab === mode ? "active" : ""}`}
      onClick={()=>handleSelectTab(mode)}
    >
      <div
        className="UserInfoTemplate_ItemWrap_Inner"
      >
        <img src={image} alt="" className="UserInfoTemplate_ItemWrap_Image"/>
        <div className="UserInfoTemplate_ItemWrap_TitleWrap">
          <div className="UserInfoTemplate_ItemWrap_TitleWrap-title">{title}</div>
        </div>
        <div className="UserInfoTemplate_ItemWrap_BottomWrap-num">{num}</div>
      </div>
    </div>
  );
};
