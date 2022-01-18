import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as userInfoActions from "../../../../Common/Store/Reducer/UserInfo";
import Videoclass from "../Videoclass";
import * as request from "../../../../Common/Util/HTTPRequest";
import * as OcpToken from "../../../../Common/Util/OcpToken";
import Popup, { showPopUp } from "../../../../Common/Component/PopUp";
import store from "../../Store";
import Print from "../../../../Common/Component/OCPCertification";
/* not used component */
class Container extends Component {
  constructor(props) {
    super(props);
    const { grade } = props.match.params;
    this.type = this.props.match.path.split("/")[2];
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
      window.addEventListener("storage", this.detectStorage);
    } catch (e) {
      console.error(e);
    }
  };

  componentWillUnmount() {
    window.removeEventListener("storage", this.detectStorage);
  }
  componentDidUpdate = async prevProps => {
    if (this.props.userinfo.email && !prevProps.userinfo.email) {
      await this.getMyOcp();
    } else if (!this.props.userinfo.email && prevProps.userinfo.email) {
      await this.getMyOcp();
    }
  };
  detectStorage = e => {
    if (e.key === "ocpId") {
      window.location.reload();
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
          await OcpToken.addOcpUser(this.props.userinfo.email, this.grade);
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

    if (this.props.videoclass.level === 10) {
      this.showPrintPopup();
    }
  };
  endStageButtonAction = () => {
    if (this.props.videoclass.level < 10) {
      this.handleChangeLevel(this.props.videoclass.level + 1);
    } else {
      this.props.history.push("../../../tutorial");
    }
  };

  /* print */
  showPrintPopup = () => {
    showPopUp(
      <Popup.TwoButton
        title="인증서를 출력하시겠습니까?"
        subtitle="나중에도 출력가능합니다."
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
        ? { email: this.props.userinfo.email, grade: this.grade }
        : { guestId: this.guest && this.guest.id, grade: this.grade }
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
