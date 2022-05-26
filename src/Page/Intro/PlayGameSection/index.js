import React from "react";
import { FormattedMessage } from "react-intl";
import "./index.scss";

function PlayGameSection () {
  return (
    <div className="game-video">
      <h3 className="game-video__title"><FormattedMessage id="ID_INTRO_GAME_VIDEO_SECTION_TITLE" /></h3>
      <span className="game-video__child-title">
        <FormattedMessage id="ID_INTRO_GAME_VIDEO_SECTION_CHILD_TITLE" />
      </span>

      <div className="game-video__outline">
        {/* TODO 게임 영상 영역 */}
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/JWTHsxn3B2M" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

        {/* 상단 how to play 영역 */}
        <div className="game-video__how-to-play">
          <span className="game-video__how-to-play-left">
            <FormattedMessage id="ID_INTRO_GAME_VIDEO_LINE_BANNER_TITLE_LEFT" />
          </span>
          <span className="game-video__how-to-play-right">
            <FormattedMessage id="ID_INTRO_GAME_VIDEO_LINE_BANNER_TITLE_RIGHT" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlayGameSection ;