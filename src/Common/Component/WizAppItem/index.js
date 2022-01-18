import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";

import gameDetailIcon from "../../../Image/game-detail.png";

export default function(props) {
  const { item } = props;
  return (
    <Link to={`?pId=${item.pId}`} style={{ textDecoration: "none" }}>
      <div className="WizAppItem">
        <div className="top">
          <div className="ImageCenterCrop">
            <img className="WizappItemImage" src={item.icon} alt="thumbnail" />
            <div className="Dim">
              <div className="DimInner">
                <img className="userIcon" src={item.user.icon} alt="icon" />

                <img
                  className="gameDetailIcon"
                  src={gameDetailIcon}
                  alt="thumbnail"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="itemTitle">
            <p>{item.name}</p> {/* app name */}
          </div>
          <div className="userInfo">
            <label className="userName">{item.user.name}</label>
          </div>
        </div>
      </div>
    </Link>
  );
}
