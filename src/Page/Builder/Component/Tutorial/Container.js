import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as previewActions from "../../Store/Reducer/preview";
import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType
} from "../../../../Common/Util/Constant";
import RndWrapper from "../../utils/RndWrapper";
import View from "./View";
import * as request from "../../../../Common/Util/HTTPRequest";
import { /*PopUp, */ showPopUp } from "../../../../Common/Component/PopUp";
import { getColorTheme } from "../../utils/colorThemeUtil";
import { checkConditions } from "./ConditionChecker.js";
import wizLiveBannerImg from "../../../../Image/wizlive_banner03.png";
// import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.videoclass = this.props.videoclass;
    this.stageCount = this.videoclass.stages.length;
    this.videoRef = null;
    this.egoSayTimer = null;
    this.state = {
      stage: this.videoclass.stages[this.videoclass.currentStageNum],
      isEgoSaying: false,
      egoMessages: []
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isPlaying) {
      this.videoclass.stages[this.videoclass.currentStageNum].didPlay = true;
    }
    if (nextProps.isPublished) {
      this.videoclass.stages[this.videoclass.currentStageNum].didPublish = true;
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isPlaying && !this.props.isPlaying) {
      this.egoSay();
    } else if (!prevProps.isPlaying && this.props.isPlaying) {
      checkConditions(
        this.videoclass,
        this.props.state,
        () => {
          this.egoSay([
            {
              type: EgoType.TEXT,
              data: "좋았어! 결과를 확인해보고 다음 단계로 넘어가자."
            }
          ]);
        },
        condition => {
          this.egoSay([
            {
              type: EgoType.TEXT,
              data: "제대로 작동하는지 한 번 확인해볼까?"
            }
          ]);
        }
      );
    }
  }

  // stage control
  nextStage = () => {
    const nextNum = this.videoclass.currentStageNum + 1;
    if (nextNum < this.stageCount) {
      this.videoclass.currentStageNum = nextNum;
      this.props.setIsPlaying(false);
      const nextStage = this.videoclass.stages[nextNum];
      this.setState({ stage: nextStage }, async () => {
        // reset ego
        this.egoSay();
        // setup video
        if (nextStage.type === StageType.VIDEO) {
          setTimeout(() => {
            // this.videoRef.webkitRequestFullscreen();
            if (this.videoRef) this.videoRef.play();
          }, 500);
        } else {
          this.videoRef = null;
        }
        // my tutorial
        if (nextStage.type === StageType.END) {
          const {
            email,
            /*isMarketingAgreement,*/ currentTutorial
          } = this.props;
          const level = currentTutorial.tutorial.level;
          if (!currentTutorial.isComplete) {
            request
              .updateTutorialItem({ email, level })
              .then(res => res.json())
              .then(item => {
                if (item && level !== 10) {
                  request.createTutorialItem({ email, level: level + 1 });
                }
              });
          }
          if (level === 10) {
            // TrackingUtil.kakaoPixelEvent("tutorial");
            // const { formatMessage } = this.props.intl;
            // setTimeout(() => {
            //   if (!isMarketingAgreement) {
            //     showPopUp(
            //       <PopUp.TwoButton
            //         title={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_TITLE"
            //         })}
            //         subtitle={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_SUBTITLE"
            //         })}
            //         cancelButtonName={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_CANCEL"
            //         })}
            //         cancelAction={() => {
            //           showPopUp(
            //             <PopUp.OneButton
            //               title={formatMessage({
            //                 id: "ID_EVENT_EVENT1_TUTORIAL_CANCEL_TITLE"
            //               })}
            //               subtitle={formatMessage({
            //                 id: "ID_EVENT_EVENT1_TUTORIAL_CANCEL_SUBTITLE"
            //               })}
            //               buttonName={formatMessage({
            //                 id: "ID_EVENT_EVENT1_TUTORIAL_CANCEL_CONFIRM"
            //               })}
            //             />,
            //             {
            //               dismissButton: false,
            //               darkmode: getColorTheme() === "darkMode"
            //             }
            //           );
            //         }}
            //         confirmButtonName={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM"
            //         })}
            //         confirmAction={() => {
            //           request
            //             .updateUserInfo({ email, isMarketingAgreement: true })
            //             .then(res => res.json())
            //             .then(json => {
            //               if (json.success) {
            //                 this.props.updateUserInfo({
            //                   isMarketingAgreement: true
            //                 });
            //                 showPopUp(
            //                   <PopUp.OneButton
            //                     title={formatMessage({
            //                       id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_TITLE"
            //                     })}
            //                     subtitle={formatMessage({
            //                       id:
            //                         "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_SUBTITLE"
            //                     })}
            //                     buttonName={formatMessage({
            //                       id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_CONFIRM"
            //                     })}
            //                     buttonAction={this.showWizLivePopup}
            //                   />,
            //                   {
            //                     dismissButton: false,
            //                     darkmode: getColorTheme() === "darkMode"
            //                   }
            //                 );
            //               }
            //             });
            //         }}
            //       />,
            //       {
            //         dismissButton: false,
            //         darkmode: getColorTheme() === "darkMode"
            //       }
            //     );
            //   } else {
            //     showPopUp(
            //       <PopUp.OneButton
            //         title={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_TITLE"
            //         })}
            //         subtitle={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_SUBTITLE"
            //         })}
            //         buttonName={formatMessage({
            //           id: "ID_EVENT_EVENT1_TUTORIAL_CONFIRM_CONFIRM"
            //         })}
            //         buttonAction={this.showWizLivePopup}
            //       />,
            //       {
            //         dismissButton: false,
            //         darkmode: getColorTheme() === "darkMode"
            //       }
            //     );
            //   }
            // }, 1000);
          }
        }
      });
    }
  };

  showWizLivePopup = () => {
    showPopUp(
      <a
        href="https://wizlive.com/?trial=4"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={wizLiveBannerImg} alt="wizlive" />
      </a>,
      {
        dismissButton: false,
        darkmode: getColorTheme() === "darkMode",
        defaultPadding: false,
        dismissOverlay: true
      }
    );
  };

  prevStage = () => {
    const prevNum = this.videoclass.currentStageNum - 1;
    if (this.videoRef) this.videoRef = null;
    if (prevNum >= 0) {
      this.videoclass.currentStageNum = prevNum;
      const prevStage = this.videoclass.stages[prevNum];
      this.setState({ stage: prevStage }, () => {
        this.egoSay();
      });
    }
  };

  // video control
  setVideoRef = element => {
    if (!element) return;
    if (this.videoRef) this.videoRef.pause();
    this.videoRef = element;
    this.videoRef.disablePictureInPicture = true;
    this.videoRef.onended = this.videoOnended;
  };
  videoOnended = e => {
    this.nextStage();
  };

  // ego control
  egoSay = (messages, timeout = 5000) => {
    if (messages) {
      this.setState({ isEgoSaying: true, egoMessages: messages });
      if (this.egoSayTimer) clearTimeout(this.egoSayTimer);
      this.egoSayTimer = setTimeout(() => {
        this.setState({ isEgoSaying: false, egoMessages: [] });
      }, timeout);
    } else {
      this.setState({ isEgoSaying: false }, () => {
        setTimeout(() => {
          this.setState({ egoMessages: [] });
        }, 200);
      });
    }
  };
  onClickEgo = () => {
    const ego = this.state.stage.ego;
    if (ego) this.egoSay(ego);
  };
  onClickEgoBubble = () => {
    if (this.egoSayTimer) clearTimeout(this.egoSayTimer);
    this.egoSay();
  };

  // event control
  onClickPrev = () => {
    this.prevStage();
  };
  onClickNext = () => {
    // this.nextStage();
    // return;
    checkConditions(
      this.videoclass,
      this.props.state,
      () => {
        this.nextStage();
      },
      condition => {
        let message;
        switch (condition.type) {
          case ConditionType.SPRITE_EXIST:
            message = `${condition.spriteId} 스프라이트를 추가해줘!`;
            break;
          case ConditionType.CODE_EXIST:
            message = `코드가 잘 작성되었는지 한 번 더 확인해볼까?\n${
              condition.spriteId
            } 스프라이트에 코드를 입력해야해!`;
            break;
          case ConditionType.SCENE_FIRST:
            message = `${condition.sceneId}가 첫 번째\n장면이 되게 해야해!`;
            break;
          case ConditionType.SCENE_SELECTED:
            message = `${condition.sceneId}를\n클릭해서 선택해보자!`;
            break;
          case ConditionType.PLAY_ONCE:
            message = `한 번 실행해보자!`;
            break;
          case ConditionType.SPRITE_SELECTED:
            message = `${condition.spriteId}스프라이트를\n클릭해서 선택해보자!`;
            break;
          case ConditionType.PUBLISH_PROJECT:
            message = `오른쪽 위에 퍼블리싱하기를 클릭해서 퍼블리싱을 해보자!`;
            break;
          default:
            message = "문제가 생겼어!\n관리자에게 문의해야해..!";
            break;
        }
        this.egoSay([
          {
            type: "TEXT",
            data: message
          }
        ]);
      }
    );
  };
  onClickHint = () => {
    const hint = this.state.stage.hint;
    if (hint) this.egoSay(hint);
  };
  onClickAnsw = () => {
    const answer = this.state.stage.answer;
    if (answer) this.egoSay(answer, 30000);
  };
  onClickChangeLevel = () => {
    const level = this.props.currentTutorial.tutorial.level;
    if (level !== 10) {
      this.props.history.replace({ pathname: `/tutorial/${level + 1}` });
      window.location.reload();
    }
  };

  render() {
    const { zIndex, handleChangeZIndex } = this.props;
    const { stage, isEgoSaying, egoMessages } = this.state;
    const {
      setVideoRef,
      onClickPrev,
      onClickOverlay,
      onClickHint,
      onClickAnsw,
      onClickNext,
      onClickEgo,
      onClickEgoBubble,
      onClickChangeLevel
    } = this;

    const isStart = this.videoclass.currentStageNum === 0;
    const isEnd = this.videoclass.currentStageNum === this.stageCount - 1;
    const level = this.props.currentTutorial.tutorial.level;
    const title = this.videoclass.title;
    return (
      <RndWrapper
        id="tutorial"
        style={{ zIndex }}
        defaultWidth={550}
        defaultHeight={(550 * 9) / 16 + 35}
        defaultX={document.body.clientWidth - 630}
        defaultY={16}
        minWidth={550}
        minHeight={(550 * 9) / 16 + 35}
        lockAspectRatio={16 / 9}
        lockAspectRatioExtraHeight={35}
      >
        <View
          isFullscreen={stage.type !== StageType.CODE}
          title={title}
          stage={stage}
          isStart={isStart}
          isEnd={isEnd}
          isEgoSaying={isEgoSaying}
          egoMessages={egoMessages}
          setVideoRef={setVideoRef}
          level={level}
          onClickPrev={onClickPrev}
          onClickOverlay={onClickOverlay}
          onClickHint={onClickHint}
          onClickAnsw={onClickAnsw}
          onClickNext={onClickNext}
          onClickEgo={onClickEgo}
          onClickEgoBubble={onClickEgoBubble}
          onClickChangeLevel={onClickChangeLevel}
          handleChangeZIndex={handleChangeZIndex}
        />
      </RndWrapper>
    );
  }
}

export default connect(
  state => ({
    state: state,
    email: state.userinfo.email,
    isMarketingAgreement: state.userinfo.isMarketingAgreement,
    videoclass: state.project.videoclass,
    isPlaying: state.preview.isPlaying,
    isPublished: state.interaction.isPublished
  }),
  {
    updateUserInfo: userInfoActions.updateUserInfo,
    setIsPlaying: previewActions.setIsPlaying
  }
)(withRouter(injectIntl(Container)));
