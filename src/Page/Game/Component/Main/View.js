import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import likeIcon from "../../../../Image/dreamclass/play-likes-icon.svg";
import viewIcon from "../../../../Image/dreamclass/play-views-icon.svg";
// import commentIcon from "../../../../Image/dreamclass/play-comments-icon.svg";
import "./index.scss";

const editorsProjectsSettings = {
  arrows: true,
  infinite: false,
  draggable: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1169,
      settings: {
        dots: false,
        arrow: false,
        slidesToShow: 1.03,
        slidesToScroll: 1,
        draggable: true
      }
    }
  ]
};

const monthlyProjectsSettings = {
  arrows: true,
  infinite: false,
  rows: 2,
  slidesToShow: 3,
  slidesToScroll: 3,
  slidersPerRow: 2,
  responsive: [
    {
      breakpoint: 1169,
      settings: {
        arrow: false,
        draggable: true,
        slidesToShow: 1.02,
        slidesToScroll: 1
      }
    }
  ]
}

const weeklyProjectsSettings = {
  arrows: true,
  infinite: false,
  rows: 3,
  slidesToShow: 3,
  slidesToScroll: 3,
  slidersPerRow: 3,
  responsive: [
    {
      breakpoint: 1169,
      settings: {
        arrow: false,
        draggable: true,
        slidesToShow: 1.02,
        slidesToScroll: 1,
        slidersPerRow: 3
      }
    }
  ]
}

const newProjectsSetting = {
  arrows: true,
  infinite: false,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1169,
      settings: {
        arrow: false,
        infinite: false,
        draggable: true,
        slidesToShow: 2.02,
        slidesToScroll: 2
      }
    }
  ]    
}

function View(props) {
  const {
    editorsProjects,
    monthlyProjects,
    weeklyProjects,
    newProjects
  } = props;

  return (
    <div className="GameMain">
      {/* 에디터 추천 게임 */}
      <div className="GamesSection">
        <div className="GamesTitle"><FormattedMessage id="ID_GAME_EDITOR_TITLE" /></div>
        <Slider {...editorsProjectsSettings}>
          {editorsProjects.map((item, i) => {
            return <EditorsGameItem key={item.pId} {...item} />;
          })}
        </Slider>
      </div>

      {/* 월간 인기 게임 */}
      <div className="GamesSection">
        <div className="GamesTitle"><FormattedMessage id="ID_GAME_MONTLY_LIKE_TITLE" /></div>
        <Link to="/game/monthly" className="GameAllButton"><FormattedMessage id="ID_GAME_VIEW_ALL" /></Link>
        <Slider {...monthlyProjectsSettings}>
          {monthlyProjects.map((item, i) => {
            return <GameItem key={item.pId} type="Medium" index={i} {...item} />;
          })}
        </Slider>
      </div>

      {/* 주간 인기 게임 */}
      <div className="GamesSection">
        <div className="GamesTitle"><FormattedMessage id="ID_GAME_WEEKLY_LIKE_TITLE" /></div>
        <Link to="/game/weekly" className="GameAllButton"><FormattedMessage id="ID_GAME_VIEW_ALL" /></Link>
        <Slider {...weeklyProjectsSettings}>
          {weeklyProjects.map((item, i) => {
            return <GameItem key={item.pId} type="Small" index={i} {...item} />;
          })}
        </Slider>
      </div>

      {/* 최신 게임 */}
      <div className="GamesSection">
        <div className="GamesTitle"><FormattedMessage id="ID_GAME_NEWS_GAME_TITLE" /></div>
        <Link to="/game/news" className="GameAllButton"><FormattedMessage id="ID_GAME_VIEW_ALL" /></Link>
        <Slider {...newProjectsSetting}>
          {newProjects.map((item, i) => {
            return <GameItem key={item.pId} type="Large" {...item} />;
          })}
        </Slider>
      </div>
    </div>
  );
}

const badgeIcon = (type, shadow) => {
  switch(type) {
    case "js":
      return shadow ? badgeJsShadow : badgeJs;
    case "wizlabOOBC":
      return shadow ? badgePuzzleShadow : badgePuzzle;
    default:
      break;
  }
}

const EditorsGameItem = props => {
  return (
    <Link to={`?pId=${props.pId}`} className="EditorsGameItem">
      <img className="EditorsGameItemImg" src={props.icon} alt="game icon" />
      <div className="EditorsGameItemInfo">
        {props.project && <img className="EditorsGameItemIcon" src={badgeIcon(props.project.type)} alt="badge" />}
        <div className="EditorsGameItemTitle">{props.name}</div>
        <div className="EditorsGameItemDesc">
          <img className="EditorGameItemUserIcon" src={props.user.icon} alt="user icon"/>
          <p className="EditorGameItemUserName">{props.user.name}</p>
        </div>
      </div>
    </Link>
  );
}

const GameItem = props => {
  // type Large : 최신 게임
  // type Medium : 월간 인기 게임
  // type Small : 주간 인기 게임
  return (
    
    <Link to={`?pId=${props.pId}`} className={`GameItem GameItem${props.type} GameItem${props.index % 6}`}>
      <img className="GameItemImg" src={props.icon} alt="game icon" />
      {props.project && <img className="GameItemIcon" src={badgeIcon(props.project.type, true)} alt="badge" />}
      <div className="GameItemInfo">
        <div className="GameItemTitle">{props.name}</div>
        <div className="GameItemUserInfo">
          <img className="GameItemUserIcon" src={props.user.icon} alt="user icon" />
          <div className="GameItemUserName">{props.user.name}</div>
        </div>
        <div className="GameItemCounts">
          <img className="GameItemCountImg" src={likeIcon} alt="count icon" />
          <div className="GameItemCount">{props.likeCount}</div>
          <img className="GameItemCountImg" src={viewIcon} alt="count icon" />
          <div className="GameItemCount">{props.viewCount}</div>
          {/* <img className="GameItemCountImg" src={commentIcon} alt="count icon" />
          <div className="GameItemCount">{props.commentCount}</div> */}
        </div>
      </div>
    </Link>
  );
}

export default View;