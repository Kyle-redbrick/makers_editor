/* eslint-disable */
import React from "react";
import { PAGETYPE } from "../../../../Common/Util/Constant";
import loadImg from "../../../../Image/builder/folder.svg";
import mobileImg from "../../../../Image/builder/mobile.svg";
import shareImg from "../../../../Image/builder/share.svg";
import publishImg from "../../../../Image/builder/pulishing.svg";
import helpImg from "../../../../Image/builder/builder_header_tutorial.svg";
import darkImg from "../../../../Image/builder/dark-mode.svg";
import lightImg from "../../../../Image/builder/light-mode.svg";
import "./index.scss";
import ButtonIndicator from "../ButtonIndicator";
import ProjectList from "../ProjectListContainer";

export default function (props) {
  const {
    email,
    openProjectPopup,
    openInstantRunPopup,
    openSharePopup,
    openPublishPopup,
    openLoginPopup,
    openHelp,
    project,
    currentTheme,
    // isMenuEnabled,
    handleChangeTheme,
    intl,
    // name,
    // icon,
    // handleLogout,
    pageType,
    isTutor,
    isAppModalOn,
    appModalType,
    handleTemplateBtn,
    handleSelectTab,
    // isClickPublish,
    // clickPublishPopup,
    // openPublishGame,
    handlechangeProjectName,
    isTrial,
    // editorMode
  } = props;
  return (
    <div className="Header">
      {/* left */}
      <div className="HeaderLeft">
        <div className="HeaderProjectItems">
          {pageType !== "ocp" && pageType !== "wizlive" && (
            <div
              className="HeaderProjectItem"
              onClick={() => (window.location.href = "/")}
              data-tip={intl.formatMessage({
                id: "ID_TOOLTIP_PROJECT_MANAGEMENT",
              })}
            >
              <ButtonIndicator buttonId="loadImg">
                {!isTrial && <img src={loadImg} alt="load" />}
              </ButtonIndicator>
            </div>
          )}
          {isTutor && (
            <p className="AppHeader__projectList" onClick={handleTemplateBtn}>
              {intl.formatMessage({
                id: "ID_BUILDER_PROJECTLIST",
              })}
            </p>
          )}
          {isTutor && isAppModalOn && appModalType === "PROJECTLIST" && (
            <ProjectList handleSelectTab={handleSelectTab} />
          )}
          <div
            className={`HeaderProjectItem HeaderProjectName ${
              email && "HeaderChangeName"
            }`}
            onClick={() =>
              email && handlechangeProjectName(project.pId, project.name)
            }
          >
            {project.title ? project.title : "WizLab"}
          </div>

          {/* <div
              className="HeaderProjectItem"
              onClick={() => openProjectPopup(PROJECT_CATEGORY.NEW)}
            >
              NEW
             </div> */}
        </div>
      </div>

      {/* right */}
      <div className="HeaderRight">
        <div className="HeaderProjectItems">
          {/* <div className="HeaderProjectItem" onClick={openHelp}>
            {intl.formatMessage({ id: "ID_HELP_RE" })}
          </div> */}
          <div className="HeaderProjectItem">
            <ButtonIndicator buttonId="darkImg">
              <img
                className="ThemeSwitch"
                onClick={handleChangeTheme}
                src={currentTheme === "lightMode" ? lightImg : darkImg}
                alt="theme change"
              />
            </ButtonIndicator>
          </div>
          {pageType === PAGETYPE.OCP2 || (
            <div
              className="HeaderProjectItem"
              onClick={openHelp}
              data-tip={intl.formatMessage({ id: "ID_HELP_RE" })}
            >
              <ButtonIndicator buttonId="helpImg">
                <img src={helpImg} alt="helpImg" />
              </ButtonIndicator>
            </div>
          )}
          {!email ? (
            <React.Fragment>
              {pageType !== "ocp2" && pageType !== "ocp" && (
                <React.Fragment>
                  {/* <div
                    className="HeaderProjectItem"
                    onClick={openInstantRunPopup}
                    data-tip={intl.formatMessage({ id: "ID_QRDESC" })}
                  >
                    <ButtonIndicator buttonId="mobileImg">
                      <img src={mobileImg} alt="mobileImg" />
                    </ButtonIndicator>
                  </div> */}
                  <div
                    className="HeaderProjectItem"
                    onClick={openSharePopup}
                    data-tip={intl.formatMessage({ id: "ID_SHARE_TITLE" })}
                  >
                    <ButtonIndicator buttonId="shareImg">
                      <img src={shareImg} alt="shareImg" />
                    </ButtonIndicator>
                  </div>
                  <div
                    className="HeaderProjectItem"
                    onClick={openPublishPopup}
                    data-tip={intl.formatMessage({
                      id: "ID_BUILDER_PUBLISHING",
                    })}
                  >
                    <ButtonIndicator buttonId="publishImg">
                      <img src={publishImg} alt="publishImg" />
                    </ButtonIndicator>
                  </div>
                  {/* {isClickPublish && (
                    <div className="PublishMenu">
                      <div className="PublishBtn" onClick={openPublishPopup}>
                        퍼블리싱
                      </div>
                      <div className="PublishViewBtn" onClick={openPublishGame}>
                        퍼블리싱한 게임 보기
                      </div>
                    </div>
                  )} */}
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <div className="HeaderProjectItem" onClick={openLoginPopup}>
              {intl.formatMessage({ id: "ID_USERDD_LOGIN" })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
