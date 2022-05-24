import React, { useState, useEffect } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";
import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";

const GameBox = (props) => {
  const { game } = props;
  return (
    <Link to={`?pId=${game.pId}`} className="GameBox__recent" >
      <div className="GameBox__recent__image__wrapper">
        <img className="GameBox__recent__image" src={game.icon} alt="gameIcon" />
        {game.project && <img className="typeIcon" src={badgeIcon(game.project.type, true)} alt="badgeIcon" />}
      </div>
      <div className="GameBox__recent__info">
        <div className="GameBox__recent__info__top">
          <p className="GameBox__recent__info__title">{game.name}</p>
          <p className="GameBox__recent__info__maker">
            <img className="Game__User__Icon" src={game.user.icon} alt="userIcon" />
            {game.user.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Recent = () => {
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    request
      .getRecentlyPlayed()
      .then(res => res.json())
      .then(json => {
        setRecentGames(json.body.list)
      })
  }, [])

  return (
    <div className="GameList__recent-games">
      <div className="GameList__recent-games__section">
        <div className="GameList__recent-games__title">
          Recently Played
        </div>
        <div className="GameList__recent-games__games">
          {recentGames.map(game => 
            <GameBox key={game.pId} game={game} />
          )}
        </div>
      </div>
    </div>
  )
}

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

export default Recent;