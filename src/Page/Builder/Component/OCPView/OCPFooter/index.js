import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./index.scss";

import prevStageImg from "../../../../../Image/ocpFooterArrow-prev.png";
import nextStageImg from "../../../../../Image/ocpFooterArrow-next.png";
import nextLevelImg from "../../../../../Image/arrow-next.png";
import navImg from "../../../../../Image/icon-nav-list.svg";

class OCPFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLevel: 0,
      currentStageNum: 0,
      maxStageNum: 1
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.videoclassRef !== this.props.videoclassRef) {
      this.onChangeVideoclassRef();
    }
  }
  onChangeVideoclassRef() {
    const { videoclassRef } = this.props;
    if (videoclassRef) {
      const currentLevel = videoclassRef.videoclass.level;
      const currentStageNum = videoclassRef.videoclass.currentStageNum;
      const maxStageNum = videoclassRef.videoclass.stages.length;
      videoclassRef.ocpFooterListenerForStageNumChange = this.onChangeCurrentStageNum;
      this.setState({ currentLevel, currentStageNum, maxStageNum });
    }
  }

  onChangeCurrentStageNum = () => {
    const { videoclassRef } = this.props;
    if (videoclassRef) {
      const currentStageNum = videoclassRef.videoclass.currentStageNum;
      this.setState({ currentStageNum });
    }
  };
  onClickPrevStage = () => {
    const { videoclassRef } = this.props;
    if (videoclassRef) {
      videoclassRef.onClickPrev();
    }
  };
  onClickNextStage = () => {
    const { videoclassRef } = this.props;
    if (videoclassRef) {
      videoclassRef.onClickNext();
    }
  };
  onClickNextLevel = () => {
    const { videoclassRef } = this.props;
    if (videoclassRef) {
      const nextLevel = videoclassRef.videoclass.level + 1;
      if (nextLevel <= 10) {
        this.props.history.replace(`./${nextLevel}`);
        window.location.reload();
      } else {
        window.close();
      }
    }
  };
  requestFullscreen = () => {
    if (navigator.userAgent.match(/Android/i)) {
      var docelem = document.documentElement;

      if (docelem.requestFullscreen) {
        docelem.requestFullscreen();
      } else if (docelem.mozRequestFullScreen) {
        docelem.mozRequestFullScreen();
      } else if (docelem.webkitRequestFullScreen) {
        docelem.webkitRequestFullScreen();
      } else if (docelem.msRequestFullscreen) {
        docelem.msRequestFullscreen();
      }
    }
  };

  handleOpenNav = () => {
    const { videoclassRef } = this.props;
    videoclassRef.toggleNav();
  };

  render() {
    const { currentLevel, currentStageNum, maxStageNum } = this.state;
    const isLastLevel = currentLevel === 10;
    const isFirstStage = currentStageNum === 0;
    const isLastStage = currentStageNum === maxStageNum - 1;
    const disablePrevStage = isFirstStage;
    const disableNextStage = isLastStage;
    const showNextLevelButton = isLastStage;

    return (
      <div className="ocpView_footer">
        {window.location.pathname.includes("escape") && (
          <div className="ocpView_footer_left">
            <div className="ocpView_footer_nav">
              <img src={navImg} alt="nav" onClick={this.handleOpenNav} />
            </div>
            <div className="ocpView_footer_nav_title">
              {this.props.videoclass.title}
            </div>
          </div>
        )}
        <div className="ocpView_footer_stageControl">
          <img
            className={`ocpView_footer_stageArrow ocpView_footer_stageArrow-prev${
              disablePrevStage ? " ocpView_footer_stageArrow-disable" : ""
            }`}
            src={prevStageImg}
            alt="prev"
            onClick={this.onClickPrevStage}
          />
          <div className="ocpView_footer_stageCount">{`${currentStageNum +
            1}/${maxStageNum}`}</div>
          <img
            className={`ocpView_footer_stageArrow ocpView_footer_stageArrow-next${
              disableNextStage ? " ocpView_footer_stageArrow-disable" : ""
            }`}
            src={nextStageImg}
            alt="next"
            onClick={e => {
              this.requestFullscreen();
              this.onClickNextStage();
            }}
          />
        </div>
        {showNextLevelButton && (
          <div
            className="ocpView_footer_nextLevel"
            onClick={this.onClickNextLevel}
          >
            <span>{isLastLevel ? "종료하기" : "다음 스텝으로"}</span>
            <img src={nextLevelImg} alt="nextLevel" />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    videoclass: state.project.videoclass
  }),
  {}
)(withRouter(OCPFooter));
