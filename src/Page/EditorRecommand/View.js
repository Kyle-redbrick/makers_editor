import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Common/Component/Layout";
import "./index.scss";

import playStoreIcon from "../../Image/google-play-badge@2x.png";

export default function View(props) {
  const { intl, recommendedGames } = props;
  return (
    <Layout>
      <div className="Page--EditorRecommand">
        <div className="Recommand__Game">
          <div className="Home--Inner">
            <p className="Recommand__Game__Title">
              {intl.formatMessage({ id: "ID_HOME_EDITOR_TITLE" })}
            </p>
            <div className="Recommand__Game__Wrapper">
              {recommendedGames.map((game, i) => {
                return (
                  <div className="Recommand__Game__Box" key={i}>
                    <Link
                      to={`?pId=${game.pId}`}
                      className="Recommand__Game__Box"
                      key={i}
                    >
                      <p className="Recommand__Game__Image_Wrapper">
                        <img src={game.icon} alt="" className="game_icon" />
                      </p>
                      <div className="Recommand__Game__Info_Wrapper">
                        <p className="Game__Title">{game.project.name}</p>
                        <p className="Game__Maker">{game.project.user.name}</p>
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
      </div>
    </Layout>
  );
}
