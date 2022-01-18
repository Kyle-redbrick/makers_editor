import React from "react";
import { Link } from "react-router-dom";
import goldCrownIcon from "../../../../Image/icon-crown-gold.svg";
import silverCrownIcon from "../../../../Image/icon-crown-silver.svg";
import bronzeCrownIcon from "../../../../Image/icon-crown-bronze.svg";
import heartIcon from "../../../../Image/heart.svg";
import "./index.scss";
import UserIconWrapper from "../../../../Common/Component/UserIconWrapper";

const Usercard = props => {
  const { usercard } = props;
  let crownIcon = bronzeCrownIcon;
  switch (usercard.index) {
    case 0:
      crownIcon = goldCrownIcon;
      break;
    case 1:
      crownIcon = silverCrownIcon;
      break;
    default:
      break;
  }

  return (
    <Link to={`/userpage/${usercard.id}`} style={{ textDecoration: "none" }}>
      <div className="Usercard">
        {usercard.index < 3 ? (
          <img className="Usercard-crownImg" src={crownIcon} alt="img" />
        ) : (
          <div className="Usercard-index" />
        )}

        <div className="Usercard-icon">
          <UserIconWrapper
            iconSrc={usercard.icon}
            style={{ marginTop: "5px" }}
          />
        </div>
        <div className="Usercard__UserInfoWrapper">
          <div className="Usercard__UserInfoWrapper_LikeWrap">
            <img src={heartIcon} alt="img" />
            <div>{usercard.likeCount}</div>
          </div>
          <div className="Usercard__UserInfoWrapper__TopWrapper--nikName">
            {usercard.name}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Usercard;
