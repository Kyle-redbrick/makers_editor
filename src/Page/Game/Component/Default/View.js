import React from "react";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import "./index.scss";

import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import placeholderIcon from "../../../../Image/dreamclass/picture-no-search-results.svg";


function View(props) {
  return (
    <div className="GameList-default">
      <div className="GameList-default__all-games">
        <p className="Play__Title Play__Title-allGames">
          {props.intl.formatMessage(
            { id: "ID_GAME_LIST_TITLE_ALL" }
          )}
        </p>
        {props.total > 0
          && <AllGamesList {...props} />
        }
      </div>
    </div>
  );
}
export default injectIntl(View);

const AllGamesList = props => {
  return (
    <div className="Play__Game__Wrapper">
      {props.allGames[0].map(game => <GameBox key={game.pId} game={game} />)}
    </div>
  );
}

const GameBox = (props) => {
  const { game } = props;
  return (
    <Link to={`?pId=${game.pId}`} className="Game__Box__Default" >
      <div className="Game__Box__Default__Image__Wrapper">
        <img className="Game__Box__Default__Image" src={game.icon} alt="gameIcon" />
        {game.project && <img className="typeIcon" src={badgeIcon(game.project.type, true)} alt="badgeIcon" />}
      </div>
      <div className="Game__Info__Default">
        <div className="Game__Info__Default__Top">
          <p className="Game__Box__Default__Title">{game.name}</p>
          <p className="Game__Box__Default__Maker">
            <img className="Game__User__Icon" src={game.user.icon} alt="userIcon" />
            {game.user.name}
          </p>
        </div>
        <div className="Game__Etc">
          <span className="like">{game.likeCount || 0}</span>
          <span className="view">{game.viewCount || 0}</span>
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
