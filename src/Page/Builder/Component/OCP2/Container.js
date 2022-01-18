import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as OcpToken from "../../../../Common/Util/OcpToken";
import { URL, VCTYPE } from "../../../../Common/Util/Constant";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import Print from "../../../../Common/Component/OCPCertification";

import store from "../../Store";
import Videoclass from "../Videoclass";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    const { grade, type } = props.match.params;
    this.type = type ? type : this.props.match.path.split("/")[2];
    this.grade = grade;
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    this.state = { maxOcpLevel: undefined };
  }

  componentDidMount = async () => {
    try {
      /** check my stage  && set max level */
      await this.getMyOcp();
      if (this.state.maxOcpLevel < this.props.videoclass.level) {
        this.handleChangeLevel(this.state.maxOcpLevel);
      }
    } catch (e) {
      console.error(e);
    }
    window.addEventListener("resize", this.resizeEventContent);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resizeEventContent);
  };
  componentDidUpdate = async prevProps => {
    if (this.props.userinfo.email && !prevProps.userinfo.email) {
      await this.getMyOcp();
    } else if (!this.props.userinfo.email && prevProps.userinfo.email) {
      await this.getMyOcp();
    }
  };
  handleChangeLevel = level => {
    this.props.history.replace(`./${level}`);
    window.location.reload();
  };

  getMyOcp = async () => {
    if (this.props.userinfo.email || this.guest) {
      let res = await request.getMyOcp2({
        ...(this.props.userinfo.email
          ? { email: this.props.userinfo.email }
          : { guestId: this.guest && this.guest.id }),
        type: this.type
      });
      let json = await res.json();
      if (!json) {
        this.setState({
          maxOcpLevel: 1
        });
      } else {
        let currentData = json.find(element => element.grade === this.grade);
        this.setState({
          maxOcpLevel: Number(currentData ? currentData.level : 0) + 1
        });
      }
    } else {
      this.setState({
        maxOcpLevel: 1
      });
    }
  };
  /* end */
  onEnterEndStage = async () => {
    // max레벨을 업데이트 해야할때만 request 보냄
    if (this.state.maxOcpLevel < this.props.videoclass.level + 1) {
      if (this.props.userinfo.email) {
        await request.updateMyOcpLevel2({
          email: this.props.userinfo.email,
          level: this.props.videoclass.level,
          grade: this.grade,
          type: this.type
        });
      } else {
        if (!this.guest) {
          await OcpToken.addOcpUser(
            this.props.userinfo.email,
            this.grade,
            this.type
          );
          this.guest =
            localStorage.getItem("ocpId") &&
            JSON.parse(localStorage.getItem("ocpId"));
        }
        await request.updateMyOcpLevel2({
          guestId: this.guest && this.guest.id,
          level: this.props.videoclass.level,
          grade: this.grade,
          type: this.type
        });
      }
    }

    // if (this.checkLastLevelInGrade()) {
    //   this.showPrintPopup();
    //   this.showEventContent();
    // } else {
    //   if (this.props.videoclass.level === 1 && !this.props.email) {
    //     this.showSignUpEventMessage();
    //   } else {
    //     if (this.checkEventReceiver()) {
    //       this.showRandomEventMessage();
    //     }
    //   }
    // }
  };
  checkLastLevelInGrade = () => {
    return this.props.videoclass.level === 10;
  };
  endStageButtonAction = () => {
    if (this.props.videoclass.level < 10) {
      this.handleChangeLevel(this.props.videoclass.level + 1);
    } else {
      this.props.history.push("../../../../codingparty");
    }
  };

  /* print */
  showPrintPopup = () => {
    showPopUp(
      <Popup.TwoButton
        title="인증서를 출력하시겠습니까?"
        subtitle={`위즈랩 회원은 언제든지\n출력할 수 있습니다.\n(비회원 3시간 이내만 가능)`}
        cancelButtonName="아니오"
        confirmButtonName="네"
        confirmAction={() => this.handleCertification()}
        cancelAction={this.printCallback}
      />,
      { store, dismissOverlay: true }
    );
  };

  handleCertification = async () => {
    let name, organization;
    if (this.props.userinfo.email) {
      if (this.props.userinfo.organization) {
        name = this.props.userinfo.name;
        organization = this.props.userinfo.organization;
      } else {
        showPopUp(
          <Popup.OneInput
            title="학교를 입력해주세요"
            buttonName="확인"
            inputLimit={10}
            buttonAction={org => callback(org)}
          />,
          { store, dismissOverlay: true }
        );
      }
    } else {
      const res = await request.getOcpUser2({
        guestId: this.guest && this.guest.id
      });
      const guest = await res.json();
      if (guest) {
        if (!(guest.name && guest.organization)) {
          showPopUp(
            <Popup.TwoInput
              title="학교를 입력해주세요"
              buttonName="확인"
              inputTitle1="이름"
              inputTitle2="학교"
              inputLimit1={8}
              inputLimit2={10}
              buttonAction={(org, name) => callback(org, name)}
            />,
            { store, dismissOverlay: true }
          );
        } else {
          name = guest.name;
          organization = guest.organization;
        }
      }
    }

    if (name && organization) {
      showPopUp(
        <Print
          organization={organization.substring(0, 10)}
          grade={this.grade}
          type={this.type}
          name={name.substring(0, 8)}
          callback={this.printCallback}
        />,
        { store }
      );
    }
    const callback = (org, name = this.props.userinfo.name) => {
      showPopUp(
        <Print
          organization={org}
          grade={this.grade}
          type={this.type}
          name={name}
          callback={this.printCallback}
        />,
        { store }
      );

      request.updateOcpUser2({
        guestId: this.guest && this.guest.id,
        email: this.props.userinfo.email,
        name: name,
        organization: org
      });
      this.props.updateUserInfo();
    };
  };

  printCallback = () => {
    request.updateMyOcpPrint2(
      this.props.userinfo.email
        ? {
            email: this.props.userinfo.email,
            grade: this.grade,
            type: this.type
          }
        : {
            guestId: this.guest && this.guest.id,
            grade: this.grade,
            type: this.type
          }
    );
  };

  setVideoclassRef = ref => {
    this.videoclass = ref;
    const { setVideoclassRef } = this.props;
    if (setVideoclassRef) {
      setVideoclassRef(ref);
    }
  };
  showEventContent = () => {
    const EventContent = this.createEventContent;
    const events = this.getOcpS2Events();
    this.showVideoclassEventContent(<EventContent events={events} />);
  };
  showVideoclassEventContent = content => {
    if (!this.videoclass) return;
    this.videoclass.showCustomContent(content, this.resizeEventContent);
  };
  createEventContent = props => {
    const { events } = props;
    return (
      <div className="videoclass_customContent">
        <div className="videoclass_ocp2Events_container">
          <div className="videoclass_ocp2Events">
            {events.map((event, index) => (
              <div
                key={index}
                className="videoclass_ocp2Event"
                onClick={() => {
                  window.open(event.linkURL, "_blank");
                }}
              >
                <img src={event.imgSrc} alt={`event${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  getOcpS2Events = () => {
    return [
      {
        imgSrc: require("../../../../Image/videoclass_event_ocpS2-0.png"),
        linkURL: `${URL.ORIGIN}event/codingparty/challenge`
      },
      {
        imgSrc: require("../../../../Image/videoclass_event_ocpS2-1.png"),
        linkURL: `${URL.ORIGIN}event/codingparty/signup`
      },
      {
        imgSrc: require("../../../../Image/videoclass_event_ocpS2-2.png"),
        linkURL: `${URL.ORIGIN}event/codingparty/review`
      },
      {
        imgSrc: require("../../../../Image/videoclass_event_ocpS2-3.png"),
        linkURL: `${URL.ORIGIN}event/codingparty/onlinecamp`
      }
    ];
  };
  resizeEventContent = () => {
    const customContent = document.getElementsByClassName(
      "videoclass_customContent"
    )[0];
    const contentContainer = document.getElementsByClassName(
      "videoclass_ocp2Events_container"
    )[0];
    const videoclassContent = document.getElementsByClassName("vc_content")[0];
    if (customContent && contentContainer && videoclassContent) {
      const contentRect = videoclassContent.getBoundingClientRect();
      if (contentRect.width / contentRect.height > 16 / 9) {
        const desiredWidth = (contentRect.height * 16) / 9;
        customContent.style.width = `${desiredWidth}px`;
        customContent.style.height = `${contentRect.height}px`;
        customContent.style.paddingTop = "unset";
      } else {
        customContent.style.width = "100%";
        customContent.style.height = "auto";
        customContent.style.paddingTop = "calc(9 / 16 * 100%)";
      }
    }
  };

  checkEventReceiver() {
    const { email } = this.props;
    if (!email) {
      return true;
    }

    const excludeEmails = [];
    if (excludeEmails.includes(email)) {
      return false;
    }

    if (email.endsWith("@wizschool.io")) {
      return false;
    }

    return true;
  }
  showSignUpEventMessage = () => {
    const messages = this.getEgoMessages();
    const signUpEventMessage = messages[messages.length - 1];
    this.showVideoclassEgoMessages([signUpEventMessage]);
  };
  showRandomEventMessage = () => {
    const egoMessage = this.getRandomEgoMessage();
    this.showVideoclassEgoMessages([egoMessage]);
  };
  showVideoclassEgoMessages = egoMessages => {
    if (!this.videoclass) return;
    this.videoclass.egoSay(egoMessages, 30000);
  };
  getRandomEgoMessage = () => {
    const egoMessages = this.getEgoMessages();
    const randomIndex = Math.round(Math.random() * (egoMessages.length - 1));
    return egoMessages[randomIndex];
  };
  getEgoMessages = () => {
    const messages = [
      {
        type: VCTYPE.EGO.COMPONENT,
        data: this.createEgoEventComponent({
          decsription:
            "미션이 끝나고 나면,\n미션 후기 작성 이벤트에도 꼭 참여해줘!",
          imgSrc: require("../../../../Image/ego_event_ocpS2-0.png"),
          linkURL: `${URL.ORIGIN}codingParty?type=${this.type}&grade=${
            this.grade
          }`,
          name: "commentEvent"
        })
      },
      // {
      //   type: VCTYPE.EGO.COMPONENT,
      //   data: this.createEgoEventComponent({
      //     decsription:
      //       "또 다른 게임을 만들고 싶니?\n위즈랩 온라인 캠프에 참여해봐!",
      //     imgSrc: require("../../../../Image/ego_event_ocpS2-1.png"),
      //     linkURL: `${URL.ORIGIN}event/codingparty/onlinecamp`,
      //     name: "wizlabCampEvent"
      //   })
      // },
      {
        type: VCTYPE.EGO.COMPONENT,
        data: this.createEgoEventComponent({
          decsription: "개발자 튜터와 1:1로\n게임 개발 배우지 않을래?",
          imgSrc: require("../../../../Image/ego_event_ocpS2-2.png"),
          linkURL: `${URL.WIZLIVE}/wizlabPromotion/3/`,
          name: "wizliveEvent"
        })
      },
      {
        type: VCTYPE.EGO.COMPONENT,
        data: this.createEgoEventComponent({
          decsription: `너만의 멋진 작품을 만들어봐!\n"크리에이터 챌린지"에서 상품이 기다려!`,
          imgSrc: require("../../../../Image/ego_event_ocpS2-4.png"),
          linkURL: `${URL.ORIGIN}event/codingparty/challenge`,
          name: "createChallengeEvent"
        })
      }
    ];
    if (!this.props.email) {
      messages.push({
        type: VCTYPE.EGO.COMPONENT,
        data: this.createEgoEventComponent({
          decsription: "위즈랩 신규회원 가입하면\n선물을 준대!",
          imgSrc: require("../../../../Image/ego_event_ocpS2-3.png"),
          linkURL: `${URL.ORIGIN}event/codingparty/signup`,
          name: "signupEvent"
        })
      });
    }
    return messages;
  };
  createEgoEventComponent = ({ decsription, imgSrc, linkURL, name }) => {
    return (
      <div
        className="ego_event"
        onClick={e => {
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropagation) e.stopPropagation();
          window.open(linkURL, "_blank");
        }}
      >
        <div className="ego_event_desc">{decsription}</div>
        <img src={imgSrc} alt="event" />
        <div className={`ego_event_detail ${name}`}>자세히 보기</div>
      </div>
    );
  };

  render() {
    const {
      zIndex,
      showModal,
      handleSelectTab,
      handleChangeZIndex
    } = this.props;
    const { maxOcpLevel } = this.state;
    const endStageButtonId =
      this.props.videoclass.level < 10
        ? "ID_VIDEOCLASS_ENDSTEP_DEFAULT"
        : "ID_VIDEOCLASS_TO_HOME";
    return (
      <Videoclass
        setRef={this.setVideoclassRef}
        zIndex={zIndex}
        showModal={showModal}
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={() => {
          handleChangeZIndex("ocp");
        }}
        videoclass={this.props.videoclass}
        maxOcpLevel={maxOcpLevel}
        onEndStage={this.onEnterEndStage}
        endStageButtonAction={this.endStageButtonAction}
        endStageButtonId={endStageButtonId}
        fixed={true}
      />
    );
  }
}

export default connect(
  state => ({
    userinfo: state.userinfo,
    email: state.userinfo.email,
    videoclass: state.project.videoclass
  }),
  { updateUserInfo: userInfoActions.updateUserInfo }
)(withRouter(Container));
