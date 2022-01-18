import React from "react";
import playImg from "../../../../Image/builder/group-2.svg";
import fullImg from "../../../../Image/builder/full-screen.svg";
import "./index.scss";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import ButtonIndicator from "../ButtonIndicator";
import { PAGETYPE } from "../../../../Common/Util/Constant";

export default function(props) {
  const {
    setIsPlaying,
    setLog,
    intl,
    toggleFullScreen,
    email,
    currentUser,
    pageType
  } = props;

  return (
    <div className="PlayContainer">
      <div
        onClick={() => {
          if (pageType === PAGETYPE.WIZLIVE_1V4) {
            //CHECK ME!!
            if (currentUser.email === email) {
              TrackingUtil.sendGAEvent({
                category: "Builder",
                action: "PlayGame"
              });

              setLog({ game: true });
              setIsPlaying(true);
            }
          } else {
            TrackingUtil.sendGAEvent({
              category: "Builder",
              action: "PlayGame"
            });

            setLog({ game: true });
            setIsPlaying(true);
          }
        }}
        className="PlayButton"
        data-tip={intl.formatMessage({
          id: "ID_TOOLTIP_CODE_PLAY"
        })}
      >
        <ButtonIndicator buttonId="playImg">
          <img src={playImg} alt="play btn" />
        </ButtonIndicator>
      </div>
      <div className="FullScreenBtn" onClick={toggleFullScreen}>
        <img src={fullImg} alt="full btn" />
      </div>
    </div>
  );
}
