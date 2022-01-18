import React from "react";
import DummyRanking from "./DummyRanking";
import closeImg from "../../../../Image/builder/group-5.svg";
import soundImg from "../../../../Image/builder/group-9.svg";
import "./index.scss";

export default function(props) {
  const {
    isPlaying,
    setIsPlaying,
    setLog,
    gameDoc,
    gameIframe,
    handleDummyRankingHide,
    isDummyRankingVisiable,
    gameWrapperWidth,
    gameWrapperHeight,
    volume,
    onClickVolume,
    onChangeVolume,
    intl
  } = props;
  return (
    <div
      id="gameWrapper"
      className={`GameContainer ${!isPlaying && "GameContainer_Hidden"}`}
      onClick={() => {
        setLog({ game: false });
        setIsPlaying(false);
      }}
    >
      <div className="GameMain">
        {gameDoc && (
          <div
            className="GameWrapper"
            style={{ width: gameWrapperWidth, height: gameWrapperHeight }}
          >
            <iframe
              sandbox="allow-scripts allow-same-origin"
              title="wizlab"
              ref={gameIframe}
              srcDoc={gameDoc}
              scrolling="no"
              frameBorder="0"
            />
          </div>
        )}
        {isDummyRankingVisiable && (
          <DummyRanking handleDummyRankingHide={handleDummyRankingHide} />
        )}
      </div>

      <div className="GameBtns" onClick={e => e.stopPropagation(0)}>
        <div className="GameSoundBar">
          <input
            className="volumeslider"
            type="range"
            min={0}
            max={100}
            value={volume}
            onKeyDown={e => {
              e.preventDefault();
              e.target.blur();
            }}
            onChange={onChangeVolume}
            onClick={e => e.stopPropagation(0)}
            style={{
              backgroundImage:
                "-webkit-gradient(linear, left top, right top, " +
                "color-stop(" +
                volume / 100 +
                ", var(--W_PointColor)), " +
                "color-stop(" +
                volume / 100 +
                ", var(--W_Gray01))" +
                ")"
            }}
          />
        </div>
        <div
          className={`GameSoundBtn ${volume === 0 && "GameSoundBtnOff"}`}
          onClick={onClickVolume}
          data-tip={intl.formatMessage({
            id: "ID_TOOLTIP_VOLUME"
          })}
        >
          <img src={soundImg} alt="sound btn" />
        </div>
        <div
          className="GameCloseBtn"
          data-tip={intl.formatMessage({
            id: "ID_TOOLTIP_CODE_STOP"
          })}
        >
          <img
            onClick={() => {
              setLog({ game: false });
              setIsPlaying(false);
            }}
            src={closeImg}
            alt="close"
          />
        </div>
      </div>
    </div>
  );
}
