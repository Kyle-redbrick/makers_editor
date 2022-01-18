import React from "react";
import "./index.scss";

import closeIcon from "../../../../Image/builder3d/game-view-close-icon.svg";

export default function(props) {
  const { gameSrc, gameContainerStyle, isPlaying, onClickClose } = props;
  return (
    <div id="game" className={`game${isPlaying ? " game-playing" : ""}`}>
      <div className="game_container" style={gameContainerStyle}>
        {gameSrc && (
          <iframe
            className="game_iframe"
            title="game_title"
            srcDoc={gameSrc}
            autoFocus
          />
        )}
        <div className="game_container__close-button" onClick={onClickClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    </div>
  );
}
