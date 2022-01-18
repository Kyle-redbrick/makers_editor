import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import View from "./View";
import * as request from "../../../Common/Util/HTTPRequest";
import Popup, { showPopUp } from "../../../Common/Component/PopUp";
import Print from "../../../Common/Component/OCPCertification";
import * as action from "../../../Common/Store/Reducer/UserInfo";
import lv1Thumb from "../../../Image/thumb_lv1.png";
import lv2Thumb from "../../../Image/thumb_lv2.png";
import lv3Thumb from "../../../Image/thumb_lv3.png";
import lv1desc from "../../../Image/dsc_lv1.png";
import lv2desc from "../../../Image/dsc_lv2.png";
import lv3desc from "../../../Image/dsc_lv3.png";
import SignUp from "../../../Common/Component/SignUp";
import { resetOcpToken } from "../../../Common/Util/OcpToken";
import { detectIE } from "../../../Common/Util/detectBrowser";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OCP: [],
      myLevel: undefined
    };
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    this.grade = this.props.match.params.grade;
    this.type = this.props.match.params.gametype;
    this.info = {
      block: {
        beginner: {
          level: "초급 퀘스트",
          desc: lv1desc,
          thumb: lv1Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/5ae60ab3-f5ae-4084-93ee-a59be680f184.html"
        },
        intermediate: {
          level: "중급 퀘스트",
          desc: lv2desc,
          thumb: lv2Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/22511b0f-f64f-4391-b241-951cf9e69a6e.html"
        },
        advanced: {
          level: "고급 퀘스트",
          desc: lv3desc,
          thumb: lv3Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/d858e0f6-85fc-4d53-b4e4-19b35090bbe7.html"
        }
      },
      game: {
        beginner: {
          level: "초급 퀘스트",
          desc: lv1desc,
          thumb: lv1Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/5ae60ab3-f5ae-4084-93ee-a59be680f184.html"
        },
        intermediate: {
          level: "중급 퀘스트",
          desc: lv2desc,
          thumb: lv2Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/22511b0f-f64f-4391-b241-951cf9e69a6e.html"
        },
        advanced: {
          level: "고급 퀘스트",
          desc: lv3desc,
          thumb: lv3Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/d858e0f6-85fc-4d53-b4e4-19b35090bbe7.html"
        }
      },
      escape: {
        beginner: {
          level: "초급 퀘스트",
          desc: lv1desc,
          thumb: lv1Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/5ae60ab3-f5ae-4084-93ee-a59be680f184.html"
        },
        intermediate: {
          level: "중급 퀘스트",
          desc: lv2desc,
          thumb: lv2Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/364d12bd-2af9-42e1-8eec-2005fbb063fa.html"
        },
        advanced: {
          level: "고급 퀘스트",
          desc: lv3desc,
          thumb: lv3Thumb,
          game:
            "https://wizschool-published.s3.ap-northeast-2.amazonaws.com/d858e0f6-85fc-4d53-b4e4-19b35090bbe7.html"
        }
      }
    };
    this.isIE = detectIE();
  }
  componentDidMount = async () => {
    /** get ocp list info */
    await this.getOCPList();
    /** check my step  */
    await this.getMyOcp();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.userinfo.email && !prevProps.userinfo.email) {
      await this.getMyOcp();
    } else if (!this.props.userinfo.email && prevProps.userinfo.email) {
      //로그아웃했을때
      await this.getMyOcp();
    }
  };

  getOCPList = () => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      let title = require(`../../Builder/Component/OCP2/template/${this.type}/${this.grade}/${i}`)
        .data.title;
      let img = require(`../../Builder/Component/OCP2/template/${this.type}/${this.grade}/${i}`)
        .data.image;
      arr.push({ title, level: i, img });
    }
    this.setState({ OCP: arr });
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
      if (json) {
        let currentData = json.find(element => element.grade === this.grade);
        this.setState({ myLevel: currentData ? currentData.level : 0 });
      } else {
        this.setState({ myLevel: 0 });
      }
    } else {
      this.setState({ myLevel: 0 });
    }
  };

  onClickItem = level => {
    if (this.isIE) {
      showPopUp(
        <Popup.TwoButton
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
      return;
    }
    const { myLevel } = this.state;
    // if (window.screen.width <= 1080) {
    //   showPopUp(
    //     <Popup.OneButton
    //       title={this.props.intl.formatMessage({
    //         id: "ID_LEARN_POPUP_MOBILE_TITLE"
    //       })}
    //       buttonName={this.props.intl.formatMessage({
    //         id: "ID_LEARN_POPUP_MOBILE_BUTTON"
    //       })}
    //     />,
    //     { darkmode: true, mobileFullscreen: true }
    //   );
    //   return;
    // }
    // let builder;
    if (this.type === "block") {
      window.open(`/ocp2/block/${this.grade}/${level}`, "_blank");
    } else {
      window.open(`/ocp2/js/${this.type}/${this.grade}/${level}`, "_blank");
    }
    // builder.focus();
    if (level <= myLevel + 1) {
      window.open(`/ocp/${this.grade}/${level}`, "_blank");
      // builder.focus();
    } else {
      showPopUp(
        <Popup.OneButton
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

  handleReset = () => {
    showPopUp(
      <Popup.TwoButton
        title="미션 새로 시작하기"
        subtitle={`완수된 미션이 모두 초기화되며,
초기화 후에는 복구가 불가능합니다.
처음부터 다시 시작하시겠습니까?`}
        cancelButtonName="아니요"
        confirmButtonName="새로 시작"
        confirmAction={() => {
          resetOcpToken();
          window.location.reload();
        }}
      />,
      { darkmode: true, dismissButton: false }
    );
  };
  handleCertification = async () => {
    if (this.state.myLevel < 10) {
      showPopUp(
        <Popup.OneButton
          title="알림"
          subtitle="10단계까지 완료해주세요."
          buttonName="확인"
        />,
        { darkmode: true }
      );
      return;
    }
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
          { dismissOverlay: true, darkmode: false }
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
              inputLimit1={4}
              inputLimit2={10}
              buttonAction={(org, name) => callback(org, name)}
            />,
            { dismissOverlay: true, darkmode: false }
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
          // name={name.substring(0, 4)}
          name={name}
          callback={this.printCallback}
        />
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
        />
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

  checkFocus = () => {
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    window.addEventListener("focus", () => {
      this.getMyOcp();
    });
  };

  handleSignup = () => {
    showPopUp(<SignUp />, {
      mobileFullscreen: true,
      darkmode: true
    });
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
  render() {
    const { OCP, myLevel } = this.state;
    const {
      onClickItem,
      grade,
      checkFocus,
      handleCertification,
      handleReset,
      info,
      type
    } = this;
    checkFocus();
    return (
      <View
        OCP={OCP}
        onClickItem={onClickItem}
        intl={this.props.intl}
        info={info[type][grade]}
        myLevel={myLevel}
        handleCertification={handleCertification}
        handleReset={handleReset}
        userId={this.props.userinfo.id}
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
