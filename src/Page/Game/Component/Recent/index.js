import React, { useState, useEffect } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";
import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import { injectIntl, FormattedMessage } from "react-intl";
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
        <div className="GameBox__recent__info__content-container">
          <img className="GameBox__recent__info__user-icon" src={game.user.icon} alt="userIcon" />
          <div className="GameBox__recent__info__content">
          <p className="GameBox__recent__info__title">{game.name}</p>
          <p className="GameBox__recent__info__maker">
            {game.user.name}
          </p>
          </div>
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
        if(json.body) {
          setRecentGames(json.body.list);
        }
      })
  }, [])

  return (
    <div className="GameList__recent-games">
      <div className="GameList__recent-games__section">
        <div className="GameList__recent-games__title">
          <FormattedMessage id="ID_PLAY_RECENT_GAMES" />
        </div>
      {recentGames.length > 0 ?
          <div className="GameList__recent-games__games">
            {recentGames.map(game => 
              <GameBox key={game.pId} game={game} />
            )}
          </div>
        :
          <div className="GameList__recent-games__no-result">
            <span><FormattedMessage id="ID_PLAY_RECENT_GAMES_NO_RESULT" /></span>
          </div>
      }
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