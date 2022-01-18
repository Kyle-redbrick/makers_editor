import React from "react";
import "./index.scss";
import Layout from "../../../../Common/Component/Layout";
import { Link } from "react-router-dom";
import giftImg_pc from "../../../../Image/wiz-lab-creator-challenge-pc@2x.png";
import infoImg_pc from "../../../../Image/wiz-lab-creator-challenge-bottom-pc@2x.png";
import moreImg from "../../../../Image/icon-arrow-challenge.svg";
import giftImg_m from "../../../../Image/wiz-lab-creator-challenge-m@2x.png";
import infoImg_m from "../../../../Image/wiz-lab-creator-challenge-bottom-m@2x.png";
import campImg_pc from "../../../../Image/ocp-banner-pc-1020-200@2x.png";
import campImg_m from "../../../../Image/ocp-banner-mobile-341-341@2x.png";

export default function(props) {
  const {
    news,
    newsType,
    populars,
    popularsType,
    handleNewsTab,
    handlePopularsTab,
    tabType,
    handleNewsMore,
    handlePopularsMore,
    isNewsShowMore,
    isPopularsShowMore,
    openFinished
  } = props;
  return (
    <Layout>
      <div className="Page--OCP2--event">
        <div className="event--pc">
          <div className="section section--gift">
            <img src={giftImg_pc} alt="img" />
            <Link
              to={`/wizapps/challengeRank/20`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="btn btn__season1"></div>
            </Link>
            {/* <Link
              to={`/builder`}
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
            >
               </Link> */}
            <div
              className="btn btn__builder"
              onClick={() => openFinished()}
            ></div>
          </div>
          <div className="section section--news">
            <div className="section__inner">
              <h3 className="section__title">새로운 도전작</h3>
              <div className={`tab`}>
                {Object.keys(tabType).map((item, index) => {
                  return (
                    <div
                      className={`tab__item tab--active--${
                        newsType === item ? "on" : "off"
                      }`}
                      key={index}
                      onClick={() => {
                        handleNewsTab(item);
                      }}
                    >
                      {tabType[item]}
                    </div>
                  );
                })}
              </div>
              <div className="projects projects--news">
                {news.map((item, index) => {
                  return (
                    <Link
                      to={`?pId=${item.pId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={index}
                    >
                      <div className="projects__item">
                        <img
                          className="item__img"
                          src={item.published.icon}
                          alt="img"
                        />
                        <div className="item__row1">
                          <img
                            className="user__icon"
                            src={item.published.user.icon}
                            alt="img"
                          />
                          <div className="item__title">
                            {item.published.name}
                          </div>
                        </div>
                        <div className="item__row2">
                          <div className="user__name">
                            {item.published.user.name}
                          </div>
                        </div>

                        <div className="item__row3">
                          <span className="like">
                            {item.published.likeCount}
                          </span>
                          <span className="view">
                            {item.published.viewCount}
                          </span>
                          <span className="comment">
                            {item.published.commentCount}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {isNewsShowMore && (
                <div className="more" onClick={() => handleNewsMore()}>
                  <img className="more__img" src={moreImg} alt="img" />
                </div>
              )}
            </div>
          </div>

          <div className="section section--banner">
            <div className="section__inner">
              <Link
                to={`/event/codingparty/onlinecamp`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={campImg_pc} alt="img" />
              </Link>
            </div>
          </div>
          <div className="section section--popular">
            <div className="section__inner">
              <h3 className="section__title">인기 작품</h3>
              <div className={`tab`}>
                {Object.keys(tabType).map((item, index) => {
                  return (
                    <div
                      className={`tab__item tab--active--${
                        popularsType === item ? "on" : "off"
                      }`}
                      key={index}
                      onClick={() => {
                        handlePopularsTab(item);
                      }}
                    >
                      {tabType[item]}
                    </div>
                  );
                })}
              </div>
              <div className="projects projects--popular">
                {populars.map((item, index) => {
                  return (
                    <Link
                      to={`?pId=${item.pId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={index}
                    >
                      <div className="projects__item" key={index}>
                        <img
                          className="item__img"
                          src={item.published.icon}
                          alt="img"
                        />
                        <div className="item__row1">
                          <img
                            className="user__icon"
                            src={item.published.user.icon}
                            alt="img"
                          />
                          <div className="item__title">
                            {item.published.name}
                          </div>
                        </div>
                        <div className="item__row2">
                          <div className="user__name">
                            {item.published.user.name}
                          </div>
                        </div>

                        <div className="item__row3">
                          <span className="like">
                            {item.published.likeCount}
                          </span>
                          <span className="view">
                            {item.published.viewCount}
                          </span>
                          <span className="comment">
                            {item.published.commentCount}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {isPopularsShowMore && (
                <div className="more" onClick={() => handlePopularsMore()}>
                  <img className="more__img" src={moreImg} alt="img" />
                </div>
              )}
            </div>
          </div>
          <div className="section section--info">
            <img src={infoImg_pc} alt="img" />
          </div>
        </div>

        <div className="event--mobile">
          <div className="section section--gift">
            <img src={giftImg_m} alt="img" />
            <Link
              to={`/codingparty1`}
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="btn btn__season1"></div>
            </Link>
            {/* <Link
              to={`/builder`}
              target="_blank"
              style={{ textDecoration: "none", color: "inherit" }}
            >
            </Link> */}
            <div
              className="btn btn__builder"
              onClick={() => openFinished()}
            ></div>
          </div>
          <div className="section section--news">
            <div className="section__inner">
              <h3 className="section__title">새로운 도전작</h3>
              <div className={`tab`}>
                {Object.keys(tabType).map((item, index) => {
                  return (
                    <div
                      className={`tab__item tab--active--${
                        newsType === item ? "on" : "off"
                      }`}
                      key={index}
                      onClick={() => {
                        handleNewsTab(item);
                      }}
                    >
                      {tabType[item]}
                    </div>
                  );
                })}
              </div>
              <div className="projects projects--news">
                {news.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${item.pId}`}
                      target="_blank"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="projects__item" key={index}>
                        <img
                          className="item__img"
                          src={item.published.icon}
                          alt="img"
                        />
                        <div className="item__row1">
                          <img
                            className="user__icon"
                            src={item.published.user.icon}
                            alt="img"
                          />
                          <div className="item__title">
                            {item.published.name}
                          </div>
                        </div>
                        <div className="item__row2">
                          <div className="user__name">
                            {item.published.user.name}
                          </div>
                        </div>

                        <div className="item__row3">
                          <span className="like">
                            {item.published.likeCount}
                          </span>
                          <span className="view">
                            {item.published.viewCount}
                          </span>
                          <span className="comment">
                            {item.published.commentCount}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {isNewsShowMore && (
                <div className="more" onClick={() => handleNewsMore()}>
                  <img className="more__img" src={moreImg} alt="img" />
                </div>
              )}
            </div>
          </div>

          <div className="section section--banner">
            <div className="section__inner">
              <img src={campImg_m} alt="img" />
            </div>
          </div>
          <div className="section section--popular">
            <div className="section__inner">
              <h3 className="section__title">인기 작품</h3>
              <div className={`tab`}>
                {Object.keys(tabType).map((item, index) => {
                  return (
                    <div
                      className={`tab__item tab--active--${
                        popularsType === item ? "on" : "off"
                      }`}
                      key={index}
                      onClick={() => {
                        handlePopularsTab(item);
                      }}
                    >
                      {tabType[item]}
                    </div>
                  );
                })}
              </div>
              <div className="projects projects--popular">
                {populars.map((item, index) => {
                  return (
                    <Link
                      to={`/detail/${item.pId}`}
                      target="_blank"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="projects__item" key={index}>
                        <img
                          className="item__img"
                          src={item.published.icon}
                          alt="img"
                        />
                        <div className="item__row1">
                          <img
                            className="user__icon"
                            src={item.published.user.icon}
                            alt="img"
                          />
                          <div className="item__title">
                            {item.published.name}
                          </div>
                        </div>
                        <div className="item__row2">
                          <div className="user__name">
                            {item.published.user.name}
                          </div>
                        </div>

                        <div className="item__row3">
                          <span className="like">
                            {item.published.likeCount}
                          </span>
                          <span className="view">
                            {item.published.viewCount}
                          </span>
                          <span className="comment">
                            {item.published.commentCount}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {isPopularsShowMore && (
                <div className="more" onClick={() => handlePopularsMore()}>
                  <img className="more__img" src={moreImg} alt="img" />
                </div>
              )}
            </div>
          </div>
          <div className="section section--info">
            <img src={infoImg_m} alt="img" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
