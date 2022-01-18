import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as action from "../../../../Common/Store/Reducer/UserInfo";
import moment from "moment";
import * as request from "../../../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import SignIn from "../../../../Common/Component/SignIn";
import SignUp from "../../../../Common/Component/SignUp";
import { resetOcpToken } from "../../../../Common/Util/OcpToken";
import OCPCertification from "../../../../Common/Component/OCPCertification";
import { detectIE } from "../../../../Common/Util/detectBrowser";

class Container extends Component {
  constructor(props) {
    super(props);
    this.DEFAULT_STATE = {
      comments: [],
      moreNum: 0,
      isShowFullScreen: false
    };
    this.state = {
      stages: [],
      isShowGameDetail: this.props.isShowGameDetail,
      mission: this.props.selectedMission,
      commentText: undefined,
      isCommentValid: true,
      commentCount: undefined,
      ...this.DEFAULT_STATE
    };
  }

  componentDidMount = () => {
    this.setResizeEventListener();
  };

  /** Life Cycle */
  componentDidUpdate(prevProps, prevState) {
    const { isShowGameDetail, selectedMission, userinfo } = this.props;
    if (isShowGameDetail !== prevProps.isShowGameDetail) {
      this.setShowGameDetail({
        then: () => {
          if (this.state.isShowGameDetail) {
            if (selectedMission !== prevProps.selectedMission) {
              this.setMission({
                then: () => {
                  this.getStages();
                  this.getComments();
                  this.getCount();
                }
              });
            }
          }
        }
      });
    }

    if (this.props.isShowGameDetail) {
      if (selectedMission !== prevProps.selectedMission) {
        this.setMission({
          then: () => {
            this.getStages();
            this.getComments();
            this.getCount();
          }
        });
      }
    }

    if (this.props.isShowGameDetail) {
      if (userinfo.email !== prevProps.userinfo.email) {
        this.props.onFocusForRefreshGameDetail();
      }
    }
  }

  /** Setting Methods */
  setShowGameDetail = param => {
    const { then } = param;
    if (then && typeof then !== "function")
      return console.error("Unknown type of then in setShowGameDetail");
    this.setState(
      {
        isShowGameDetail: this.props.isShowGameDetail
      },
      () => {
        if (this.state.isShowGameDetail) {
          this.setState(this.DEFAULT_STATE);
          if (then) then();
        } else {
          window.removeEventListener("resize", this.onResizeForStages);
        }
      }
    );
  };

  setMission = param => {
    const { then } = param;
    if (then && typeof then !== "function")
      return console.error("Unknown type of then in setMission");
    this.setState(
      {
        mission: this.props.selectedMission
      },
      () => {
        if (then) then();
      }
    );
  };

  setResizeEventListener = () => {
    window.addEventListener("resize", this.onResizeForStages);
  };

  onResizeForStages = () => {
    if (this.state.stages.length === 0) return;
    this.state.stages.forEach((_, index) => {
      const element = document.getElementById(
        `OCPGameDetail_st_iw-mobile-round-${index}`
      );
      if (!element) return;
      const innerWidth = window.innerWidth - 20 * 2;
      const itemWidth = (innerWidth - 40 * 4) / 5;
      element.style.width = `${itemWidth}px`;
      element.style.height = `${itemWidth}px`;
    });
  };

  /** Network */
  getStages = () => {
    const { mission } = this.state;
    if (!mission) return;
    this.setState({
      stages: [...Array(10).keys()].map((_, index) => {
        const stageInfo = require(`../../../Builder/utils/ocp/${
          mission.grade
        }/stages/${index + 1}`).data;
        return {
          title: stageInfo.title,
          img: stageInfo.img,
          level: index + 1
        };
      })
    });
  };

  getComments = (offset = 0) => {
    const { mission } = this.state;

    if (!mission.gameType || !mission.grade)
      return console.warn("not intended data in OCPGameDetail");
    const param = {
      grade: mission.grade,
      type: mission.gameType,
      offset: offset * 10
    };
    request
      .getOCPComments(param)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            comments:
              offset === 0
                ? json.comments
                    .filter(cm => !cm.isDeleted)
                    .map(cm => {
                      return {
                        ...cm,
                        interval: this.manipulateCmTime(cm.createdAt)
                      };
                    })
                : [
                    ...this.state.comments,
                    ...json.comments
                      .filter(cm => !cm.isDeleted)
                      .map(cm => {
                        return {
                          ...cm,
                          interval: this.manipulateCmTime(cm.createdAt)
                        };
                      })
                  ]
          });
        } else {
          if (json.msg) console.error(json.msg);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  getCount = () => {
    const { mission } = this.state;
    if (!mission.gameType || !mission.grade)
      return console.warn("not intended data in OCPGameDetail");
    const param = { grade: mission.grade, type: mission.gameType };
    request
      .getOCPCount(param)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            commentCount: json.count.commentCount
          });
        } else {
          if (json.msg) console.error(json.msg);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  addComment = () => {
    const { userinfo } = this.props;
    const { commentText, mission } = this.state;
    const param = {
      email: userinfo.email,
      commentText,
      grade: mission.grade,
      type: mission.gameType
    };
    request
      .addOCPComment(param)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            comments: [
              {
                ...json.newComment,
                user: userinfo
              },
              ...this.state.comments
            ],
            commentText: "",
            commentCount: this.state.commentCount + 1
          });
        } else {
          this.handleAddCommentError(json.errorType);
        }
      })
      .catch(e => {
        this.handleAddCommentError("RequestError", e);
      });
  };

  deleteComment = comment => {
    const { comments } = this.state;
    request
      .deleteOCPComment({ id: comment.id })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            comments: [...comments].filter(cm => cm.id !== comment.id),
            commentCount: this.state.commentCount - 1
          });
        }
      });
  };

  updateOCPUserPrint = () => {
    const { mission } = this.state;
    const guestInfo = this.getGuestInfo();
    if (!guestInfo) return;

    request.updateMyOcpPrint2(
      this.props.userinfo.email
        ? {
            email: this.props.userinfo.email,
            grade: mission.grade,
            type: mission.gameType
          }
        : {
            guestId: guestInfo.id,
            grade: mission.grade,
            type: mission.gameType
          }
    );
  };

  addReport = (commentId, reason) => {
    const { userinfo } = this.props;
    if (!commentId || !userinfo.email) return;
    const param = {
      email: userinfo.email,
      commentId,
      reason
    };

    request
      .addOCPReport(param)
      .then(res => res.json())
      .then(json => {
        if (!json.success && json.errorType)
          this.showErrorPopup(json.errorType);
      })
      .catch(e => console.error(e));
  };

  /** Event Handler */
  onClickStage = stageLevel => {
    if (!this.checkIsValidOpenBuilder()) {
      return;
    }
    const { mission } = this.state;
    if (stageLevel === 1 || stageLevel <= mission.level + 1) {
      this.showBuilder(stageLevel);
    } else {
      showPopUp(
        <PopUp.OneButton
          title={this.props.intl.formatMessage({
            id: "ID_LEARN_POPUP_STEP_CHECK_TITLE"
          })}
          buttonName={this.props.intl.formatMessage({
            id: "ID_LEARN_POPUP_STEP_CHECK_TITLE_BUTTON"
          })}
        />,
        { darkmode: true, mobileFullscreen: true }
      );
    }
  };

  onClickStartStage = () => {
    const { mission } = this.state;
    if (!this.checkIsValidOpenBuilder()) return;
    if (mission.level === 10) {
      this.showErrorPopup("allClear");
      return;
    }
    let stageLevel = 1;
    if (mission.level && mission.level !== 0) stageLevel = mission.level + 1;
    this.showBuilder(stageLevel);
  };

  onClickEventLink = () => {
    window.open("/event/codingparty/review");
  };

  handleCommentChange = e => {
    const { value } = e.target;
    this.setState({
      commentText: value
    });
  };

  onClickCommentTextArea = () => {
    this.alertCommentEventEnded();
  };

  alertCommentEventEnded() {
    showPopUp(
      <PopUp.OneButton title="후기 작성기간이 아닙니다." buttonName="확인" />,
      { darkmode: true }
    );
  }

  onClickComment = () => {
    this.alertCommentEventEnded();
    // if (!this.props.userinfo.email) {
    //   this.showLoginPopup();
    //   return;
    // }

    // if (!this.checkCommentValidation()) return;

    // const { mission } = this.state;
    // if (mission.level !== 10) {
    //   this.showErrorPopup("notAllClear");
    //   return;
    // }

    // // add comment
    // this.addComment();
  };

  onClickReport = comment => {
    showPopUp(
      <PopUp.OneInput
        title="신고사유를 입력해주세요"
        buttonName="확인"
        inputLimit={100}
        buttonAction={reason => {
          this.addReport(comment.id, reason);
        }}
      />,
      { dismissOverlay: true, darkmode: true, mobileFullscreen: true }
    );
  };

  onClickDelete = comment => {
    showPopUp(
      <PopUp.TwoButton
        title="정말 삭제하시겠습니까?"
        cancelButtonName="아니오"
        confirmButtonName="네"
        confirmAction={() => this.deleteComment(comment)}
      />,
      { dismissOverlay: true, mobileFullscreen: true, darkmode: true }
    );
  };

  onClickCertification = isActiveDownload => {
    this.alertCertificationEnd();
    // if (!this.state.mission) return;
    // if (!isActiveDownload) {
    //   this.showErrorPopup("certification");
    //   return;
    // }

    // showPopUp(
    //   <PopUp.TwoButton
    //     title="인증서를 출력하시겠습니까?"
    //     subtitle="나중에도 출력가능합니다."
    //     cancelButtonName="아니오"
    //     confirmButtonName="네"
    //     confirmAction={() => this.handleCertification()}
    //   />,
    //   { dismissOverlay: true, darkmode: true }
    // );
  };

  alertCertificationEnd = () => {
    showPopUp(
      <PopUp.OneButton
        title="인증서 발급 기간이 아닙니다."
        buttonName="확인"
      />,
      { darkmode: true }
    );
  };

  onClickReset = () => {
    showPopUp(
      <PopUp.TwoButton
        title={"초기화를 정말 진행하시겠습니까?"}
        subtitle={"모든 게임 데이터가 초기화 됩니다"}
        confirmButtonName={"확인"}
        cancelButtonName={"취소"}
        confirmAction={() => {
          resetOcpToken();
          window.location.reload();
        }}
      />,
      {
        mobileFullscreen: true,
        darkmode: true
      }
    );
  };

  onClickMore = () => {
    this.setState(
      {
        moreNum: this.state.moreNum + 1
      },
      () => {
        this.getComments(this.state.moreNum);
      }
    );
  };

  onClickSignIn = () => {
    showPopUp(<SignIn />, {
      mobileFullscreen: true,
      darkmode: true
    });
  };

  onClickFullScreen = () => {
    this.toggleIsShowFullScreenState();
  };

  /** Methods */

  toggleIsShowFullScreenState = () => {
    this.setState({
      isShowFullScreen: this.state.isShowFullScreen ? false : true
    });
  };

  showBuilder = level => {
    const { mission } = this.state;
    const url =
      mission.gameType === "block"
        ? `/ocp2/block/${mission.grade}/${level}`
        : `/ocp2/js/${mission.gameType}/${mission.grade}/${level}`;
    let builder = window.open(url, "_blank");
    builder.focus();
  };

  checkIsValidOpenBuilder = () => {
    if (!this.checkIsMobileAndTableBrowerAndWarn()) return false;
    if (!this.checkIsChromeAndShowWarn()) return false;
    return true;
  };

  checkIsMobileAndTableBrowerAndWarn = () => {
    if (this.isMobileAndTableBrowser()) {
      this.showErrorPopup("mobileBuilder");
      return false;
    }
    return true;
  };

  checkIsChromeAndShowWarn = () => {
    if (this.isIE()) {
      showPopUp(
        <PopUp.TwoButton
          title="이용안내"
          subtitle="본 페이지는 크롬에서만 정상 동작합니다"
          confirmButtonName="크롬 설치하기"
          cancelButtonName="취소"
          confirmAction={() => {
            window.open("https://www.google.com/intl/ko/chrome/", "_blank");
          }}
        />,
        { darkmode: true, mobileFullscreen: true }
      );
      return false;
    }

    return true;
  };

  isMobileAndTableBrowser = () => {
    let check = false;
    (function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        // eslint-disable-next-line no-useless-escape
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  isIE = () => {
    return detectIE();
  };

  checkCommentValidation = () => {
    const { commentText } = this.state;
    if (commentText === undefined || commentText === "") {
      // validation check
      this.setState(
        {
          isCommentValid: false
        },
        () => {
          if (this.commentValidationTimer)
            clearTimeout(this.commentValidationTimer);
          this.commentValidationTimer = setTimeout(() => {
            this.setState({
              isCommentValid: true
            });
          }, 2000);
        }
      );
      return false;
    }
    return true;
  };

  getGuestInfo = () => {
    return (
      localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"))
    );
  };

  showErrorPopup = type => {
    let message;
    switch (type) {
      case "certification":
        message = "모든 단계를 클리어한 후 인증서를 출력할 수 있습니다";
        break;

      case "mobileBuilder":
        message = "PC에서 다시 시도해 주세요";
        break;

      case "notAllClear":
        message = "모든 단계를 클리어한 후 시도해 주세요";
        break;

      case "reportAlready":
        message = "이미 신고한 유저입니다";
        break;

      case "Spam":
        // 욕설
        message = "욕설 및 비속어를 포함할 수 없습니다";
        break;

      case "allClear":
        message = "모든 단계를 클리어했습니다";
        break;
      default:
        break;
    }
    if (!message) return;
    showPopUp(<PopUp.OneButton title={message} buttonName={"확인"} />, {
      darkmode: true,
      mobileFullscreen: true
    });
  };

  manipulateCmTime = dateFormat => {
    const cmMoment = moment(dateFormat);
    const duration = moment.duration(moment().diff(cmMoment));
    let resultTimeFormat;
    if (duration.days() < 1) {
      // 하루 이내
      if (duration.hours() < 1) {
        // 분으로 계산
        resultTimeFormat = `${
          duration.minutes() === 0 ? "1" : duration.minutes()
        }분 전`;
      } else {
        // 시간으로 계산
        resultTimeFormat = `${duration.hours()}시간 전`;
      }
    } else {
      // 하루 이상 지난
      resultTimeFormat = `${duration.days()}일 전`;
    }
    return resultTimeFormat;
  };

  showLoginPopup = () => {
    showPopUp(
      <PopUp.TwoButton
        title={"로그인 후 이용해주세요"}
        confirmButtonNameId={"ID_SIGNUP"}
        cancelButtonNameId={"ID_SIGNIN"}
        cancelAction={() => {
          showPopUp(<SignIn />, {
            mobileFullscreen: true,
            darkmode: true
          });
        }}
        confirmAction={() => {
          showPopUp(<SignUp />, {
            mobileFullscreen: true,
            darkmode: true
          });
        }}
      />,
      {
        mobileFullscreen: true,
        darkmode: true
      }
    );
  };

  handleAddCommentError = (errorType, e) => {
    let message;
    switch (errorType) {
      case "InvalidUser":
        message = "부적절한 유저입니다";
        break;
      case "ExistComment":
        message = "이미 작성한 댓글이 있습니다.";
        break;
      case "Spam":
        // 욕설
        message = "욕설 및 비속어를 포함할 수 없습니다";
        break;
      case "CantCreated":
        message = "알 수 없는 이유로 작성할 수 없습니다";
        break;
      case "RequestError":
        message = "네트워크 상태를 확인한 후 다시 시도해주세요";
        console.error(e);
        break;
      default:
        break;
    }

    if (message) {
      showPopUp(<PopUp.OneButton title={message} buttonName={"확인"} />, {
        darkmode: true,
        mobileFullscreen: true
      });
    }
  };

  handleCertification = async () => {
    const guestInfo = this.getGuestInfo();
    let name, organization;
    if (this.props.userinfo.email) {
      if (this.props.userinfo.organization) {
        name = this.props.userinfo.name;
        organization = this.props.userinfo.organization;
      } else {
        showPopUp(
          <PopUp.OneInput
            title="학교를 입력해주세요"
            buttonName="확인"
            inputLimit={10}
            buttonAction={org => {
              this.showCertification(this.props.userinfo.name, org);
              this.updateOCPUser(org);
            }}
          />,
          { dismissOverlay: true, darkmode: true }
        );
      }
    } else {
      if (guestInfo) {
        const res = await request.getOcpUser2({
          guestId: guestInfo.id
        });
        const guest = await res.json();
        if (!guest.name || !guest.organization) {
          showPopUp(
            <PopUp.TwoInput
              title="학교를 입력해주세요"
              buttonName="확인"
              inputTitle1="이름"
              inputTitle2="학교"
              inputLimit1={8}
              inputLimit2={10}
              buttonAction={(org, name) => {
                this.showCertification(name, org);
                this.updateOCPUser(org, name);
              }}
            />,
            { dismissOverlay: true, darkmode: true }
          );
        } else {
          this.showCertification(guest.name, guest.organization);
          this.updateOCPUser(guest.organization, guest.name);
        }
      }
    }

    if (name && organization) {
      this.showCertification(
        name.substring(0, 8),
        organization.substring(0, 10)
      );
    }
  };

  updateOCPUser = (org, name = this.props.userinfo.name) => {
    const guestInfo = this.getGuestInfo();
    request
      .updateOcpUser2({
        guestId: guestInfo ? guestInfo.id : null,
        email: this.props.userinfo.email,
        name: name,
        organization: org
      })
      .then(res => res.json())
      .then(json => {
        if (json) this.props.updateUserInfo();
      });
  };

  showCertification = (name, organization) => {
    const { mission } = this.state;
    showPopUp(
      <OCPCertification
        organization={organization}
        grade={mission.grade}
        type={mission.gameType}
        name={name}
        callback={() => {
          this.updateOCPUserPrint();
        }}
      />,
      { darkmode: true }
    );
  };

  getCommaForamttedNumber = num => {
    if (!num) return;
    if (num === 0) return "0";
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  render() {
    const {
      stages,
      mission,
      isShowGameDetail,
      commentText,
      comments,
      isCommentValid,
      commentCount,
      isShowFullScreen
    } = this.state;
    const { handleGameDetailBack, userinfo } = this.props;

    return (
      <View
        stages={stages}
        mission={mission}
        userinfo={userinfo}
        commentText={commentText}
        handleCommentChange={this.handleCommentChange}
        onClickCommentTextArea={this.onClickCommentTextArea}
        isShowGameDetail={isShowGameDetail}
        handleGameDetailBack={handleGameDetailBack}
        onClickStage={this.onClickStage}
        onClickEventLink={this.onClickEventLink}
        comments={comments}
        onClickComment={this.onClickComment}
        onClickReport={this.onClickReport}
        onClickDelete={this.onClickDelete}
        onClickCertification={this.onClickCertification}
        onClickReset={this.onClickReset}
        isCommentValid={isCommentValid}
        commentCount={this.getCommaForamttedNumber(commentCount)}
        onClickMore={this.onClickMore}
        onClickStartStage={this.onClickStartStage}
        onClickSignIn={this.onClickSignIn}
        onClickFullScreen={this.onClickFullScreen}
        isShowFullScreen={isShowFullScreen}
      />
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {
    updateUserInfo: action.updateUserInfo
  }
)(injectIntl(Container));
