import React from "react";
import QueryString from "query-string";
import { withRouter } from "react-router-dom";
import { URL } from "../../Util/Constant.js";
import { connect } from "react-redux";
import * as request from "../../../Common/Util/HTTPRequest";
import * as action from "../../Store/Reducer/UserInfo";
import * as OcpToken from "../../Util/OcpToken";

class UserInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false, wizliveURL: URL.WIZLIVE };
    this.showAlert = false;
    this.shouldLogin =
      this.props.match.path === "/wizlive/:pId" ||
      this.props.match.path === "/wizlive_1v4/:pId" ||
      this.props.match.path === "/builder_edit/:pId" ||
      this.props.match.path === "/builder_readonly/:pId";
    this.liveToken = undefined;
    this.liveIframe = React.createRef();
    this.windowFocused = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.showAlert = this.showAlert && this.state.mounted;
    if (!this.props.userinfo.email && nextProps.userinfo.email) {
      OcpToken.updateOcpTokenToEmail(nextProps.userinfo.email);
    }
    return true;
  }

  componentDidMount = () => {
    window.addEventListener("focus", this.handleWindowFocus);
    window.addEventListener("blur", this.handleWindowBlur);
    window.addEventListener("message", this.onMessage, false);
    this.handleLoginTokenFromQuery();

    if (!this.shouldLogin) {
      if (Object.keys(this.props.userinfo).length === 0) {
        this.handleLoginByToken();
      } else {
        this.setState({ mounted: true });
      }
    }
  };

  // checkUnreadBingoEvents = () => {
  //   request
  //     .getUnreadBingoEvents({ email: this.props.userinfo.email })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.myBingos && json.myBingos.length > 0) {
  //         this.unreadBingos = json.myBingos;
  //         this.showUnreadPopups();
  //       }
  //     })
  //     .catch(e => console.error(e));
  // };

  componentWillUnmount() {
    window.removeEventListener("focus", this.handleWindowFocus);
    window.removeEventListener("blur", this.handleWindowBlur);
    window.removeEventListener("message", this.onMessage);
  }

  onMessage = e => {
    // console.log("UserInfoContainer onMessage", e);
    if (e.origin === URL.WIZLIVE || e.origin === URL.WIZLIVE_WWW) {
      if (e.data.type === "ready") {
        if (this.liveIframe.current) {
          this.liveIframe.current.contentWindow.postMessage(
            { type: "requestToken" },
            "*"
          );
        }
      } else if (e.data.type === "token") {
        if (e.data.data) {
          localStorage.setItem("wizToken", e.data.data);
          this.handleLoginByToken();
        } else {
          this.setState({ wizliveURL: URL.WIZLIVE_WWW });
        }
      } else {
        // console.log("UserInfoContainer unknown data", e.data);
      }
    }
  };

  handleLoginByToken = async e => {
    const token = localStorage.getItem("wizToken");
    // console.log("login by token", token);
    if (token) {
      const params = { token };
      try {
        const response = await request.loginByToken(params);
        const json = await response.json();

        if (json.user) {
          let user = json.user;
          user.payment = json.payment;
          localStorage.setItem("wizToken", json.token);
          this.props.updateUserInfo(user);
          this.setState({ mounted: true });
        } else {
          // console.log("user not found");
          // localStorage.removeItem("wizToken");
          this.props.updateUserInfo();
          this.setState({ mounted: true });
        }
      } catch (err) {
        // console.log("request failed");
        // localStorage.removeItem("wizToken");
        this.props.updateUserInfo();
        this.setState({ mounted: true });
      }
    } else {
      // console.log("token not found");
      // localStorage.removeItem("wizToken");
      this.props.updateUserInfo();
      this.setState({ mounted: true });
    }

    //for ocp
    if (
      this.props.match.path.split("/")[1] === "ocp2" &&
      this.props.match.params.step === "1"
    ) {
      OcpToken.addOcpUser(
        this.props.userinfo.email,
        this.props.match.params.grade,
        this.props.match.params.type
          ? this.props.match.params.type
          : this.props.match.path.split("/")[2]
      );
    }
    OcpToken.updateOcpToken();
  };

  handleWindowBlur = e => {
    this.windowFocused = false;
  };

  handleWindowFocus = e => {
    const isNeedUpdate = this.windowFocused === false;
    this.windowFocused = true;
    const token = localStorage.getItem("wizToken");
    if (token) {
      const json = this.parseJwt(token);
      const tokenEmail = json.email;
      if (tokenEmail !== this.props.userinfo.email) {
        window.location.reload();
      } else {
        if (isNeedUpdate) {
         // this.checkUnreadBingoEvents();
        }
      }
    }
    if (!token && Object.keys(this.props.userinfo).length > 0) {
      this.props.updateUserInfo();
    }
  };

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  }

  handleLoginTokenFromQuery() {
    const params = QueryString.parse(window.location.search);
    const { loginToken } = params;
    if (loginToken) {
      localStorage.setItem("wizToken", loginToken);
      const replaceUrl = window.location.href.split("?")[0];
      window.history.replaceState({}, undefined, replaceUrl);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.mounted === true ? this.props.children : null}
        {this.shouldLogin && (
          <iframe
            title="tokenIFrame"
            ref={this.liveIframe}
            src={this.state.wizliveURL + "/tokenIFrame"}
            style={{ display: "none" }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {
    updateUserInfo: action.updateUserInfo
  }
)(withRouter(UserInfoContainer));
