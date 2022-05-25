import React, { useState, useEffect } from "react";
import * as request from "../../../../Common/Util/HTTPRequest";
import "./index.scss";
import badgeJs from "../../../../Image/dreamclass/badge-js@2x.png";
import badgePuzzle from "../../../../Image/dreamclass/badge-oobc@2x.png";
import badgeJsShadow from "../../../../Image/dreamclass/badge-js-shadow@2x.png";
import badgePuzzleShadow from "../../../../Image/dreamclass/badge-oobc-shadow@2x.png";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import QueryString from "query-string";
import { Link } from "react-router-dom";


const AllGames = (props) => {
  const [allGames, setAllGames] = useState([]);
  const [total, setTotal] = useState(0);

  console.log(111, allGames)

  useEffect(() => {
    scrollToTop();
    init();
    window.addEventListener("scroll", onWindowScroll);
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
    }
  }, [])


  const onWindowScroll = e => {
    if (window.scrollY + window.innerHeight > document.body.offsetHeight * 0.66) {
      if (total > allGames.length) {
        loadMore();
      }
    }
  }
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const init = () => {
    setTotal(0);
    setAllGames([]);
    loadMore();
  }

  const loadMore = (count = 8) => {
    // if (this.isLoading) {
    //   return;
    // }
    // this.isLoading = true;

    const options = {
      offset: allGames.length,
      limit: count
    }

    const queryString = QueryString.stringify(options);
    request
      .getAllProjects(queryString)
      .then(res => res.json())
      .then(json => {
        console.log(121, json)
        setTotal(json.body.records)
        console.log(221, ...allGames, json.body.list);
        setAllGames(prev => [...prev.allGames, json.body.list])
        // this.setState(prev => ({
        //   total: json.body.records,
        //   allGames: [...prev.allGames, json.body.list]
        // }))
      }).finally(() => {
        // this.isLoading = false;
        onWindowScroll();
      })
  }

  return (
    <div className="GameList-default">
      {/* <div className="GameList-default__recent-games">
        <p className="Play__Title Play__Title-allGames">
          {props.intl.formatMessage(
            { id: "ID_GAME_LIST_TITLE_RECENT" }
          )}
          <RecentGameList {...props} />
        </p>
      </div> */}
      <div className="GameList-default__all-games">
        <p className="Play__Title Play__Title-allGames">
          {props.intl.formatMessage(
            { id: "ID_GAME_LIST_TITLE_ALL" }
          )}
        </p>
        {total > 0
          && <AllGamesList
            allGames={allGames}
            {...props} />
        }
      </div>
    </div>
  )


}

export default withRouter(injectIntl(AllGames));

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

const AllGamesList = props => {
  return (
    <div className="Play__Game__Wrapper">
      {props.allGames.map(game => <GameBox key={game.pId} game={game} />)}
    </div>
  );
}