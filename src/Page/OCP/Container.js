import React, { Component } from "react";
import View from "./View";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import * as request from "../../Common/Util/HTTPRequest";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";
import SignIn from "../../Common/Component/SignIn";
import SignUp from "../../Common/Component/SignUp";
import eventImg from "../../Image/event5_popup.png";

class Container extends Component {
  constructor(props) {
    super(props);
    this.guest =
      localStorage.getItem("ocpId") &&
      JSON.parse(localStorage.getItem("ocpId"));
    this.state = {
      beginner: undefined,
      intermediate: undefined,
      advanced: undefined,
      count: {},
      rank: [],
      rankLimit: 10,
      projects: [],
      projectsLimit: 8
    };
    this.referrer = "sef";
    const urlParams = new URLSearchParams(this.props.location.search);
    const referrer = urlParams.get("referrer");
    if (referrer !== "sef") {
      this.referrer = "ocp";
    }
  }

  componentDidMount = async () => {
    /** get total user count  */
    request
      .getOcpSuccessUser()
      .then(res => res.json())
      .then(json => this.setState({ count: json }));

    let res = await request.getRoomEscape({ limit: 14, order: "likeCount" });
    let rank = await res.json();
    res = await request.getRoomEscape({ limit: 14, order: "editedAt" });
    let projects = await res.json();

    this.setState({
      rank,
      projects
    });
    /** check my stage   */
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

  getMyOcp = async () => {
    if (this.props.userinfo.email || this.guest) {
      let res = await request.getMyOcp(
        this.props.userinfo.email
          ? { email: this.props.userinfo.email }
          : { guestId: this.guest && this.guest.id }
      );
      let json = await res.json();
      if (json) {
        let data = {};
        json.forEach(element => {
          data[element.grade] = element.level;
        });
        this.setState({
          beginner: Number(data.beginner),
          intermediate: Number(data.intermediate),
          advanced: Number(data.advanced)
        });
      }
    }
  };

  handleMore = type => {
    if (type === "rank") {
      this.setState(prev => ({
        rankLimit: prev.rankLimit + 10
      }));
    } else {
      this.setState(prev => ({
        projectsLimit: prev.projectsLimit + 8
      }));
    }
  };
  handleParticipation = () => {
    if (!this.props.userinfo.email) {
      showPopUp(
        <PopUp.TwoButton
          title={"로그인 후 이용해주세요"}
          confirmButtonNameId={"ID_SIGNUP"}
          cancelButtonNameId={"ID_SIGNIN"}
          content={
            <div>
              <img
                style={{ width: "100%", marginTop: "25px" }}
                src={eventImg}
                alt="evt"
              />
            </div>
          }
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
      return;
    }
    window.open(`/builder`, "_blank");
  };
  render() {
    const { intl } = this.props;
    const {
      beginner,
      intermediate,
      advanced,
      count,
      rank,
      rankLimit,
      projects,
      projectsLimit
    } = this.state;
    const { handleMore, handleParticipation } = this;
    return (
      <View
        intl={intl}
        beginner={beginner}
        intermediate={intermediate}
        advanced={advanced}
        count={count}
        rank={rank}
        rankLimit={rankLimit}
        handleMore={handleMore}
        projects={projects}
        projectsLimit={projectsLimit}
        handleParticipation={handleParticipation}
        type={this.referrer}
        userId={this.props.userinfo.id}
      />
    );
  }
}
export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Container));
