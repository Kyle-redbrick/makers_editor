import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl } from "react-intl";
import PopUp, { showPopUp } from "../../Common/Component/PopUp";
import * as request from "../../Common/Util/HTTPRequest";
import * as TrackingUtil from "../../Common/Util/TrackingUtil";
import { dateFormatter } from "./Util/DateFormatter";
import SignIn from "../../Common/Component/SignIn";
import View from "./View";
import checkBlockedUser from "../../Common/Util/CheckBlockedUser";

class Container extends Component {
  constructor(props) {
    super(props);
    this.categories = ["recent", "trend"];
    // this.categories = ["recent", "trend", "subscribe"];
    this.pageLength = 5;
    this.state = {
      currentCategory: props.match.params.category || this.categories[0],
      keywords: [],
      activities: [],
      offset: 0,
      limit: this.pageLength,
      total: 0,
      loading: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll);
    if (this.props.match.params.category) {
      // TrackingUtil.sendPageEvent(
      //   this.props.location.pathname,
      //   this.props.email
      // );
      this.getActivities();
    } else {
      this.props.history.replace(`/social/${this.categories[0]}`);
      this.getActivities();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }
  componentDidUpdate() {
    const currentCategory = this.props.match.params.category;
    if (currentCategory !== this.state.currentCategory) {
      // TrackingUtil.sendPageEvent(
      //   this.props.location.pathname,
      //   this.props.email
      // );
      this.setState(
        {
          currentCategory,
          keywords: [],
          activities: [],
          offset: 0,
          limit: this.pageLength,
          total: 0,
          loading: false
        },
        () => {
          this.getActivities();
        }
      );
    }
  }

  // request
  getActivities = () => {
    switch (this.state.currentCategory) {
      case "recent":
        this.getRecents();
        break;
      case "trend":
        this.getTrends();
        break;
      case "subscribe":
        this.getSubscribeActivities();
        break;
      default:
        break;
    }
  };
  getRecents = () => {
    const { keywords, offset, limit } = this.state;
    const param = { email: this.props.userinfo.email, offset, limit, keywords };
    request
      .getSocialArticles(param)
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => {
          const newActivities = [];
          json.articles.forEach(article => {
            try {
              newActivities.push({
                type: "socialArticle",
                article: {
                  ...article,
                  contents: JSON.parse(article.contents),
                  createdAt: dateFormatter(article.createdAt)
                }
              });
            } catch {}
          });
          return {
            activities: [].concat(prevState.activities, newActivities),
            total: json.total,
            loading: false
          };
        });
      });
  };
  getTrends = () => {
    const { keywords, offset, limit } = this.state;
    const param = { email: this.props.userinfo.email, offset, limit, keywords };
    request
      .getSocialTrends(param)
      .then(res => res.json())
      .then(json => {
        this.setState(prevState => {
          const newActivities = [];
          json.articles.forEach(article => {
            try {
              newActivities.push({
                type: "socialArticle",
                article: {
                  ...article,
                  contents: JSON.parse(article.contents),
                  createdAt: dateFormatter(article.createdAt)
                }
              });
            } catch {}
          });
          return {
            activities: [].concat(prevState.activities, newActivities),
            total: json.total,
            loading: false
          };
        });
      });
  };
  getSubscribeActivities = () => {
    this.setState({ loading: true }, () => {});
  };

  // scroll
  onScroll = e => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000
    ) {
      const { offset, limit, total, loading } = this.state;
      if (total > limit && !loading) {
        this.setState(
          {
            offset: offset + this.pageLength,
            loading: true
          },
          () => {
            this.getActivities();
          }
        );
      }
    }
  };

  // category
  onClickCategory = category => {
    if (category !== this.state.currentCategory) {
      this.props.history.push(`/social/${category}`);
    }
  };

  // write
  onClickWrite = () => {
    const isBlocked = checkBlockedUser(this.props.userinfo);
    if (isBlocked) {
      return;
    }
    if (this.props.userinfo.email) {
      this.props.history.push(`/socialwrite`);
    } else {
      showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
    }
  };

  // search
  onSearchKeyDown = e => {
    const { keywords } = this.state;
    const keyword = e.target.value;
    if (e.keyCode === 13 && keyword !== "") {
      e.target.value = "";
      this.onAddKeyword(keyword);
      TrackingUtil.sendGTMEvent(
        "SocialSearch",
        "Social - Search Terms",
        keyword
      );
    } else if (e.keyCode === 8 && keyword === "" && keywords.length > 0) {
      this.onDeleteKeyword(keywords.length - 1);
    }
  };

  // keyword
  onAddKeyword = keyword => {
    const { keywords } = this.state;
    if (keywords.length <= 10 && keywords.indexOf(keyword) < 0) {
      this.setState({ keywords: [].concat(keywords, keyword) }, () => {
        this.onChangeKeyword();
      });
    }
  };
  onDeleteKeyword = index => {
    const keywords = [...this.state.keywords];
    keywords.splice(index, 1);
    this.setState({ keywords }, () => {
      this.onChangeKeyword();
    });
  };
  onResetKeyword = () => {
    this.setState({ keywords: [] }, () => {
      this.onChangeKeyword();
    });
  };
  onChangeKeyword = () => {
    this.setState(
      {
        activities: [],
        offset: 0,
        limit: this.pageLength,
        total: 0,
        loading: true
      },
      () => {
        this.getActivities();
      }
    );
  };

  // article
  onClickArticleTag = tag => {
    this.onAddKeyword(tag);
  };
  onClickArticleDelete = index => {
    const activities = [...this.state.activities];
    activities.splice(index, 1);
    this.setState({ activities });
  };
  onClickArticleSubscribe = user => {
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

    const { email } = this.props.userinfo;
    if (email) {
      try {
        const isSubscribed = user.isSubscribed;
        const params = { email, creatorEmail: user.email };
        if (isSubscribed) {
          request
            .removeSubscribe(params)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                const activities = JSON.parse(
                  JSON.stringify(this.state.activities)
                );
                activities.forEach(activity => {
                  if (activity.type === "socialArticle") {
                    const article = activity.article;
                    if (article.user.email === user.email) {
                      article.user.isSubscribed = !isSubscribed;
                    }
                  }
                });
                this.setState({ activities });
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
            .addSubscribe(params)
            .then(res => res.json())
            .then(json => {
              if (json) {
                const activities = JSON.parse(
                  JSON.stringify(this.state.activities)
                );
                activities.forEach(activity => {
                  if (activity.type === "socialArticle") {
                    const article = activity.article;
                    if (article.user.email === user.email) {
                      article.user.isSubscribed = !isSubscribed;
                    }
                  }
                });
                this.setState({ activities });
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
      } catch (err) {
        console.error(err);
      }
    } else {
      showPopUp(<SignIn />, { darkmode: true, mobileFullscreen: true });
    }
  };

  render() {
    const { intl, userinfo } = this.props;
    const { currentCategory, keywords, activities } = this.state;
    return (
      <View
        intl={intl}
        userinfo={userinfo}
        currentCategory={currentCategory}
        keywords={keywords}
        activities={activities}
        categories={this.categories}
        onClickCategory={this.onClickCategory}
        onClickWrite={this.onClickWrite}
        onSearchKeyDown={this.onSearchKeyDown}
        onDeleteKeyword={this.onDeleteKeyword}
        onResetKeyword={this.onResetKeyword}
        onClickArticleTag={this.onClickArticleTag}
        onClickArticleDelete={this.onClickArticleDelete}
        onClickArticleSubscribe={this.onClickArticleSubscribe}
      />
    );
  }
}

export default connect(state => ({ userinfo: state.userinfo }))(
  withRouter(injectIntl(Container))
);
