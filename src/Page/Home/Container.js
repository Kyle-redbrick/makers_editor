import React, { Component } from "react";
import { connect } from "react-redux";
import View from "./View";
import * as request from "../../Common/Util/HTTPRequest";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import { PAGETYPE } from "../../Common/Util/Constant";
import generatePID from "../../Common/Util/PIDGenerator";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";
// import * as TrackingUtil from "../../Common/Util/TrackingUtil";
import { detectIE } from "../../Common/Util/detectBrowser";
import SignIn from "../../Common/Component/SignIn";

class Container extends Component {
  constructor(props) {
    super(props);

    if (window.location.hash) {
      props.history.replace(window.location.hash.replace("#", ""));
    }

    this.isIE = detectIE();
    this.wasPlayed = false;
    this.state = {
      // popUsers: undefined,
      // videoRef: undefined,
      wizEvent: [],
      recommendedGames: [],
      rankUsers: [],
      weeklyProjects: [],
      templateProjects: [],
      isSubscribed: undefined,
      weeklyTabType: "like",
      rankTabType: "likeCount",
      isMobile: window.innerWidth < 1080
    };
    this.pageSize = 50;
  }

  async componentDidMount() {
    // TrackingUtil.sendPageEvent("/home", this.props.email);
    await this.getWizlabEvents();
    await this.getrecommendedGames();
    await this.getRankingByType();
    await this.getWeeklyProjectsByType();
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();

    if (!this.isIE) {
      window.addEventListener("scroll", this.onScroll);
    }

    this.getMyProjects({ currentPage: 1, keyword: "" });
    request
      .getTemplateProjects()
      .then(res => res.json())
      .then(json => {
        this.setState({ templateProjects: json }, () => {
          this.loadTemplateByHome();
        });
      })
      .catch(e => {
        console.error(e);
      });
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleWindowResize);
    if (!this.isIE) {
      window.removeEventListener("scroll", this.onScroll);
    }
  }

  handleWindowResize = () => {
    if (window.innerWidth < 1080 && !this.state.isMobile) {
      this.setState({ isMobile: true });
    }
    if (window.innerWidth >= 1080 && this.state.isMobile) {
      this.setState({ isMobile: false });
    }
  };

  handleSubscribe = (e, index, email, subscribe) => {
    if (this.lastLikeTime) {
      if (new Date().getTime() - this.lastLikeTime < 1200) {
        this.lastLikeTime = new Date().getTime();
        showPopUp(
          <PopUp.OneButton
            title={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
            })}
            buttonName={this.props.intl.formatMessage({
              id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
            })}
          />,
          { darkmode: true }
        );
        return;
      }
    }
    this.lastLikeTime = new Date().getTime();

    if (!this.props.email) {
      showPopUp(<SignIn />, {
        darkmode: true,
        mobileFullscreen: true
      });
      return;
    }
    e.target.classList.toggle("click");
    const params = { creatorEmail: email, email: this.props.email };
    if (subscribe) {
      request
        .addSubscribe(params)
        .then(res => res.json())
        .then(json => {
          if (json) {
            let target = this.state.rankUsers;
            target[index].subscribe = true;
            target[index].subscribeCount =
              this.state.rankUsers[index].subscribeCount + 1;
            this.setState({ rankUsers: target });
          } else {
            showPopUp(
              <PopUp.OneButton
                title={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
                })}
                buttonName={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
                })}
              />,
              { darkmode: true }
            );
          }
        });
    } else {
      request
        .removeSubscribe(params)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            let target = this.state.rankUsers;
            target[index].subscribe = false;
            target[index].subscribeCount =
              this.state.rankUsers[index].subscribeCount - 1;
            this.setState({ rankUsers: target });
          } else {
            showPopUp(
              <PopUp.OneButton
                title={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_TITLE"
                })}
                buttonName={this.props.intl.formatMessage({
                  id: "ID_POPUP_WARNING_REPEAT_CLICK_BTN"
                })}
              />,
              { darkmode: true }
            );
          }
        });
    }
  };

  getMyProjects = props => {
    if (!this.props.email) return;
    let { currentPage, keyword } = props;
    let pageOffset = Math.ceil((currentPage - 1) * this.pageSize);
    let limit = this.pageSize;
    keyword = encodeURIComponent(keyword);

    let params = {
      email: this.props.email,
      offset: pageOffset,
      limit: limit,
      keyword: keyword
    };

    request
      .getDevelopingProjects(params)
      .then(res => res.json())
      .then(result => {
        const { count, rows } = result;
        this.setState(prev => {
          return {
            myprojects: currentPage === 1 ? rows : prev.myprojects.concat(rows),
            myprojectCnt: count
          };
        });
      })
      .catch(err => console.error(err));
  };

  loadTemplateByHome = () => {
    if (this.templateId && this.state.templateProjects.length > 0) {
      this.state.templateProjects.forEach(element => {
        if (element.id === Number(this.templateId)) {
          this.createNewProject(element);
          localStorage.removeItem("templateId");
          return;
        }
      });
    }
  };

  getWizlabEvents = async () => {
    const wizEvent = await request
      .getWizlabEvents()
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({ wizEvent: wizEvent.events });
  };

  getrecommendedGames = async () => {
    const wizappInfo = await request
      .getEditorRecommends({ limit: 4 })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      recommendedGames: wizappInfo
    });
  };

  getWeeklyProjectsByType = async () => {
    const weeklyProjects = await request
      .getWeeklyProjectsByType({ type: this.state.weeklyTabType, limit: 10 })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({ weeklyProjects });
  };

  getRankingByType = async () => {
    const rankUsers = await request
      .getRankingByType({
        type: this.state.rankTabType
      })
      .then(res => res.json())
      .catch(e => console.error(e));

    for (const item of rankUsers) {
      if (this.props.email) {
        await request
          .isSubscribe({
            email: this.props.email,
            creatorEmail: item.email
          })
          .then(res => res.json())
          .then(json => {
            item.subscribe = json.isSubscribe;
          });
      } else {
        item.subscribe = false;
      }
    }
    this.setState({ rankUsers });
  };

  onClickLink = id => {
    window.location = `/userpage/${id}`;
  };

  getCreator = creatorEmail => {
    request
      .isSubscribe({
        email: this.props.email,
        creatorEmail: creatorEmail
      })
      .then(res => res.json())
      .catch(e => console.error(e));
  };

  handleWeeklyProjectTab = tabType => {
    this.setState({ weeklyTabType: tabType }, () => {
      this.getWeeklyProjectsByType();
    });
  };

  handleCreatorRankTab = tabType => {
    this.setState({ rankTabType: tabType }, () => {
      this.getRankingByType();
    });
  };

  handleClickCodeBtn = target => {
    target.classList.add("click");
  };

  onClickCreate = templateId => {
    localStorage.setItem("templateId", templateId);
    window.open("/builder");
  };

  createNewProject = template => {
    const { email } = this.props;
    if (email) {
      // const isEmptyTemplete = template.order === 0;

      let pageURL = `/${PAGETYPE.BUILDER}/${generatePID(email)}`;
      if (template.id) {
        pageURL += `/${template.id}`;
      }

      this.props.history.replace({
        pathname: pageURL
      });
      window.location.reload();
    } else {
      let pageURL = `/${PAGETYPE.BUILDER}?t=${template.id}`;
      this.props.history.replace({
        pathname: pageURL
      });
      window.location.reload();
    }
  };

  onScroll = e => {
    if (!this.wasPlayed && window.pageYOffset > 350) {
      const { videoRef } = this.state;
      if (videoRef) {
        const playPromise = videoRef.play();
        playPromise
          .then(() => {
            this.wasPlayed = true;
          })
          .catch(() => {
            console.error("play");
          });
      }
    }
  };

  setVideoRef = ref => {
    this.setState({ videoRef: ref });
  };

  handleClickBanner = (url, isLogin) => {
    if (isLogin) {
      if (this.props.email) {
        if (url.includes("http")) {
          window.open(url);
        } else {
          this.props.history.push(url);
        }
      } else {
        showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
      }
    } else {
      if (url.includes("https")) {
        window.open(url);
      } else {
        this.props.history.push(url);
      }
    }
  };

  render() {
    const {
      wizEvent,
      recommendedGames,
      weeklyProjects,
      rankUsers,
      templateProjects,
      weeklyTabType,
      rankTabType,
      isMobile
    } = this.state;
    const {
      onClickCreate,
      setVideoRef,
      handleClickCodeBtn,
      onPressBestGame,
      handleSubscribe,
      createNewProject,
      onClickLink,
      handleWeeklyProjectTab,
      handleCreatorRankTab,
      handleClickBanner
    } = this;
    return (
      <View
        isMobile={isMobile}
        wizEvent={wizEvent}
        recommendedGames={recommendedGames}
        weeklyProjects={weeklyProjects}
        rankUsers={rankUsers}
        templateProjects={templateProjects}
        intl={this.props.intl}
        onClickCreate={onClickCreate}
        onPressBestGame={onPressBestGame}
        setVideoRef={setVideoRef}
        handleClickCodeBtn={handleClickCodeBtn}
        handleSubscribe={handleSubscribe}
        createNewProject={createNewProject}
        weeklyTabType={weeklyTabType}
        rankTabType={rankTabType}
        onClickLink={onClickLink}
        handleCreatorRankTab={handleCreatorRankTab}
        handleWeeklyProjectTab={handleWeeklyProjectTab}
        handleClickBanner={handleClickBanner}
      />
    );
  }
}

export default connect(
  state => ({
    email: state.userinfo.email
  }),
  {}
)(injectIntl(withRouter(Container)));
