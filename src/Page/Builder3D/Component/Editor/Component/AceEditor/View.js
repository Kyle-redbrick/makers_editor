import React from "react";
import plusImg from "../../../../../../Image/builder3d/zoom-in.svg";
import minusImg from "../../../../../../Image/builder3d/zoom-out.svg";
import sortImg from "../../../../../../Image/builder3d/align.svg";
import "./index.scss";
// import ButtonIndicator from "../../../ButtonIndicator";

export default function(props) {
  const {
    intl,
    setSorting,
    setFontZoomIn,
    setFontZoomOut,
    selectedObject,
    tooltip
  } = props;

  let locktoggle = "off";
  if (selectedObject) {
    locktoggle = selectedObject.locked ? "on" : "off";
  }
  return (
    <div className="EditorContainer__editor">
      <div id="ace-editor-3d" />
      <div id="EditorContainer3d_tooltip" className="EditorContainer_tooltip">
        {tooltip && (
          <React.Fragment>
            <div className="EditorContainer_tooltip_anchor" />
            <div className="EditorContainer_tooltip_content">
              <div className="EditorContainer_tooltip_title">
                {tooltip.caption}
              </div>
              <div className="EditorContainer_tooltip_subtitle">
                {tooltip.tip && tooltip.tip.description.ko}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="EditorContainer__zoomBtns">
        <div
          className="EditorContainer__zoomBtn EditorContainer__sort"
          onClick={setSorting}
          data-tip={intl.formatMessage({ id: "ID_BUILDER_CODE_SORT" })}
        >
          {/* <ButtonIndicator buttonId="sortImg"> */}
          <img src={sortImg} alt="sort" />
          {/* </ButtonIndicator> */}
        </div>
        <div
          className="EditorContainer__zoomBtn EditorContainer__zoomIn"
          onClick={setFontZoomIn}
          data-tip={intl.formatMessage({ id: "ID_BUILDER_CODE_PLUS" })}
        >
          {/* <ButtonIndicator buttonId="plusImg"> */}
          <img src={plusImg} alt="plus" />
          {/* </ButtonIndicator> */}
        </div>
        <div
          className=" EditorContainer__zoomBtn EditorContainer__zoomOut"
          onClick={setFontZoomOut}
          data-tip={intl.formatMessage({ id: "ID_BUILDER_CODE_MINUS" })}
        >
          {/* <ButtonIndicator buttonId="minusImg"> */}
          <img src={minusImg} alt="minus" />
          {/* </ButtonIndicator> */}
        </div>
      </div>
      <div className={`editLockContainer--${locktoggle}`}>
        <div className="editLockInner">
          <div className="editLock--title">
            {intl.formatMessage({
              id: "ID_EDIT_LOCK_SPRITE_TITLE"
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
