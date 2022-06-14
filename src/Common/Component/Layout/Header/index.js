import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import onClickOutside from "react-onclickoutside";
import { showPopUp } from "../../PopUp";
import LoginAlertPopup from "../../PopUp/LoginAlertPopup";
import * as userInfoActions from "../../../Store/Reducer/UserInfo";
import SignIn from "../../SignIn";
import SignUp from "../../SignUp";
import logoImg from "../../../../Image/astro-new-logo.png";
import searchImg from "../../../../Image/dreamclass/search.svg";
import NotiOnIcon from "../../../../Image/dreamclass/notification-bell-new-notification.svg";
import NotiOffIcon from "../../../../Image/dreamclass/notification-bell-normal.svg";
import mobileMenuOn from "../../../../Image/dreamclass/header-menu.svg";
import mobileMenuOff from "../../../../Image/dreamclass/header-menu-close.svg";
import * as request from "../../../Util/HTTPRequest";
import DropDown from "../DropDown";
import Notification from "../Notification";
import QueryString from "query-string"
import "./index.scss";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badge: 0,
      isMobileMenuOn: false,
      isSearchBarOpen: false,
      isMobileSearchBarOn: false,
      isSearchFocusOn: false,
      searchValue: '',
      isHeaderFixed: false
    };
  }

  componentDidMount = () => {
    this.getBadgeCount();
    this.handleTutorialPopup();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.userinfo.email !== this.props.userinfo.email) {
      this.getBadgeCount();
      window.location.reload()
    }
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll);
  }

  handleTutorialPopup = () => {
    if (!localStorage.getItem("tutorialPopupStatus")) {
      window.addEventListener('scroll', this.onScroll);
    } else {
      this.setState({ isHeaderFixed: true });
    }
  }

  onScroll = () => {
    if (window.scrollY > 50) {
      if (this.state.isHeaderFixed !== true) {
        this.setState({ isHeaderFixed: true });
      }
    } else {
      this.setState({ isHeaderFixed: false });
    }
  }

  handleOnKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.onSubmitSearchValue(e);
    }
  }

  getBadgeCount = () => {
    if (this.props.userinfo.email) {
      request
        .getBadgeCount({ email: this.props.userinfo.email })
        .then(res => res.json())
        .then(json => this.setState({ badge: json.badge }));
    }
  };

  checkLogin = (e) => {
    const isLoggedIn = localStorage.getItem("wizToken");
    if (!isLoggedIn) {
      e.preventDefault();
      showPopUp(<LoginAlertPopup />, {
        defaultPadding: false,
        dismissButton: false,
      });
    }
  }

  onClickSignIn = () => {
    this.setState({ isMobileMenuOn: false });
    showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
  };
  onClickSignUp = () => {
    this.setState({ isMobileMenuOn: false });
    showPopUp(<SignUp />, {
      darkmode: true,
      scrollable: true,
      mobileFullscreen: true
    });
  };

  onClickNotification = () => {
    if (this.state.isNotiPopupOn) {
      this.setState({ isNotiPopupOn: false });
    } else {
      this.setState({ isNotiPopupOn: true, badge: 0 });
    }
  };

  onClickLogout = () => {
    localStorage.removeItem("wizToken");
    this.props.updateUserInfo();
    this.handleToggleMobileMenu();
  };

  handleToggleMobileMenu = () => {
    this.setState({ isMobileMenuOn: !this.state.isMobileMenuOn, isNotiPopupOn: false });
  };

  handleClickURL = url => {
    this.setState({ isMobileMenuOn: false }, () => {
      this.props.history.push(url);
      window.location.reload();
    }
    );
  };

  handleClickSearchBar = () => {
    this.setState({ isSearchBarOpen: !this.state.isSearchBarOpen })
  }

  onChangeSearchValue = ({ target }) => {
    const value = target.value;
    this.setState({ searchValue: value })
  }

  onFocusSearch = () => {
    this.setState({ isSearchFocusOn: true })
  }

  onSubmitSearchValue = () => {
    if (this.state.searchValue) {
      const query = { keyword: this.state.searchValue };
      const queryString = QueryString.stringify(query);
      this.props.history.replace("/courses?" + queryString);
      this.handleClickOutside();
    }
  }

  handleClickOutside = () => {
    this.setState({ isSearchBarOpen: false, isSearchFocusOn: false, searchValue: "", isNotiPopupOn: false })
  }

  handleClickMobileSearchBar = () => {
    if (this.state.isMobileSearchBarOn) {
      this.setState({ searchValue: "", isMobileSearchBarOn: false })
    }
    this.setState({ isMobileSearchBarOn: !this.state.isMobileSearchBarOn })
  }

  render() {
    const { userinfo, intl, hideHeader } = this.props;
    const { isMobileMenuOn, isSearchBarOpen, searchValue, isSearchFocusOn, isMobileSearchBarOn, isHeaderFixed } = this.state;
    const {
      checkLogin,
      onClickSignIn,
      onClickSignUp,
      handleToggleMobileMenu,
      handleClickSearchBar,
      onChangeSearchValue,
      onFocusSearch,
      onSubmitSearchValue,
      handleClickMobileSearchBar,
      handleClickURL,
      handleOnKeyUp
    } = this;
    let links = [
      "about",
      "learn",
      // "social",
      // "ranking",
      // "event",
      // "codingparty",
      // "challenge",
      // "trial",
      // "myapk",
      // "news"
    ];
    if (userinfo.id) {
      links.push("builder", "game");
    }
    if (userinfo.organization) {
      if (userinfo.organization.toLowerCase() === "ssafy") {
        links.push("ssafy");
      }
    }
    if (userinfo.organization) {
      if (userinfo.organization.includes("전주")) {
        links.push("jj");
      }
    }

    return (
      <div className={`header ${hideHeader ? "hide" : ""}`}>
        <div className={`header_wrapper ${isHeaderFixed ? "fixed" : ""}`}>
          <section className="header_pc">
            <div className="header_logo">
              <Link
                to="/intro"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <img src={logoImg} alt="로고 이미지" />
              </Link>
            </div>
            <div className="header_links">
              {links
                .filter(link => link !== "myapk")
                .map((link, index) => {
                  if (link === "builder") {
                    return (
                      <a
                        key={index}
                        className="header_link"
                        href={`/${link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {intl.formatMessage({
                          id: `ID_HEADER_LINK_${link.toUpperCase()}`
                        })}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={index}
                      to={link === "social" ? "/social/recent" : `/${link}`}
                      className={`header_link ${this.props.location.pathname.split(
                        "/"
                      )[1] === link && "header_link_on"} header_link_${link}`}
                      onClick={() => link && window.scrollTo(0, 0)}
                    >
                      {/* <div className="header_link_dot" /> */}
                      {intl.formatMessage({
                        id: `ID_HEADER_LINK_${link.toUpperCase()}`
                      })}
                    </Link>
                  );
                })}
            </div>
            <div className="header_menus">
              <div className="header_menu_icon searchBtn" onClick={handleClickSearchBar}>
                <img src={searchImg} alt="" />
              </div>
              <div className={`header_menu_icon searchBar ${isSearchBarOpen ? "open" : "close"}`}>
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "ID_HEADER_SEARCH_PLACEHOLDER" })}
                  value={searchValue}
                  onFocus={onFocusSearch}
                  onChange={(e) => { onChangeSearchValue(e) }}
                  onKeyUp={handleOnKeyUp}
                />
                <img className="openSearchIcon" src={searchImg} alt="" onClick={onSubmitSearchValue} />
              </div>
              {/* <div className={`header_menu_icon searchResult ${isSearchFocusOn ? "open" : "close"}`}>
                <p className="quickLink">
                  {intl.formatMessage({ id: "ID_DREAM_HEADER_QUICK_LINK" })}
                </p>
                <ul className="searchResultList">
                  <li onClick={() => handleClickURL("/courses?courseType=oobc")}>
                    {intl.formatMessage({ id: "ID_DREAM_HEADER_OOBC" })}
                  </li>
                  <li onClick={() => handleClickURL("/courses?courseType=javascript")}>
                    {intl.formatMessage({ id: "ID_DREAM_HEADER_JS" })}
                  </li>
                  <li onClick={() => handleClickURL("/courses?courseType=python")}>
                    {intl.formatMessage({ id: "ID_DREAM_HEADER_PYTHON" })}
                  </li>
                </ul>
              </div> */}
              <div className="lms">
                <Link to="/lms/mission" onClick={checkLogin} >
                  {intl.formatMessage({ id: "ID_HEADER_LMS" })}
                </Link>
              </div>
              {/* <DropDown type="lang" /> */}

              {userinfo.name ? (
                <Fragment>
                  <div className="header_menus-noti">
                    <img
                      className="header_menus-noti-img"
                      src={this.state.badge > 0 ? NotiOnIcon : NotiOffIcon}
                      alt="img"
                      onClick={this.onClickNotification}
                    />
                  </div>
                  <DropDown type="user" user={this.props.userinfo} />
                  {this.state.isNotiPopupOn && (
                    <div className="header_notification">
                      <Notification
                        onClickNotification={this.onClickNotification}
                        userinfo={this.props.userinfo}
                      />
                    </div>
                  )}
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    className="header_menu"
                    id="header_menu_signIn"
                    onClick={onClickSignIn}
                  >
                    {intl.formatMessage({
                      id: `ID_HEADER_LOGIN`
                    })}
                  </div>
                  {/* <div
                    className="header_menu"
                    id="header_menu_signUp"
                    onClick={onClickSignUp}
                  >
                    {intl.formatMessage({
                      id: `ID_HEADER_SIGNUP`
                    })}
                  </div> */}
                </Fragment>
              )}
            </div>
          </section>
          <section className="header_mobile">
            <div className={`header_menu_wrapper ${isMobileSearchBarOn ? "Off" : "On"}`}>
              <div className="header_menu_icon">
                <img
                  onClick={handleToggleMobileMenu}
                  src={isMobileMenuOn ? mobileMenuOff : mobileMenuOn}
                  alt="menu"
                />
              </div>
              <div className="header_logo">
                <Link
                  to="/"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <img src={logoImg} alt="로고 이미지" />
                </Link>
              </div>
            </div>
            <div className={`header_menu_right ${isMobileMenuOn ? "On" : "Off"}`}>
              {userinfo.name &&
              <>
                <div className={`header_menu_noti ${this.state.isNotiPopupOn ? "On" : "Off"}`}>
                  <img
                    className="header_menus-noti"
                    src={this.state.badge > 0 ? NotiOnIcon : NotiOffIcon}
                    alt="img"
                    onClick={this.onClickNotification}
                  />
                </div>
                <DropDown type="user" user={this.props.userinfo} />
              </>
              }
            </div>
            {this.state.isNotiPopupOn &&
              (<div className="header_notification">
                <Notification
                  onClickNotification={this.onClickNotification}
                  userinfo={this.props.userinfo}
                />
              </div>)}
            <div
              className={`header_menu_content header_menu_content${isMobileMenuOn ? "On" : "Off"
                } ${isMobileSearchBarOn ? "clickedSearchBar" : ""
                }`}
            >
              <div className="header_menu_icon searchBar">
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "ID_HEADER_SEARCH_PLACEHOLDER" })}
                  value={searchValue}
                  onChange={(e) => { onChangeSearchValue(e) }}
                  onClick={!isMobileSearchBarOn && handleClickMobileSearchBar}
                  onFocus={onFocusSearch}
                  onKeyUp={handleOnKeyUp}
                />
                <img src={searchImg} alt="" onClick={onSubmitSearchValue} />
                {isMobileSearchBarOn &&
                  <span
                    className="closeSearchBarBtn"
                    onClick={handleClickMobileSearchBar} >
                    {intl.formatMessage({ id: "ID_HEADER_SEARCH_CLOSE_BUTTON" })}
                  </span>
                }
              </div>
              <div className="header_links">
                {links
                  .filter(l =>
                    this.props.userinfo.email && (l !== "builder" && l !== "myapk")
                  )
                  .map((link, index) => {
                    if (link === "builder") {
                      return (
                        <a
                          key={index}
                          className="header_link"
                          href={`/${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {intl.formatMessage({
                            id: `ID_HEADER_LINK_${link.toUpperCase()}`
                          })}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={index}
                        to={`/${link}`}
                        className={`header_link`}
                        onClick={() => link && window.scrollTo(0, 0)}
                      >
                        {intl.formatMessage({
                          id: `ID_HEADER_LINK_${link.toUpperCase()}`
                        })}
                      </Link>
                    );
                  })}
              </div>
              <Link to="/lms/mission" onClick={checkLogin} className="header_lms_btn">
                {intl.formatMessage({ id: "ID_HEADER_LMS" })}
              </Link>
              {
                isMobileSearchBarOn &&
                <div className={`header_menu_icon searchResult ${isSearchFocusOn ? "open" : "close"}`}>
                  <p className="quickLink">{intl.formatMessage({ id: "ID_DREAM_HEADER_QUICK_LINK" })}</p>
                  <ul className="searchResultList">
                    <li onClick={() => handleClickURL("/courses?courseType=oobc")}>{intl.formatMessage({ id: "ID_DREAM_HEADER_OOBC" })}</li>
                    <li onClick={() => handleClickURL("/courses?courseType=javascript")}>{intl.formatMessage({ id: "ID_DREAM_HEADER_JS" })}</li>
                    <li onClick={() => handleClickURL("/courses?courseType=python")}>{intl.formatMessage({ id: "ID_DREAM_HEADER_PYTHON" })}</li>
                  </ul>
                </div>
              }
            </div>
          </section>
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
)(injectIntl(withRouter(onClickOutside(Header))));

