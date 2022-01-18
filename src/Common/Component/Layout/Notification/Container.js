import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as request from "../../../../Common/Util/HTTPRequest";
// import * as TrackingUtil from "../../../../Common/Util/TrackingUtil";
import * as userInfoAction from "../../../../Common/Store/Reducer/UserInfo";
import View from "./View";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isListEnded: false
    };
  }

  componentDidMount() {
    // TrackingUtil.sendPageEvent("notification", this.props.email);
    this.getData();
    request.updateUserInfo({ email: this.props.email, badge: 0});
  }

  getData = () => {
    const { email } = this.props;
    const limit = 20;
    const offset = this.state.notifications.length;
    const params = { email, limit, offset };
    request
      .getNotifications(params)
      .then(response => response.json())
      .then(json => {
        const isListEnded = json.length === 0 || json.length % limit !== 0;
        this.setState(state => ({
          notifications: [...state.notifications, ...json],
          isListEnded: isListEnded
        }));
      });
  };

  handleOnClickMore = () => {
    this.getData();
  };

  handleOnClickItem = noti => {
    let link = undefined;
    let isBlank = false;
    const { type, targetProjectPID, targetCommunityID, targetLectureID, targetUser, link:page } = noti;
    
    switch (type) {
      //go to wizapp
      case "publishedComment":
      case "publishedReply":
      case "like": 
      case "playCount":
      case "newApp":
        link = `?pId=${targetProjectPID}`;
        break;
      //go to community
      case "articleComment":
      case "articleReply":
        link = `/community/detail/${targetCommunityID}`;
        break;
      case "subscribe":
        link = `/userpage/${targetUser.id}`;
        break;
      case "notice":
      case "custom":
        if (noti.link) {
          link = noti.link;
          isBlank = true;
        }
        break;
        //dreamclass 대댓글 
      case "commentReply":
        link = `/course/${targetLectureID}`
        break;
      case "socialReply":
        link = `/social/${page}`
        break;
      default:
        break;
    }
    if (link) {
      if (isBlank) {
        window.open(link, "_blank");
      } else {
        try {
          const currentLink = this.props.location.pathname.split("/")[1];
          const newLink = link.split("/")[1];
          this.props.history.push(link);
          if (currentLink === newLink) {
            window.location.reload();
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    this.onClickNotification();
  };

  onClickNotification = () => {
    if (this.props.onClickNotification) {
      this.props.onClickNotification();
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    if (!this.props.email) {
      window.location.href = "/";
      return <div />;
    }

    const { notifications, isListEnded } = this.state;
    const { onClickNotification } = this;

    return (
      <View
        notifications={notifications}
        handleOnClickMore={this.handleOnClickMore}
        handleOnClickItem={this.handleOnClickItem}
        onClickNotification={onClickNotification}
        isListEnded={isListEnded}
      />
    );
  }
}

export default connect(
  state => ({ email: state.userinfo.email }),
  { updateUserInfo: userInfoAction.updateUserInfo }
)(withRouter(Container));
