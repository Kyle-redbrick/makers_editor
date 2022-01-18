import React, { Component } from "react";
import { connect } from "react-redux";
import * as request from "../../../../Common/Util/HTTPRequest";
import View from "./View";
import { OCPGame } from "../../../../Common/Util/Constant";
import PopUp, { showPopUp } from "../../../../Common/Component/PopUp";
import SignIn from "../../../../Common/Component/SignIn";

class Container extends Component {
  constructor(props) {
    super(props);

    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));

    this.state = {
      gameInfo: OCPGame
    };
  }

  componentDidMount() {
    this.getMyOcp();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.userinfo.email !== prevProps.userinfo.email) this.getMyOcp();
  };

  getMyOcp = async gameInfoCallback => {
    const email = this.props.userinfo.email;
    if (email || this.getGuestInfo()) {
      let res = await request.getMyOcp2(
        email ? { email } : { guestId: this.getGuestInfo().id }
      );
      let myOcpInfo = await res.json();
      if (myOcpInfo) {
        this.setGameInfo(myOcpInfo, gameInfoCallback);
      }
    } else {
      this.setState({
        gameInfo: OCPGame
      });
    }
  };

  getOCPCommentsByEmail = () => {
    const { email } = this.props.userinfo;
    if (!email) return;
    request
      .getOCPCommentsByEmail({ email })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setCommentInfoEachMission(json.comments);
        }
      })
      .catch(e => console.error(e));
  };

  /** Setting Methods */
  setGameInfo = (myOcpInfo, callback) => {
    // OCPGame 데이터를 보존하기 위해
    const gameInfo = JSON.parse(JSON.stringify(OCPGame));
    myOcpInfo.forEach(myOcp => {
      const game = gameInfo[myOcp.type];
      const mission = game.itemInfo[myOcp.grade];
      mission["level"] = myOcp.level;
    });
    this.setState(
      {
        gameInfo
      },
      () => {
        this.getOCPCommentsByEmail();
        if (callback) callback();
      }
    );
  };

  setCommentInfoEachMission = comments => {
    const gameInfo = JSON.parse(JSON.stringify(this.state.gameInfo));
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      gameInfo[comment.type].itemInfo[comment.grade]["isComment"] = true;
    }
    this.setState({
      gameInfo
    });
  };

  getGuestInfo = () => {
    return (
      localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"))
    );
  };

  onClickTry = (gameKey, gradeKey) => {
    if (!this.props.userinfo.email) {
      showPopUp(
        <PopUp.TwoButton
          confirmAction={() => {
            showPopUp(<SignIn />, {
              darkmode: true,
              dismissOverlay: true,
              mobileFullScreen: true,
              scrollable: true
            });
          }}
          title="로그인 후 참여할 수 있습니다"
          confirmButtonName="로그인"
          cancelButtonName="취소"
        />,
        {
          darkmode: true,
          dismissOverlay: true,
          mobileFullScreen: true,
          scrollable: true
        }
      );
      return;
    }
    window.open(`/codingparty?type=${gameKey}&grade=${gradeKey}`);
  };

  render() {
    const { gameInfo } = this.state;
    return <View onClickTry={this.onClickTry} gameInfo={gameInfo} />;
  }
}
export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {}
)(Container);
