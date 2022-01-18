import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import * as previewActions from "../../Store/Reducer/preview";
import * as sceneActions from "../../Store/Reducer/scene";
import { VCTYPE } from "../../../../Common/Util/Constant";
import RndWrapper from "../../utils/RndWrapper";
import { checkConditions, checkGameEvent } from "./util/condition";
import { createEgoMessage } from "./util/ego";
import View from "./View";
import { showPopUp } from "../../../../Common/Component/PopUp";
import ReactDOM from "react-dom";
import wizclassPlayImg from "../../../../Image/wizclass__play.svg";
// import successImg from "../../../../Image/videoclass/success-step-kr.png";
import checkImg from "../../../../Image/circle-check.svg";
import closeImg from "../../../../Image/close-btn-popup2.svg";

import template from "./template";

class Container extends Component {
  constructor(props) {
    super(props);
    if (props.videoclass) {
      this.videoclass = props.videoclass;
    } else {
      this.videoclass = template;
    }
    if (props.setRef) {
      props.setRef(this);
    }
    this.onEndStage = props.onEndStage;
    this.endStageButtonAction = props.endStageButtonAction;
    this.endStageButtonId = props.endStageButtonId;

    this.checkConditionInterval = null;
    this.checkCodeInterval = null;
    this.videoRef = null;
    this.egoRef = null;
    this.successAudio = new Audio(
      "https://wizschool-assets.oss-cn-shanghai.aliyuncs.com/sfx/effect_3.mp3"
    );

    const currentStageNum = this.videoclass.currentStageNum;
    const currentStage = this.videoclass.stages[currentStageNum];
    this.maxStageNum = this.videoclass.stages.length;

    this.state = {
      currentStage,
      isSidebarHidden: true,
      isVideoPlaying: false,
      isVideoUIHidden: false,
      isSuccessHidden: true,
      customContent: null,
      isNavOpen: false,
      isOpenWizclassGame: false,
      wizclassGameUrl: ""
    };
  }
  componentDidMount() {
    this.props.hideLockSprite(null, true);
    this.updateConditionInterval();
    this.addForceNextListener();
    const { currentStage } = this.state;
    if (!currentStage.isOpen) {
      currentStage.isOpen = true;
    }
    let isFromWizclass =
      this.props.email === "multicampus01@wizschool.io" ||
      this.props.email === "multicampus02@wizschool.io" ||
      this.props.email === "multicampus03@wizschool.io" ||
      this.props.email === "dream01@wizschool.io" ||
      this.props.email === "dream02@wizschool.io" ||
      this.props.email === "dream03@wizschool.io";

    if (
      isFromWizclass &&
      this.props.match.params &&
      this.props.match.params.type === "escape"
    ) {
      if (this.props.videoclass.level === 1) {
        let wizclassGameUrl;

        if (this.videoclass.title.startsWith("초급")) {
          wizclassGameUrl =
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/5ae60ab3-f5ae-4084-93ee-a59be680f184.html";
        }
        if (this.videoclass.title.startsWith("중급")) {
          wizclassGameUrl =
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/364d12bd-2af9-42e1-8eec-2005fbb063fa.html";
        }
        if (this.videoclass.title.startsWith("고급")) {
          wizclassGameUrl =
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/d858e0f6-85fc-4d53-b4e4-19b35090bbe7.html";
        }
        this.setState(
          {
            isNavOpen: false,
            isOpenWizclassGame: true,
            wizclassGameUrl
          },
          () => {
            let footerControl = document.querySelector(
              ".ocpView_footer_stageControl"
            );
            if (footerControl) {
              footerControl.style.visibility = "hidden";
            }

            showPopUp(
              <div className="wizclass__game__popup">
                <img src={wizclassPlayImg} alt="play" />
                <div className="wizclass__game__popup__title">
                  {`화면을 터치해서 완성된 게임을 \n 먼저 실행해보세요.`}
                </div>
                <div className="wizclass__game__popup__desc">
                  방을 탈출하면 게임이 클리어됩니다.
                </div>
                <div
                  className="wizclass__game__popup__button"
                  onClick={() => {
                    let popup = document.getElementById("popup");
                    if (popup) {
                      ReactDOM.render(null, popup);
                    }
                  }}
                >
                  실행
                </div>
              </div>
            );
          }
        );
      } else {
        setTimeout(() => {
          this.setState({ isNavOpen: true });
        }, 500);
        this.navCloseTimeout = setTimeout(() => {
          this.setState({ isNavOpen: false });
        }, 5000);
      }
    } else {
      setTimeout(() => {
        this.setState({ isNavOpen: true });
      }, 500);
      this.navCloseTimeout = setTimeout(() => {
        this.setState({ isNavOpen: false });
      }, 5000);
    }
  }

  componentWillUnmount() {
    if (this.checkConditionInterval) clearInterval(this.checkConditionInterval);
    if (this.checkCodeInterval) clearInterval(this.checkCodeInterval);
    this.removeForceNextListener();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { isClear, conditions, customIdMap } = this.state.currentStage;
    if (!isClear && conditions) {
      // 조건 업데이트
      conditions.forEach(condition => {
        if (condition.isClear) return;
        if (condition.type === VCTYPE.CONDITION.PLAY_ONCE) {
          // 게임 실행 조건 업데이트
          if (nextProps.isPlaying) {
            condition.isClear = true;
          }
        } else if (condition.type === VCTYPE.CONDITION.GAME_EVENT) {
          // 게임 이벤트 조건 업데이트
          if (
            checkGameEvent(
              condition.event,
              nextProps.lastGameEvent,
              customIdMap
            )
          ) {
            condition.isClear = true;
          }
        }
      });
      // 코드 조건을 만족하지 않고 게임 실행하면 에고가 안내
      if (this.props.isPlaying !== nextProps.isPlaying && nextProps.isPlaying) {
        checkConditions(this.videoclass, this.props.state, {
          failureHandler: condition => {
            setTimeout(() => {
              this.egoSay([
                {
                  type: VCTYPE.EGO.TEXT,
                  data: createEgoMessage(
                    condition,
                    this.videoclass.customSpriteIdMap,
                    this.props.intl
                  )
                }
              ]);
            }, 2000);
          },
          codeOnly: true
        });
      }
    }

    // 게임 이벤트 렌더링 최적화
    if (
      JSON.stringify(this.props.lastGameEvent) !==
      JSON.stringify(nextProps.lastGameEvent)
    ) {
      return false;
    }

    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    const { currentStage } = this.state;
    if (!currentStage.isOpen) {
      currentStage.isOpen = true;
    }
    if (prevProps.maxOcpLevel !== this.props.maxOcpLevel) {
      if (this.props.setRef) {
        this.props.setRef(this);
      }
    }
  }

  // condition check by interval
  updateConditionInterval = () => {
    if (this.checkConditionInterval) clearInterval(this.checkConditionInterval);
    if (this.checkCodeInterval) clearInterval(this.checkCodeInterval);
    const { currentStage } = this.state;
    const { isClear, conditions, successDelay } = currentStage;
    // 이미 성공한 단계이거나 조건이 없는 단계면 검사하지 않음
    if (!isClear && conditions) {
      // 실행 조건이 있을 때, 코드 조건을 만족하면 실행 유도
      if (
        conditions.findIndex(
          condition => condition.type === VCTYPE.CONDITION.PLAY_ONCE
        ) > -1
      ) {
        this.checkCodeInterval = setInterval(() => {
          checkConditions(this.videoclass, this.props.state, {
            successHandler: () => {
              // this.props.flash(FLASHID.PLAY);
              this.egoSay([{ type: VCTYPE.EGO.PLAY }]);
              clearInterval(this.checkCodeInterval);
            },
            codeOnly: true
          });
        }, 1000);
      }
      // 모든 조건을 만족하면 성공 표시
      this.checkConditionInterval = setInterval(() => {
        checkConditions(this.videoclass, this.props.state, {
          successHandler: () => {
            currentStage.isClear = true;
            if (
              !(
                conditions.length === 1 &&
                (conditions[0].type === VCTYPE.CONDITION.SPRITE_SELECTED ||
                  conditions[0].type === VCTYPE.CONDITION.SCENE_SELECTED)
              )
            ) {
              this.successTimeout = setTimeout(() => {
                this.showSuccess();
              }, successDelay || 2000);
            }
            clearInterval(this.checkConditionInterval);
          }
        });
      }, 1000);
    }
  };

  // stage control
  nextStage = () => {
    const nextStageNum = isNaN(this.state.currentStage.nextStageNum)
      ? this.videoclass.currentStageNum + 1
      : this.state.currentStage.nextStageNum;
    if (nextStageNum < this.maxStageNum) {
      const currentStage = this.videoclass.stages[nextStageNum];
      currentStage.prevStageNum = this.videoclass.currentStageNum;
      this.videoclass.currentStageNum = nextStageNum;
      this.setState({ currentStage }, () => {
        const { ego } = currentStage;
        if (ego && ego.onStage) {
          setTimeout(() => {
            this.egoSay(ego.onStage);
          }, 2000);
        } else {
          this.egoSay();
        }
        if (this.successTimeout) {
          clearTimeout(this.successTimeout);
        }
        this.updateConditionInterval();
        this.hideSuccess();
        this.props.setIsPlaying(false);
        if (this.videoclass.currentStageNum === this.maxStageNum - 1) {
          if (this.onEndStage) this.onEndStage();
        }
        if (this.ocpFooterListenerForStageNumChange) {
          this.ocpFooterListenerForStageNumChange();
        }
      });
    }
  };
  prevStage = () => {
    const prevStageNum = isNaN(this.state.currentStage.prevStageNum)
      ? this.videoclass.currentStageNum - 1
      : this.state.currentStage.prevStageNum;
    if (prevStageNum >= 0) {
      const currentStage = this.videoclass.stages[prevStageNum];
      this.videoclass.currentStageNum = prevStageNum;
      this.setState({ currentStage }, () => {
        this.egoSay();
        this.updateConditionInterval();
        this.props.setIsPlaying(false);
        if (this.ocpFooterListenerForStageNumChange) {
          this.ocpFooterListenerForStageNumChange();
        }
      });
    }
  };
  onClickBranch = branch => {
    const stageNum = branch.stageNum;
    if (0 <= stageNum && stageNum < this.maxStageNum) {
      const currentStage = this.videoclass.stages[stageNum];
      const prevStageNum = this.videoclass.currentStageNum;
      if (prevStageNum < stageNum) currentStage.prevStageNum = prevStageNum;
      this.videoclass.currentStageNum = stageNum;
      this.setState({ currentStage }, () => {
        this.egoSay();
        this.updateConditionInterval();
        this.props.setIsPlaying(false);
      });
    }
  };
  // force next stage
  onKeydown = e => {
    this.keyPressed[e.key] = true;
    if (
      this.keyPressed["Shift"] &&
      this.keyPressed["W"] &&
      this.keyPressed["ArrowRight"]
    ) {
      this.nextStage();
    }
  };
  onKeyup = e => {
    delete this.keyPressed[e.key];
  };
  addForceNextListener = () => {
    this.keyPressed = {};
    document.addEventListener("keydown", this.onKeydown);
    document.addEventListener("keyup", this.onKeyup);
  };
  removeForceNextListener = () => {
    document.removeEventListener("keydown", this.onKeydown);
    document.removeEventListener("keyup", this.onKeyup);
  };

  // header control
  onClickNext = () => {
    const { intl } = this.props;
    const { currentStage } = this.state;
    if (currentStage.isClear) {
      this.nextStage();
    } else {
      checkConditions(this.videoclass, this.props.state, {
        successHandler: () => {
          currentStage.isClear = true;
          this.nextStage();
        },
        failureHandler: condition => {
          this.egoSay([
            {
              type: VCTYPE.EGO.TEXT,
              data: createEgoMessage(
                condition,
                this.videoclass.customSpriteIdMap,
                intl
              )
            }
          ]);
        }
      });
    }
  };
  onClickPrev = () => {
    this.prevStage();
  };
  onClickList = () => {
    this.showSidebar();
    this.updateStagesScroll();
  };
  onClickHint = () => {
    const hint = this.state.currentStage.hint;
    if (hint) this.egoSay(hint);
  };
  onClickAnsw = () => {
    const answer = this.state.currentStage.answer;
    if (answer) this.egoSay(answer, 300000);
  };

  // sidebar control
  showSidebar = () => {
    this.setState({ isSidebarHidden: false });
  };
  hideSidebar = () => {
    this.setState({ isSidebarHidden: true });
  };
  onClickSidebarOverlay = () => {
    this.hideSidebar();
  };
  onClickStage = stageNum => {
    const currentStage = this.videoclass.stages[stageNum];
    this.videoclass.currentStageNum = stageNum;
    this.setState({ currentStage }, () => {
      this.egoSay();
      this.updateConditionInterval();
      this.hideSidebar();
      this.hideSuccess();
      this.props.setIsPlaying(false);
    });
  };
  updateStagesScroll = () => {
    const stagesElement = document.getElementById("vc_stages");
    const currentStageElement = document.getElementById(
      `vc_stage-${this.videoclass.currentStageNum}`
    );
    if (stagesElement && currentStageElement) {
      stagesElement.scrollTop =
        currentStageElement.offsetTop - stagesElement.offsetHeight / 3;
    }
  };

  toggleNav = () => {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  };

  // video control
  setVideoRef = element => {
    if (!element) return;
    if (this.videoRef) this.videoRef.pause();
    this.videoRef = element;
    this.videoRef.disablePictureInPicture = true;
    this.videoRef.onplay = this.videoOnplay;
    this.videoRef.onpause = this.videoOnpause;
    this.videoRef.onended = this.videoOnended;
    this.videoRef.onmouseout = this.videoOnmouseout;
    this.videoRef.onmousemove = this.videoOnmousemove;
    this.videoRef.ondblclick = this.videoOndblclick;
  };
  videoOnplay = e => {
    this.setState({ isVideoPlaying: true });
  };
  videoOnpause = e => {
    this.setState({ isVideoPlaying: false });
  };
  videoOnended = e => {
    this.setState({ isVideoPlaying: false }, () => {
      this.nextStage();
    });
  };
  videoOnmouseout = e => {
    if (this.state.isVideoPlaying) {
      if (this.hideVideoUITimeeout) clearTimeout(this.hideVideoUITimeeout);
      this.setState({ isVideoUIHidden: true });
    }
  };
  videoOnmousemove = e => {
    this.setState({ isVideoUIHidden: false });
    if (this.hideVideoUITimeeout) clearTimeout(this.hideVideoUITimeeout);
    this.hideVideoUITimeeout = setTimeout(() => {
      if (this.state.isVideoPlaying) {
        this.setState({ isVideoUIHidden: true });
      }
    }, 2500);
  };
  videoOndblclick = e => {
    e.preventDefault();
    return false;
  };

  // success control
  showSuccess = () => {
    if (this.successAudio) {
      this.successAudio.pause();
      this.successAudio.currentTime = 0;
      this.successAudio.play();
    }
    // this.setState({ isSuccessHidden: false });
    const { formatMessage } = this.props.intl;
    this.props.showModal(
      <div className="vc_success_container">
        {/* <img src={successImg} alt="success" /> */}
        <img className="vc_success_icon" src={checkImg} alt="success" />
        <img
          className="close-img"
          src={closeImg}
          alt="close"
          onClick={this.hideSuccess}
        />
        <div className="textWrapper">
          <p>{formatMessage({ id: "ID_VIDEOCLASS_MISSION_SUCCESS01" })}</p>
          <p>{formatMessage({ id: "ID_VIDEOCLASS_MISSION_SUCCESS02" })}</p>
          <p>{formatMessage({ id: "ID_VIDEOCLASS_MISSION_SUCCESS03" })}</p>
        </div>
        <div className="vc_success_buttons">
          <div
            className="vc_success_button vc_success_button-more"
            onClick={this.onClickSuccessMore}
          >
            <span>{formatMessage({ id: "ID_VIDEOCLASS_SUCCESS_MORE" })}</span>
          </div>
          <div
            className="vc_success_button vc_success_button-next"
            onClick={this.onClickSuccessNext}
          >
            <span>{formatMessage({ id: "ID_VIDEOCLASS_SUCCESS_NEXT" })}</span>
          </div>
        </div>
      </div>
    );
  };
  hideSuccess = () => {
    // this.setState({ isSuccessHidden: true });
    this.props.showModal(null);
  };
  onClickSuccessNext = () => {
    this.nextStage();
  };
  onClickSuccessMore = () => {
    this.hideSuccess();
  };

  // ego control
  setEgoRef = egoRef => {
    if (!egoRef) return;
    this.egoRef = egoRef.getWrappedInstance();
  };
  egoSay = (egoMessages, timeout) => {
    if (this.egoRef) this.egoRef.egoSay(egoMessages, timeout);
  };
  onClickEgo = () => {
    const { ego } = this.state.currentStage;
    if (ego) {
      this.egoSay(ego, 5000);
    }
  };

  showCustomContent = (content, onsetstate) => {
    this.setState({ customContent: content }, () => {
      if (onsetstate) onsetstate();
    });
  };

  handleOcpLevelChange = level => {
    this.props.history.replace(`./${level}`);
    window.location.reload();
  };

  handleNavInteraction = () => {
    if (this.navCloseTimeout) {
      clearTimeout(this.navCloseTimeout);
    }
  };

  closeWizClassGame = () => {
    this.setState({ isOpenWizclassGame: false }, () => {
      let footerControl = document.querySelector(
        ".ocpView_footer_stageControl"
      );
      if (footerControl) {
        footerControl.style.visibility = "visible";
      }
    });
  };
  render() {
    const { intl, zIndex, handleChangeZIndex, fixed, isPlaying } = this.props;
    const {
      currentStage,
      isSidebarHidden,
      isVideoPlaying,
      isVideoUIHidden,
      isSuccessHidden,
      customContent,
      isNavOpen,
      isOpenWizclassGame,
      wizclassGameUrl
    } = this.state;

    const classTitle = this.videoclass.title;
    const stages = this.videoclass.stages;
    const currentStageNum = this.videoclass.currentStageNum;
    const isStartStage = this.videoclass.currentStageNum === 0;
    const isEndStage = this.videoclass.currentStageNum === this.maxStageNum - 1;
    const withRnd =
      currentStage.type === VCTYPE.STEP.CODE ||
      (currentStage.type === VCTYPE.STEP.IMAGE &&
        currentStage.conditions &&
        currentStage.conditions.length > 0 &&
        (currentStage.conditions[0].type === VCTYPE.CONDITION.SCENE_SELECTED ||
          currentStage.conditions[0].type ===
            VCTYPE.CONDITION.SPRITE_SELECTED));
    const fullScreen = !withRnd;

    let view = (
      <View
        intl={intl}
        fixed={fixed}
        fullScreen={fullScreen}
        handleChangeZIndex={handleChangeZIndex}
        currentStage={currentStage}
        isSidebarHidden={isSidebarHidden}
        isVideoPlaying={isVideoPlaying}
        isVideoUIHidden={isVideoUIHidden}
        isSuccessHidden={isSuccessHidden}
        customContent={customContent}
        stages={stages}
        currentStageNum={currentStageNum}
        isStartStage={isStartStage}
        isEndStage={isEndStage}
        onClickNext={this.onClickNext}
        onClickPrev={this.onClickPrev}
        onClickList={this.onClickList}
        onClickHint={this.onClickHint}
        onClickAnsw={this.onClickAnsw}
        onClickStage={this.onClickStage}
        onClickSidebarOverlay={this.onClickSidebarOverlay}
        setVideoRef={this.setVideoRef}
        onClickSuccessNext={this.onClickSuccessNext}
        onClickSuccessMore={this.onClickSuccessMore}
        setEgoRef={this.setEgoRef}
        onClickEgo={this.onClickEgo}
        endStageButtonAction={this.endStageButtonAction}
        endStageButtonId={this.endStageButtonId}
        classTitle={classTitle}
        maxOcpLevel={this.props.maxOcpLevel}
        currentOcpLevel={this.props.videoclass.level}
        handleOcpLevelChange={this.handleOcpLevelChange}
        isNavOpen={isNavOpen}
        toggleNav={this.toggleNav}
        isPlaying={isPlaying}
        handleNavInteraction={this.handleNavInteraction}
        isOpenWizclassGame={isOpenWizclassGame}
        closeWizClassGame={this.closeWizClassGame}
        wizclassGameUrl={wizclassGameUrl}
      />
    );

    if (fixed) {
      const contentMain = document.getElementsByClassName("Content_Main")[0];
      if (contentMain) {
        contentMain.style.position = fullScreen ? "absolute" : "relative";
      }
      return view;
    }

    // Code, SelectSprite, SelectScene 은 전체화면이 아니다.
    if (withRnd) {
      view = (
        <RndWrapper
          id="videoclass"
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
          {view}
        </RndWrapper>
      );
    }

    return view;
  }
}

export default connect(
  state => ({
    state,
    lastGameEvent: state.game.lastEvent,
    isPlaying: state.preview.isPlaying,
    email: state.userinfo.email
  }),
  {
    setIsPlaying: previewActions.setIsPlaying,
    hideLockSprite: sceneActions.hideLockSprite
  }
)(withRouter(injectIntl(Container)));
