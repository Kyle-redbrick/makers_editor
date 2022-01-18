import React from "react";
import "./index.scss";

import menuIcon from "../../../../Image/builder3d/icon-38-main-menu-button-white.svg";
import menuOffIcon from "../../../../Image/builder3d/icon-38-main-menu-button-off-white.svg";
import menuArrowIcon from "../../../../Image/builder3d/icon-38-main-menu-pop-up-white.svg";
import menuArrowOffIcon from "../../../../Image/builder3d/icon-38-main-menu-pop-up-off-white.svg";

import mainIcon from "../../../../Image/builder3d/icon-40-menu-click-back-to-main.svg";
import mobileIcon from "../../../../Image/builder3d/icon-40-menu-click-test-on-a-mobile-device.svg";
import shareIcon from "../../../../Image/builder3d/icon-40-menu-click-share.svg";
import publishIcon from "../../../../Image/builder3d/icon-40-menu-click-publish.svg";

export default function(props) {
  const {
    projectName,
    isNameInputDisabled,
    loggedIn,
    isDropDownOpen,
    onClickDropDownBtn,
    onBlurNameInput,
    onClickMobileTest,
    onClickShare,
    onClickPublish,
    onClickMain
  } = props;
  return (
    <div className="menu">
      <div
        className={`menu_dropdownBtn ${
          isDropDownOpen ? "menu_dropdownBtn_open" : ""
        }`}
        onClick={onClickDropDownBtn}
      >
        <img src={isDropDownOpen ? menuIcon : menuOffIcon} alt="" />
        <img src={isDropDownOpen ? menuArrowIcon : menuArrowOffIcon} alt="" />
        {isDropDownOpen && (
          <div className="menu_dropdown">
            <DropDownItem
              id="main"
              title="메인으로"
              icon={mainIcon}
              onClick={onClickMain}
            />
            <DropDownItem
              id="mobile"
              title="모바일 테스트"
              icon={mobileIcon}
              onClick={onClickMobileTest}
              disable
            />
            <DropDownItem
              id="share"
              title="공유하기"
              icon={shareIcon}
              onClick={onClickShare}
              disable
            />
            {loggedIn && (
              <DropDownItem
                id="publish"
                title="퍼블리싱"
                icon={publishIcon}
                onClick={onClickPublish}
              />
            )}
          </div>
        )}
      </div>

      <input
        id="menu_nameInput"
        className="menu_nameInput"
        defaultValue={isNameInputDisabled ? "템플릿 프로젝트" : projectName}
        onBlur={e => {
          onBlurNameInput(e.currentTarget);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            const target = e.currentTarget;
            setTimeout(target.blur.bind(target), 1);
          }
        }}
        disabled={isNameInputDisabled}
      />
    </div>
  );
}

function DropDownItem(props) {
  const { id, title, icon, onClick, disable } = props;
  return (
    <div
      className={`menu_dropdown_item ${
        disable ? "menu_dropdown_item_disable" : ""
      }`}
      onClick={onClick}
    >
      <div className="menu_dropdown_icon">
        <img src={icon} alt={id} />
      </div>
      <div className="menu_dropdown_title">{title}</div>
    </div>
  );
}
