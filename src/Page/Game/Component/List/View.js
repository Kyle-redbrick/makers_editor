import React from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import "./index.scss";

import backIcon from "../../../../Image/dreamclass/icon-32-back.svg";
import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import placeholderIcon from "../../../../Image/dreamclass/picture-no-search-results.svg";

const TAB = {
  ALL: "all",
  JAVASCRIPT: "js",
  OOBC: "wizlabOOBC"
}

function View(props) {
  return (
    <div className={`GameList GameList-${props.type}`}>
      {/* {props.type !== "search" && <BackButton />} */}
      <p className="GameMore__Title">
        {props.intl.formatMessage(
          { id: "ID_GAME_LIST_TITLE_ALL" },
          { count: props.total }
        )}
      </p>
      {props.total > 0
        && <GameList {...props} />
      }
      {/* //   : props.type === "search" && <SearchPlaceHolder {...props} />
      // } */}
    </div>
  );
}
export default injectIntl(View);

// const BackButton = props => {
//   return (
//     <div className="backBtn">
//       <Link to="/game">
//         <img src={backIcon} alt="back icon" />
//       </Link>
//     </div>
//   );
// }

// const Tabs = props => {
//   return (
//     <ul className="CourseTabList">
//       {Object.keys(TAB).map(key => (
//         <li
//           key={TAB[key]}
//           className={TAB[key] === props.tab ? "active" : ""}
//           onClick={() => {
//             props.onClickTab(TAB[key]);
//           }}
//         >
//           {props.intl.formatMessage({ id: "ID_GAME_LIST_TAB_" + key })}
//         </li>
//       ))}
//     </ul>
//   );
// }

const SearchPlaceHolder = props => {
  return (
    <>
      <div className="GameList__SearchPlaceholder">
        <img className="GameList__SearchPlaceholder_Icon" src={placeholderIcon} alt="search_placeholder" />
        <div className="GameList__SearchPlaceholder_Message">
          {props.intl.formatMessage({ id: "ID_GAME_LIST_PLACEHOLDER" })}
        </div>
      </div>
      <div className="GameList__SearchPlaceholderGames">
        <p className="GameList__SearchPlaceholderGames_Title">
          {props.intl.formatMessage({ id: "ID_GAME_LIST_TITLE_RECOMMENDED" })}
        </p>
        <GameList games={props.placeholderGames} />
      </div>
    </>
  );
}

const GameList = props => {
  console.log(1111, props.allGames[0])
  return (
    <div className="GameMore__Game__Wrapper">
      {props.allGames[0].map(game => <GameBox key={game.pId} game={game} />)}
    </div>
  );
}

const GameBox = (props) => {
  const { game } = props;
  return (
    <Link to={`?pId=${game.pId}`} className="Game__Box" >
      <div className="Game__Box__Image__Wrapper">
        <img className="Game__Box__Image" src={game.icon} alt="gameIcon" />
        {game.project && <img className="typeIcon" src={badgeIcon(game.project.type, true)} alt="badgeIcon" />}
      </div>
      <div className="Game__Info">
        <div className="Game__Info__Top">
          <p className="Game__Box__Title">{game.name}</p>
          <p className="Game__Box__Maker">
            <img className="Game__User__Icon" src={game.user.icon} alt="userIcon" />
            {game.user.name}
          </p>
        </div>
        <div className="Game__Etc">
          <span className="like">{game.likeCount || 0}</span>
          <span className="view">{game.viewCount || 0}</span>
          <span className="comment">{game.commentCount || 0}</span>
        </div>
      </div>
    </Link>
  );
};

const badgeIcon = (type, shadow) => {
  switch (type) {
    case "js":
      return shadow ? badgeJsShadow : badgeJs;
    case "wizlabOOBC":
      return shadow ? badgePuzzleShadow : badgePuzzle;
    default:
      break;
  }
}
