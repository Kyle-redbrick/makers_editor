import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

// comps
// import EventPopup from "./Components/EventPopup";

// static files
import Layout from "../../Common/Component/Layout";
import { WIZLIVE_BANNER_LINK } from "../../Common/Util/Constant";

import Slider from "react-slick";
import "./index.scss";
import { URL } from "../../Common/Util/Constant";

import playStoreIcon from "../../Image/google-play-badge@2x.png";

export default function View(props) {
  const {
    wizEvent,
    recommendedGames,
    // setVideoRef
    intl,
    // onClickCreate,
    weeklyProjects,
    rankUsers,
    // handleClickCodeBtn,
    // handleFollowBtn,
    handleSubscribe,
    // templateProjects,
    // createNewProject,
    // tabType,
    weeklyTabType,
    rankTabType,
    onClickLink,
    handleCreatorRankTab,
    handleWeeklyProjectTab,
    isMobile,
    handleClickBanner
  } = props;

  const bannerSlidSettings = {
    fade: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    infinite: true,
    arrows: true,
    dots: true
  };

  // let isShowPopup = true;
  // const expiredAt = localStorage.getItem("expiredAt");
  // if (expiredAt) {
  //   if (Number(expiredAt) > new Date().getTime()) {
  //     isShowPopup = false;
  //   }
  // }

  return (
    <Layout isHome={true}>
      <div className="Page--Home">
        <section className="Home__MainGameWrapper">
          <div className="Home__MainGameWrapper_Overlay" />
          <div className="Home__MainGameWrapper_Slider">
            <Slider {...bannerSlidSettings}>
              {wizEvent &&
                wizEvent.map((banner, index) => (
                  <div className="Home__MainGameWrapper_Banner" key={index}>
                    <div className="Home__MainGameWrapper_Banner_Img">
                      <img
                        src={isMobile ? banner.foreground : banner.background}
                        alt={banner.title}
                      />
                      <div className="Home__MainGameWrapper_Banner_Img_Overlay" />
                    </div>
                    <div className="Home__MainGameWrapper_Banner_Content">
                      <div className="Home__MainGameWrapper_Banner_Subtitle">
                        {banner.description}
                      </div>
                      <div className="Home__MainGameWrapper_Banner_Title">
                        {banner.title}
                      </div>
                      {/* <Link to={banner.url}> */}
                      <div
                        className={`Home__MainGameWrapper_Banner_Button Home__MainGameWrapper_Banner_Button_${banner.templateId}`}
                        onClick={() =>
                          handleClickBanner(banner.url, banner.isLogin)
                        }
                      >
                        {banner.buttonName
                          ? banner.buttonName
                          : intl.formatMessage({
                              id: "ID_HOME_MAIN_CREATE_EVENT"
                            })}
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </section>

        <div className="Home__Start__Coding">
          <div className="Home--Inner">
            <p className="Home__Start__SubTitle">
              {intl.formatMessage({ id: "ID_HOME_CODE_SUBTITLE" })}
            </p>
            <p className="Home__Start__Title">
              {intl.formatMessage({ id: "ID_HOME_CODE_TITLE" })}
            </p>
            <div className="Home__Start__Mobile__Title">
              <p>
                {intl.formatMessage({ id: "ID_HOME_CODE_MOBILE_SUBTITLE" })}
              </p>
              <p>{intl.formatMessage({ id: "ID_HOME_CODE_MOBILE_TITLE" })}</p>
            </div>

            <div className="btn-group pc">
              <Link to="/builder" target="_blank">
                <p className="btn-textCoding" />
              </Link>
              <Link to="/builder" target="_blank">
                <p className="btn-blockCoding" />
              </Link>
            </div>

            {/* <div
              className="btn-group pc"
              onMouseDown={e => {
                handleClickCodeBtn(e.target);
              }}
            >
              {templateProjects
                .filter(p => p.description === "empty")
                .map((template, i) => {
                  return template.name === "빈 프로젝트" ? (
                    <p
                      className="btn-blockCoding"
                      key={i}
                      onClick={() => {
                        createNewProject(template);
                      }}
                    />
                  ) : (
                    <p
                      className="btn-textCoding"
                      key={i}
                      onClick={() => {
                        createNewProject(template);
                      }}
                    />
                  );
                })} */}

            {/* <div
                className="btn-group"
                onMouseDown={e => {
                  handleClickCodeBtn(e.target);
                }}
              >
                  {templateProjects
                  .filter(p => p.description === "empty")
                  .map((template, i) => {
                    return(
                      template.name==="빈 프로젝트" ?
                      <p className="btn-blockCoding"
                        key={i}
                        onClick={() => { createNewProject(template);} }
                      />
                      :<p className="btn-textCoding"
                      key={i}
                      onClick={() => { createNewProject(template);}}
                    /> 
                    )
                  })}
            </div> */}
            <div className="btn-group mobile">
              <a
                href="https://play.google.com/store/apps/details?id=io.wizschool.wizapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="btn-textCoding" />
              </a>
              <a
                href="https://itunes.apple.com/app/id1456090029"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="btn-blockCoding" />
              </a>
            </div>
          </div>
        </div>

        <div className="Home__Editor__Recommand__Game">
          <div className="Home--Inner">
            <p className="Home__Editor__Recommand__Game__Title">
              {intl.formatMessage({ id: "ID_HOME_EDITOR_TITLE" })}
              <Link
                to={"/editorRecommend"}
                className="Home__Editor__Recommand__Game__ViewMore"
              >
                {intl.formatMessage({ id: "ID_HOME_EDITOR_MORE" })}
              </Link>
            </p>
            <div className="Home__Editor__Recommand__Game__Wrapper">
              {recommendedGames &&
                recommendedGames.map((game, i) => {
                  return (
                    <div className="Home__Editor__Recommand__Game__Box" key={i}>
                      <Link
                        to={`?pId=${game.pId}`}
                        className="Home__Editor__Recommand__Game__Box"
                        key={i}
                      >
                        <p className="Home__Editor__Recommand__Game__Image_Wrapper">
                          <img src={game.icon} alt="" className="game_icon" />
                        </p>
                        <div className="Home__Editor__Recommand__Game__Info_Wrapper">
                          <p className="Game__Title">{game.project.name}</p>
                          <p className="Game__Maker">
                            {game.project.user.name}
                          </p>
                        </div>
                        <p className="Game__Info">{game.description}</p>
                      </Link>
                      {game.playStoreURL && (
                        <a
                          href={game.playStoreURL}
                          className="playStoreIcon"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={playStoreIcon} alt="playstore icon" />
                        </a>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="Home__Guide__Banner Home__Guide__Banner__pc">
          {/* <Link to="" className="mobile"> */}
          <div className="Home--Inner">
            <span className="Home__Guide__Banner__Title">
              {intl.formatMessage({ id: "ID_HOME_GUIDE_BANNER_TITLE" })}
            </span>

            <span className="Home__Guide__Banner__SubTitle">
              {intl.formatMessage({ id: "ID_HOME_GUIDE_BANNER_SUBTITLE" })}
            </span>
            <div className="Guide__Button__Wrapper">
              <Link to={"/tutorial"} className="Btn_Tutorial">
                {intl.formatMessage({ id: "ID_HOME_GUIDE_BANNER_TUTORIAL" })}
              </Link>
              <a
                href={WIZLIVE_BANNER_LINK(1, props.userId)}
                className="Btn_Wizlive_Freetrial"
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage({ id: "ID_HOME_GUIDE_BANNER_FREETRIAL" })}
              </a>
            </div>
          </div>
          {/* </Link> */}
        </div>

        <div className="Home__Guide__Banner Home__Guide__Banner__mobile">
          <a
            target="_blank"
            href={URL.WIZLIVE + `/wizlabPromotion`}
            style={{ textDecoration: "none" }}
            rel="noopener noreferrer"
          >
            <div className="Home--Inner">
              <p className="Home__Guide__Banner__Mobile__Title">
                {intl.formatMessage({
                  id: "ID_HOME_GUIDE_BANNER_MOBILE_TITLE"
                })}
              </p>

              <p className="Home__Guide__Banner__Mobile__SubTitle">
                {intl.formatMessage({
                  id: "ID_HOME_GUIDE_BANNER_MOBILE_SUBTITLE"
                })}
              </p>
            </div>
          </a>
        </div>

        <div className="Home__Best__Game">
          <div className="Home--Inner">
            <p className="Home__Best__Game__Title">
              {intl.formatMessage({ id: "ID_HOME_WEEKLY_BEST_TITLE" })}
              {/* <span className="Home__Best__Game__ViewMore">
                {intl.formatMessage({ id: "ID_HOME_WEEKLY_BEST_MORE" })}
              </span> */}
            </p>
            <ul className="Home__Best__Game__TabList">
              {[
                {
                  type: "like",
                  text: "ID_HOME_WEEKLY_BEST_LIKE"
                },
                {
                  type: "view",
                  text: "ID_HOME_WEEKLY_BEST_VIEW"
                },
                {
                  type: "comment",
                  text: "ID_HOME_WEEKLY_BEST_COMMENT"
                },
                {
                  type: "news",
                  text: "ID_HOME_WEEKLY_BEST_NEWS"
                }
              ].map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`${item.type} ${
                      item.type === weeklyTabType ? "click" : ""
                    }`}
                    onClick={() => {
                      handleWeeklyProjectTab(item.type);
                    }}
                  >
                    {intl.formatMessage({ id: item.text })}
                  </li>
                );
              })}
            </ul>
            <div className="Home__Best__Game__Lists">
              {weeklyProjects &&
                weeklyProjects.map((item, i) => (
                  <div
                    className={`Home__Best__Game__List ${i <= 2 &&
                      weeklyTabType !== "news" &&
                      "rank"} ${i === 1 && "second"} ${i === 2 && "third"}`}
                    key={i}
                  >
                    <Link to={`?pId=${item.pId}`}>
                      <div className="Home__Best__Game__List__Image_Wrapper">
                        <div
                          className="Home__Best__Game__List__Image"
                          style={{
                            background: `url(${(item.hasOwnProperty(
                              "project"
                            ) &&
                              item.project.icon) ||
                              (item.hasOwnProperty("published") &&
                                item.published.icon) ||
                              item.icon}) no-repeat center/cover`
                          }}
                        />
                      </div>
                      <p className="Home__Best__Game__List__Title">
                        <img
                          src={
                            (item.hasOwnProperty("project") &&
                              item.project.user.icon) ||
                            (item.hasOwnProperty("published") &&
                              item.published.user.icon) ||
                            item.user.icon
                          }
                          alt=""
                          className="Home__Best__Game__List__UserIcon"
                        />
                        <span className="Home__Best__Game__List__Title__Text">
                          {(item.hasOwnProperty("project") &&
                            item.project.name) ||
                            (item.hasOwnProperty("published") &&
                              item.published.name) ||
                            item.name}
                        </span>
                      </p>
                      <p className="Home__Best__Game__List__Maker">
                        {(item.hasOwnProperty("project") &&
                          item.project.user.name) ||
                          (item.hasOwnProperty("published") &&
                            item.published.user.name) ||
                          item.user.name}
                      </p>
                      <div className="Home__Best__Game__Info">
                        <span className="like">
                          {(item.hasOwnProperty("project") &&
                            item.project.likeCount) ||
                            (item.hasOwnProperty("published") &&
                              item.published.likeCount) ||
                            item.likeCount ||
                            0}
                        </span>
                        <span className="view">
                          {(item.hasOwnProperty("project") &&
                            item.project.viewCount) ||
                            (item.hasOwnProperty("published") &&
                              item.published.viewCount) ||
                            item.viewCount ||
                            0}
                        </span>
                        <span className="comment">
                          {(item.hasOwnProperty("project") &&
                            item.project.commentCount) ||
                            (item.hasOwnProperty("published") &&
                              item.published.commentCount) ||
                            item.commentCount ||
                            0}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="Home__Create__Rank">
          <div className="Home--Inner">
            <p className="Home__Create__Rank__Title">
              {intl.formatMessage({ id: "ID_HOME_RANK_CREATOR_TITLE" })}
            </p>
            <ul className="Home__Create__Rank__TabList">
              {[
                {
                  type: "likeCount",
                  text: "ID_HOME_RANK_CREATOR_LIKE"
                },
                // {
                //   type: "view",
                //   text: "ID_HOME_RANK_CREATOR_VIEW"
                // },
                {
                  type: "subscribeCount",
                  text: "ID_HOME_RANK_CREATOR_SUBSCRIBE"
                },
                {
                  type: "levelPoint",
                  text: "ID_HOME_RANK_CREATOR_LEVELPOINT"
                }
              ].map((item, index) => {
                return (
                  <li
                    className={`${item.type} ${
                      item.type === rankTabType ? "click" : ""
                    }`}
                    key={index}
                    onClick={() => {
                      handleCreatorRankTab(item.type);
                    }}
                  >
                    {intl.formatMessage({ id: item.text })}
                  </li>
                );
              })}
            </ul>

            <div className="Home__Create__Rank__ResultLists">
              <div className="Home__Create__Rank__ResultList__Left">
                {rankUsers &&
                  rankUsers.map(
                    (user, i) =>
                      i <= 4 && (
                        <div className="Home__Create__Rank__ResultList" key={i}>
                          <p className="Home__Create__Rank__Num">{i + 1}</p>
                          <div
                            className="Home__Create__Rank__User"
                            onClick={() => onClickLink(user.id)}
                          >
                            <img src={user.icon} alt="" />
                            <div className="Home__Create__Rank__User__Info">
                              <p className="Home__Create__Rank__Name">
                                {user.name}
                              </p>
                              <p className="Home__Create__Rank__Follower">
                                {intl.formatMessage(
                                  {
                                    id: `ID_HOME_RANK_${rankTabType.toUpperCase()}`
                                  },
                                  { count: user[rankTabType] }
                                )}
                              </p>
                            </div>
                          </div>
                          {user.subscribe ? (
                            <button
                              className="Btn-Follow click"
                              onClick={e => {
                                handleSubscribe(
                                  e,
                                  i,
                                  user.email,
                                  !user.subscribe
                                );
                              }}
                            >
                              {intl.formatMessage({
                                id: "ID_HOME_RANK_CREATOR_FOLLOWING_BUTTON"
                              })}
                            </button>
                          ) : (
                            <button
                              className="Btn-Follow"
                              onClick={e => {
                                handleSubscribe(
                                  e,
                                  i,
                                  user.email,
                                  !user.subscribe
                                );
                              }}
                            >
                              {intl.formatMessage({
                                id: "ID_HOME_RANK_CREATOR_FOLLOW_BUTTON"
                              })}
                            </button>
                          )}
                        </div>
                      )
                  )}
              </div>
              <div className="Home__Create__Rank__ResultList__Right">
                {rankUsers &&
                  rankUsers.map(
                    (user, i) =>
                      i > 4 && (
                        <div className="Home__Create__Rank__ResultList" key={i}>
                          <p className="Home__Create__Rank__Num">{i + 1}</p>
                          <div
                            className="Home__Create__Rank__User"
                            onClick={() => onClickLink(user.id)}
                          >
                            <img src={user.icon} alt="" />
                            <div className="Home__Create__Rank__User__Info">
                              <p className="Home__Create__Rank__Name">
                                {user.name}
                              </p>
                              <p className="Home__Create__Rank__Follower">
                                {intl.formatMessage(
                                  {
                                    id: `ID_HOME_RANK_${rankTabType.toUpperCase()}`
                                  },
                                  { count: user[rankTabType] }
                                )}
                              </p>
                            </div>
                          </div>
                          {user.subscribe ? (
                            <button
                              className="Btn-Follow click"
                              onClick={e => {
                                handleSubscribe(
                                  e,
                                  i,
                                  user.email,
                                  !user.subscribe
                                );
                              }}
                            >
                              {intl.formatMessage({
                                id: "ID_HOME_RANK_CREATOR_FOLLOWING_BUTTON"
                              })}
                            </button>
                          ) : (
                            <button
                              className="Btn-Follow"
                              onClick={e => {
                                handleSubscribe(
                                  e,
                                  i,
                                  user.email,
                                  !user.subscribe
                                );
                              }}
                            >
                              {intl.formatMessage({
                                id: "ID_HOME_RANK_CREATOR_FOLLOW_BUTTON"
                              })}
                            </button>
                          )}
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {isShowPopup && <EventPopup />} */}
    </Layout>
  );
}
