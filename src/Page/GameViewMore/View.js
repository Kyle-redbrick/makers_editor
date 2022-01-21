import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import "./index.scss";

import backIcon from "../../Image/dreamclass/icon-32-back.svg";
import badgeJs from "../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../Image/dreamclass/badge-oobc-shadow@2x.png";

export default function View(props) {
  const { games, title, selectedTab, handleSelectedTab } = props;

  const COURSES = [
    {
      id: "all",
      title: "전체"
    },
    {
      id: "oobc",
      title: "도전! 게임 메이커"
    },
    {
      id: "js",
      title: "개발본능! 게임 프로듀서"
    }
  ]

  const badgeIcon = (type, shadow) => {
    switch (type) {
      case "javascript":
        return shadow ? badgeJsShadow : badgeJs;
      case "oobc":
        return shadow ? badgePuzzleShadow : badgePuzzle;
      default:
        break;
    }
  }

  const GameBox = ({ item }, i) => {
    return (
      <Link to={`?pId=${item.pId}`} className="Game__Box" key={i}>
        <div className="Game__Box__Image__Wrapper">
          <img
            src={
              (item.hasOwnProperty("project") && item.project.icon) ||
              (item.hasOwnProperty("published") && item.published.icon) ||
              item.icon
            }
            alt="" className="Game__Box__Image" />
          <img className="typeIcon" src={badgeIcon('oobc', true)} alt="" />
        </div>
        <div className="Game__Info">
          <div className="Game__Info__Top">
            <p className="Game__Box__Title">
              {(item.hasOwnProperty("project") && item.project.name) ||
                (item.hasOwnProperty("published") && item.published.name) ||
                item.name}
            </p>
            <p className="Game__Box__Maker">
              <img className="Game__User__Icon"
                src={(item.hasOwnProperty("project") && item.project.user.icon) ||
                  (item.hasOwnProperty("published") && item.published.user.icon) ||
                  item.user.icon}
                alt="" />
              {(item.hasOwnProperty("project") && item.project.user.name) ||
                (item.hasOwnProperty("published") && item.published.user.name) ||
                item.user.name}
            </p>
          </div>
          <div className="Game__Etc">
            <span className="like">
              {(item.hasOwnProperty("project") && item.project.likeCount) ||
                (item.hasOwnProperty("published") && item.published.likeCount) ||
                item.likeCount || 0}
            </span>
            <span className="view">
              {(item.hasOwnProperty("project") && item.project.viewCount) ||
                (item.hasOwnProperty("published") && item.published.viewCount) ||
                item.viewCount || 0}
            </span>
            <span className="comment">
              {(item.hasOwnProperty("project") && item.project.commentCount) ||
                (item.hasOwnProperty("published") && item.published.commentCount) ||
                item.commentCount || 0}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <Layout>
      <div className="Page--GameMore">
        <div className="Page--Inner">
          <div className="backBtn">
            <Link to="/game">
              <img src={backIcon} alt="back icon" />
            </Link>
          </div>
          <p className="GameMore__Title">
            {title}

          </p>
          <ul className="CourseTabList">
            {COURSES.map((course) => {
              return (
                <li
                  className={selectedTab === course.id ? "active" : ""}
                  key={course.id}
                  onClick={() => handleSelectedTab(course.id)}
                >
                  {course.title}
                </li>
              )
            })}
          </ul>
          <div className="GameMore__Game__Wrapper">
            {games.map((game) => {
              return <GameBox item={game} key={game.pId} />
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
