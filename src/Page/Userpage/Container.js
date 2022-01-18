import * as userInfoActions from "../../Common/Store/Reducer/UserInfo";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { injectIntl } from "react-intl";
import React, { Component } from "react";
import * as request from "../../Common/Util/HTTPRequest";
import View from "./View";
// import * as TrackingUtil from "../../Common/Util/TrackingUtil";

class Container extends Component {
  constructor(props) {
    super(props);
    this.email = null;
    this.state = {
      loading: false,
      profile: undefined,

      // publisheds
      publisheds: [],
      publishedOffset: 0
    };
  }

  componentDidMount() {
    // TrackingUtil.sendPageEvent(
    //   this.props.location.pathname,
    //   this.props.userinfo.email
    // );
    this.getUserProfile();
    this.scrollToTop();
    window.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0
    });
  }

  getUserProfile = async () => {
    this.email = await request
      .userEmailById({ id: this.props.match.params.id })
      .then(res => res.json())
      .then(json => {
        if (json.email) {
          if (json.signedOut) {
            window.location = "";
          } else {
            return json.email;
          }
        } else {
          window.location = "";
        }
      })
      .catch(e => console.error(e));

    const profile = await request
      .userProfile({ email: this.email })
      .then(res => res.json())
      .catch(e => console.error(e));

    this.setState({
      profile
    });

    this.getMyPublishedProjects();
  };

  getMyPublishedProjects = () => {
    if (!this.email) return;
    this.setState(
      {
        loading: true
      },
      () => {
        let params = {
          email: this.email,
          offset: this.state.publishedOffset,
          limit: 20,
          isLive: this.props.match.path.includes("userpage")
        };
        request
          .getPublishedProjectsByLive(params)
          .then(res => res.json())
          .then(result => {
            const { rows } = result;
            const projects = rows.filter(project => {
              return project.live;
            });
            this.setState(
              prev => ({
                publisheds: [].concat(prev.publisheds, projects),
                loading: false
              }),
              () => {
                if (this.state.publisheds.length < 20) {
                  window.removeEventListener("scroll", this.onScroll);
                }
              }
            );
          })
          .catch(err => console.error(err));
      }
    );
  };

  onScroll = e => {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 100
    ) {
      const { publishedOffset, loading } = this.state;
      if (!loading) {
        this.setState(
          {
            publishedOffset: publishedOffset + 20
          },
          () => {
            this.getMyPublishedProjects();
          }
        );
      }
    }
  };

  render() {
    if (!this.props.match.params.id) {
      return <Redirect to="/" />;
    }

    const { profile, publisheds } = this.state;
    return (
      <View
        profile={profile}
        publisheds={publisheds}
        match={this.props.match}
        intl={this.props.intl}
      />
    );
  }
}

export default connect(
  state => ({
    userinfo: state.userinfo
  }),
  {
    updateUserInfo: userInfoActions.updateUserInfo
  }
)(injectIntl(withRouter(Container)));
