import React from "react";
import { Link } from "react-router-dom";
import heartIcon from "../../../Image/icon-like.svg";
import commentIcon from "../../../Image/icon-comment.svg";
import viewIcon from "../../../Image/icon-view.svg";
import "./index.scss";

const Gamecard = props => {
  const { game, type } = props;
  return (
    <div className="Gamecard">
      <div className="Gamecard__ImageWrapper">
        <Link to={`?pId=${game.pId}`}>
          <p className="img" style={{ backgroundImage: `url(${game.icon})` }} />
        </Link>
        {type === "new" && (
          <div className="Gamecard__ImageWrapper__ButtonWrapper">
            <div className="Gamecard_SubInfoWrapper">
              <div className="Gamecard_SubInfoWrapper_ItemWrapper">
                <img src={heartIcon} alt="img" />
                <div className="Gamecard_SubInfoWrapper_ItemWrapper-text">
                  {game.likeCount}
                </div>
              </div>
              <div className="Gamecard_SubInfoWrapper_ItemWrapper">
                <img src={commentIcon} alt="img" />
                <div className="Gamecard_SubInfoWrapper_ItemWrapper-text">
                  {game.commentCount}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="Gamecard_Info_Wrapper">
        <img
          className="Gamecard_UserWrapper_Icon"
          src={game.user.icon}
          alt="img"
        />
        <div className="Gamecard_GameWrapper">
          <div className="Gamecard-gameTitle">{game.name}</div>
          <Link
            to={`/userpage/${game.user.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="Gamecard-userName">
              {game.user ? game.user.name : ""}
            </div>
          </Link>

          {!type && (
            <div>
              <div className="Gamecard_SubInfoWrapper info__inner">
                <div className="Gamecard_SubInfoWrapper_ItemWrapper">
                  <img src={heartIcon} alt="img" />
                  <div className="Gamecard_SubInfoWrapper_ItemWrapper-text">
                    {game.likeCount ? game.likeCount : "0"}
                  </div>
                </div>
                <div className="Gamecard_SubInfoWrapper_ItemWrapper">
                  <img src={viewIcon} alt="img" />
                  <div className="Gamecard_SubInfoWrapper_ItemWrapper-text">
                    {game.viewCount ? game.viewCount : "0"}
                  </div>
                </div>
                <div className="Gamecard_SubInfoWrapper_ItemWrapper">
                  <img src={commentIcon} alt="img" />
                  <div className="Gamecard_SubInfoWrapper_ItemWrapper-text">
                    {game.commentCount ? game.commentCount : "0"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gamecard;
