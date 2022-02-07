import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link, withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import * as userInfoActions from "../../../Store/Reducer/UserInfo";
import UserIconWrapper from "../../UserIconWrapper";

// Images
import mypageIcon from "../../../../Image/dreamclass/header-bar-24-account-settings.svg";
import signOutIcon from "../../../../Image/dreamclass/header-bar-24-sign-out.svg";

import "./index.scss";

const DDItem = ({ user, text, url, onClick }) => {
  if (user) {
    return (
      <div className="DDItem-user">
        <div className="DDItem-user-icon">
          <UserIconWrapper iconSrc={user.icon} />
        </div>
        <div className="DDItem-user-info">
          <div className="DDItem-user-name">
            {user.name}
          </div>
        </div>
      </div>
    );
  }
  if (url) {
    return (
      <Link to={url} style={{ textDecoration: "none" }}>
        <div className="DDItem DDItem-mypage" onClick={onClick}>
          <div className="DDItem__text">{text}</div>
          <img src={mypageIcon} alt="" />
        </div>
      </Link>
    );
  }
  return (
    <div className="DDItem" onClick={onClick}>
      <div className="DDItem__text">{text}</div>
      <img src={signOutIcon} alt="" />
    </div>
  );
};

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpened: false,
    };
  }
  handleClickOutside = e => {
    this.setState({
      isListOpened: false
    });
  };

  handleToggleList = () => {
    this.setState(state => {
      return { isListOpened: !state.isListOpened };
    });
  };

  onClickLogout = () => {
    localStorage.removeItem("wizToken");
    this.props.updateUserInfo();
    this.props.history.replace({
      pathname: "/"
    });
  };

  render() {
    const { user } = this.props;
    let { isListOpened } = this.state;

    return (
      <div className="DD DD__user">
        <div className="DD__header" onClick={this.handleToggleList}>
          <div className="DD__userIconSize">
            <UserIconWrapper iconSrc={user.icon} />
          </div>
        </div>
        <div className="DD__body">
          {isListOpened && (
            <div className="DD__list">
              <DDItem user={user} />
              <DDItem
                text={<FormattedMessage id="ID_USERDD_MYPAGE" />}
                url="/mypage"
              />
              <DDItem
                text={<FormattedMessage id="ID_USERDD_LOGOUT" />}
                onClick={this.onClickLogout}
                className='logout'
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ userinfo: state.userinfo }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(onClickOutside(DropDown))));
