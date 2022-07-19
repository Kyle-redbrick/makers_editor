import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import blankSrc from "../../../Image/blank_profile.png";

const UserIconWrapper = props => {
  const { iconSrc, style, userId, userDefault } = props;

  if (userId) {
    return (
      <Link to={`/userpage/${userId}`} style={{ textDecoration: "none" }}>
        <div
          className={`UserIconWrapper ${
            userDefault ? "Default" : "NotDefault"
          }`}
          style={style}
        >
          <img
            className="UserIconWrapper_Icon"
            src={iconSrc ? iconSrc : blankSrc}
            alt="img"
          />
        </div>
      </Link>
    );
  }
  return (
    <div
      className={`UserIconWrapper ${userDefault ? "Default" : "NotDefault"}`}
      style={style}
    >
      <img
        className="UserIconWrapper_Icon"
        src={iconSrc ? iconSrc : blankSrc}
        alt="img"
      />
    </div>
  );
};

export default UserIconWrapper;
