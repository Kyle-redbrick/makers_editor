import React from "react";
import { injectIntl } from "react-intl";
import "./index.scss";
import FilteringHeader from "../FilteringHeader";
import Game2dIcon from "../../../../../../Image/icon-2d.svg";
import Game3dIcon from "../../../../../../Image/icon-3d.svg";

function View(props) {
  const {
    templates,
    onClick2DGame,
    onClick3DGame,
    onClickProject,
    setFilteringData,
    intl,
  } = props;

  return (
    <div className="builder--home__makingNew">
      <div className="makingNew__top">
        <div className="makingNew__title">
          {intl.formatMessage({ id: "ID_BUILDER_MAIN_TITLE" })}
        </div>
        <div className="making__items">
          <div className="making__item" onClick={onClick2DGame}>
            <img src={Game2dIcon} alt="2d game" />
            {intl.formatMessage({ id: "ID_BUILDER_MAIN_2D_GAME" })}
          </div>
          {/* <div className="making__item" onClick={onClick3DGame}>
            <img src={Game3dIcon} alt="3d game" />
            <p>
              {intl.formatMessage({ id: "ID_BUILDER_MAIN_3D_GAME" })}{" "}
              <span>{intl.formatMessage({ id: "ID_BUILDER_MAIN_BETA" })}</span>
            </p>
          </div> */}
        </div>
      </div>
      <div className="makingNew__bottom">
        <FilteringHeader setFilteringData={setFilteringData} />
        <div className="bottom__templateItems">
          {templates.map((item, index) => {
            return (
              <div
                className="templateItem projectItem projectItem__bottom"
                key={index}
                onClick={() => {
                  onClickProject(item.id);
                }}
              >
                <div className="projectItem__top">
                  <img
                    className="top__img"
                    src={item.thumbnailURL.THUMBNAIL_ALI()}
                    alt="top"
                  />
                </div>
                <div className="projectItem__bottom">
                  <div className="bottom__title">{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default injectIntl(View);
