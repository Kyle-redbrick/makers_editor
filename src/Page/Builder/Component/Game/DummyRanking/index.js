import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import rankBgImage from "../../../../../Image/rank-icon.svg";
import closeBtnImage from "../../../../../Image/close-btn.svg";

import "./index.scss";

class DummyRanking extends Component {
  onClickClose = () => {
    this.props.handleDummyRankingHide();
  };

  render() {
    return (
      <div className="DummyRankingContainer">
        <div className="DummyRankingHeader">
          <div className="DummyRankingHeader__ranking">
            <img src={rankBgImage} alt="Rank" />
          </div>
        </div>
        <div className="DummyRankingClose" onClick={this.onClickClose}>
          <img src={closeBtnImage} alt="Close button" />
        </div>
        <div className="DummyRankingBody">
          <div className="DummyRankingBody__rankingLabel">
            <FormattedMessage id="ID_WIZAPPDETAIL_GAME_RANKING_LABLE" />
          </div>
          <div className="DummyRankingBody__content">
            <div className="DummyRankingBody">
              <div className="DummyRankingBody__Text">
                <FormattedMessage id="ID_DUMMY_RANKING_NOT_SUPPORT" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DummyRanking;
