import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss"
import clearImg from "../../../../../../Image/quest-clear-img-astroboy.svg"

function ProjectClear(props) {
  return (
    <div className="dream_projectClear">
      <img className="dream_projectClear_image" src={clearImg} alt="clear" />
      <p className="popup_title">{props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR" })}</p>
      <div className="popup_subtitle">
        {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_SUBTITLE" })}
      </div>
      <div className="questClear_popup_details">
        <div className="questClear_popup_details_row">
          <div className='questClear_popup_details_category'>IT</div>
          <div class="questClear_popup_details_info">Sequence</div>
        </div>
        <div className="questClear_popup_details_row">
          <div className='questClear_popup_details_category'>STEM</div>
          <div class="questClear_popup_details_info">Sequence</div>
        </div>
        <div className="questClear_popup_details_row">
          <div className='questClear_popup_details_category'>SDG</div>
          <div class="questClear_popup_details_info">Sequence</div>
        </div>
      </div>
      <div className="popup_buttons">
        <button
          className="popup_button popup_button-cancel"
          onClick={() => {
            if (props.onClickCancel) props.onClickCancel();
            if (props.dismiss) props.dismiss();
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_CANCEL_BUTTON" })}
        </button>
        <button
          className="popup_button"
          onClick={() => {
            if (props.onClickConfirm) props.onClickConfirm();
            if (props.dismiss) props.dismiss();
          }}
        >
          {props.intl.formatMessage({ id: "ID_DREAM_BUILDER_QUEST_CLEAR_CONFIRM_BUTTON" })}
        </button>
      </div>
    </div>
  );
}

export default injectIntl(ProjectClear);
