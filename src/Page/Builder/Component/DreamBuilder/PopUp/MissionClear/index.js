import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss"

// import clearImg from "../../../../../../Image/dream_missionClear.svg";
// import clearImg from "../../../../../../Image/astroboy.png";
import clearImg from "../../../../../../Image/mission-clear-img.svg"

function MissionClear(props) {
  return  (
    <div className="dream_missionClear">
      <img className="dream_missionClear_image" src={clearImg} alt="clear"/>
      <p className="popup_title">{props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MISSION_CLEAR" })}</p>
      <div className="popup_subtitle">
        {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MISSION_CLEAR_SUBTITLE" })}
      </div>
      <div className="popup_buttons">
        <button
          className="popup_button popup_button-cancel"
          onClick={props.dismiss}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MISSION_CLEAR_CANCEL_BUTTON" })}
        </button>
        <button
          className="popup_button"
          onClick={() => {
            if (props.onClickConfirm) props.onClickConfirm();
            if (props.dismiss) props.dismiss();
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_MISSION_CLEAR_CONFIRM_BUTTON" })}
        </button>
      </div>
    </div>
  );
}

export default injectIntl(MissionClear);
