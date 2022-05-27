import React from "react";
import { FormattedMessage } from "react-intl";
import ImgPlayVideoThumb from "../../../Image/intro-second-play-video-thumbnail.png";
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
        <img alt="게임 임시 썸네일" src={ImgPlayVideoThumb} /> 

        {/* 상단 how to play 영역 */}
        <div className="game-video__how-to-play">
          <span className="game-video__how-to-play-left">
            <FormattedMessage id="ID_INTRO_GAME_VIDEO_LINE_BANNER_TITLE_LEFT" />
          </span>
          <span className="game-video__how-to-play-right">
            <FormattedMessage id="ID_INTRO_PLAY_WAY" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default PlayGameSection ;