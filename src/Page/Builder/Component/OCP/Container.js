import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Videoclass from "../Videoclass";
import * as request from "../../../../Common/Util/HTTPRequest";
import { showPopUp } from "../../../../Common/Component/PopUp";
import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import store from "../../Store";
// import Print from "../../../../Common/Component/OCPCertification";
// import { getColorTheme } from "../../utils/colorThemeUtil";
import SignUp from "../../../../Common/Component/SignUp";
// import eventImg from "../../../../Image/event5_popup.png";
import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import * as OcpToken from "../../../../Common/Util/OcpToken";

class Container extends Component {
  constructor(props) {
    super(props);
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    this.step = this.props.match.params.step;
    this.grade = this.props.match.params.grade;
    this.state = { maxOcpLevel: undefined };
  }

  componentDidMount = async () => {
    try {
      /** check my stage  && set max level */
      await this.getMyOcp();

      if (this.state.maxOcpLevel < this.props.videoclass.level) {
        this.onClickChangeLevel(this.state.maxOcpLevel);
      }
    } catch (e) {
      console.error(e);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.userinfo.email && !prevProps.userinfo.email) {
      await this.getMyOcp();
    } else if (!this.props.userinfo.email && prevProps.userinfo.email) {
      await this.getMyOcp();
    }
  };

  getMyOcp = async () => {
    if (this.props.userinfo.email || this.guest) {
      let res = await request.getMyOcp(
        this.props.userinfo.email
          ? { email: this.props.userinfo.email }
          : { guestId: this.guest.id }
      );
      let json = await res.json();
      if (!json) {
        this.setState({
          maxOcpLevel: 1
        });
      } else {
        let data = {};
        json.forEach(element => {
          data[element.grade] = element.level;
        });

        this.setState({
          maxOcpLevel: Number(data[this.grade]) + 1
        });

        if (!data[this.grade]) {
          this.setState({
            maxOcpLevel: 1
          });
        }
      }
    } else {
      this.setState({
        maxOcpLevel: 1
      });
    }
  };

  onClickChangeLevel = level => {
    this.props.history.replace({ pathname: `/ocp/${this.grade}/${level}` });
    window.location.reload();
  };

  onEndStage = async () => {
    if (this.state.maxOcpLevel < this.props.videoclass.level + 1) {
      let res;
      if (this.props.userinfo.email) {
        res = await request.updateMyOcpLevel({
          email: this.props.userinfo.email,
          level: this.props.videoclass.level,
          grade: this.grade
        });
      } else {
        if (!this.guest) {
          await OcpToken.addOcpUser(this.props.userinfo.email, this.grade);
          this.guest =
            localStorage.getItem("ocpId") &&
            JSON.parse(localStorage.getItem("ocpId"));
        }
        res = await request.updateMyOcpLevel({
          guestId: this.guest && this.guest.id,
          level: this.props.videoclass.level,
          grade: this.grade
        });
      }
      const json = await res.json();
      this.bingoType = json.bingoType;
    }

    // if (this.props.videoclass.level === 10) {
    //   this.showPrintPopup();
    // }
    const path = window.location.pathname;
    TrackingUtil.sendGTMEvent("OCP Clear", path);
  };

  // showPrintPopup = () => {
  //   showPopUp(
  //     <Popup.TwoButton
  //       title="인증서를 출력하시겠습니까?"
  //       subtitle="나중에도 출력가능합니다."
  //       cancelButtonName="아니오"
  //       confirmButtonName="네"
  //       confirmAction={() => this.handleCertification()}
  //       cancelAction={this.printCallback}
  //     />,
  //     { store, dismissOverlay: true }
  //   );
  // };
  endStageButtonAction = () => {
    this.onClickChangeLevel(this.props.videoclass.level + 1);
  };

  // handleCertification = async () => {
  //   let name, organization;
  //   if (this.props.userinfo.email) {
  //     if (this.props.userinfo.organization) {
  //       name = this.props.userinfo.name;
  //       organization = this.props.userinfo.organization;
  //     } else {
  //       showPopUp(
  //         <Popup.OneInput
  //           title="학교를 입력해주세요"
  //           buttonName="확인"
  //           inputLimit={10}
  //           buttonAction={org => callback(org)}
  //         />,
  //         { store, dismissOverlay: true }
  //       );
  //     }
  //   } else {
  //     const res = await request.getOcpUser({
  //       guestId: this.guest && this.guest.id
  //     });
  //     const guest = await res.json();
  //     if (guest) {
  //       if (!(guest.name && guest.organization)) {
  //         showPopUp(
  //           <Popup.TwoInput
  //             title="학교를 입력해주세요"
  //             buttonName="확인"
  //             inputTitle1="이름"
  //             inputTitle2="학교"
  //             inputLimit1={4}
  //             inputLimit2={10}
  //             buttonAction={(org, name) => callback(org, name)}
  //           />,
  //           { store, dismissOverlay: true }
  //         );
  //       } else {
  //         name = guest.name;
  //         organization = guest.organization;
  //       }
  //     }
  //   }

  //   if (name && organization) {
  //     showPopUp(
  //       <Print
  //         organization={organization.substring(0, 10)}
  //         grade={this.grade}
  //         name={name.substring(0, 4)}
  //         callback={this.printCallback}
  //       />,
  //       { store }
  //     );
  //   }
  //   const callback = (org, name = this.props.userinfo.name) => {
  //     showPopUp(
  //       <Print
  //         organization={org}
  //         grade={this.grade}
  //         name={name}
  //         callback={this.printCallback}
  //       />,
  //       { store }
  //     );

  //     request.updateOcpUser({
  //       guestId: this.guest && this.guest.id,
  //       email: this.props.userinfo.email,
  //       name: name,
  //       organization: org
  //     });
  //     this.props.updateUserInfo();
  //   };
  // };

  handleSignup = () => {
    showPopUp(<SignUp store={store} />, {
      store,
      mobileFullscreen: true,
      darkmode: true
    });
  };

  render() {
    const { handleSelectTab, handleChangeZIndex, zIndex } = this.props;
    return (
      <Videoclass
        setRef={this.props.setVideoclassRef}
        maxOcpLevel={this.state.maxOcpLevel}
        videoclass={this.props.videoclass}
        showModal={this.props.showModal}
        handleSelectTab={handleSelectTab}
        handleChangeZIndex={() => {
          handleChangeZIndex("ocp");
        }}
        zIndex={zIndex}
        onEndStage={this.onEndStage}
        endStageButtonAction={
          this.props.videoclass.level < 10
            ? this.endStageButtonAction
            : undefined
        }
      />
    );
  }
}

export default connect(
  state => ({
    userinfo: state.userinfo,
    videoclass: state.project.videoclass
  }),
  { updateUserInfo: userInfoActions.updateUserInfo }
)(withRouter(Container));
