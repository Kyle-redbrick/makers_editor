import React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import questionImg from "../../../../../Image/dream_builder_qestion_btn.svg";
import apiImg from "../../../../../Image/builder/api.svg";
import propertyImg from "../../../../../Image/builder/property.svg";
import apiActiveImg from "../../../../../Image/builder/api-w.svg";
import propertyActiveImg from "../../../../../Image/builder/property-w.svg";
import { EDITORMODE } from "../../../../../Common/Util/Constant";
import "./index.scss"

function RightBar({popupStates, handleSelectTab, intl, editorMode, isPropertyTabHidden}) {
  return (
    <div className={`RightBar RightBar_${editorMode}`}>
      {editorMode !== EDITORMODE.BLOCK && 
        <div
          onClick={() => handleSelectTab("api")}
          className={`btn ${popupStates.api && "btnActive"}`}
          data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_API" })}
        >
          <img src={popupStates.api ? apiActiveImg : apiImg} alt="img" />
        </div>
      }
      
      <Link target="_blank" rel="noopener noreferrer" to ="/lms/questions" className="btn">
        <img src={questionImg} alt="question img" />
      </Link>

      <div
        onClick={() => handleSelectTab("property")}
        className={`btn ${popupStates.property && "btnActive"} ${isPropertyTabHidden && "hidden"}`}
        data-tip={intl.formatMessage({ id: "ID_RIGHTBAR_PROPERTY" })}
      >
        <img src={popupStates.property ? propertyActiveImg : propertyImg} alt="img" />
      </div>
    </div>
  );
}

export default connect(state => ({ editorMode: state.scene.editorMode }))(
  injectIntl(RightBar)
);
