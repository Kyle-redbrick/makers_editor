import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import View from "./View";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as request from "../../Util/HTTPRequest";
// import * as TrackingUtil from "../../Util/TrackingUtil";
import "./index.scss";

class Container extends Component {
  constructor(props) {
    super(props);
    const { mode } = this.props.match.params;
    let title, labelForTitle, criterion;
    switch (mode) {
      case "pop":
        title = <FormattedMessage id="ID_WIZAPP_POP_TITLE" />;
        labelForTitle = "HOT!";
        criterion = "likeCount";
        break;
      case "new":
        title = <FormattedMessage id="ID_WIZAPP_NEW_TITLE" />;
        labelForTitle = "NEW!";
        criterion = "editedAt";
        break;
      case "rnd":
        title = <FormattedMessage id="ID_WIZAPP_RANDOM_TITLE" />;
        criterion = "random";
        break;
      case "recommend":
        title = <FormattedMessage id="ID_WIZAPP_RECOMMEND_TITLE" />;
        criterion = "recommend";
        break;
      case "view":
        title = <FormattedMessage id="ID_WIZAPP_VIEW_TITLE" />;
        criterion = "viewCount";
        break;
      case "challengeRank":
        title = <FormattedMessage id="ID_WIZAPP_MODE_CHALLENGE_RANK" />;
        criterion = "challengeRank";
        break;
      case "challengeNew":
        title = <FormattedMessage id="ID_WIZAPP_MODE_CHALLENGE_NEW" />;
        criterion = "challengeNew";
        break;
      case "ssafyRank":
        title = <FormattedMessage id="ID_WIZAPP_MODE_SSAFY_RANK" />;
        criterion = "ssafyRank";
        break;
      case "ssafyNew":
        title = <FormattedMessage id="ID_WIZAPP_MODE_SSAFY_NEW" />;
        criterion = "ssafyNew";
        break;
      case "jjRank":
        title = <FormattedMessage id="ID_WIZAPP_MODE_JJ_RANK" />;
        criterion = "jjRank";
        break;
      case "jjNew":
        title = <FormattedMessage id="ID_WIZAPP_MODE_JJ_NEW" />;
        criterion = "jjNew";
        break;
      default:
        break;
    }

    this.state = {
      title,
      labelForTitle,
      criterion,
      items: [],
      totalCnt: null,
      offset: 0,
      stepSize: 20,
      isLoading: false
    };
  }

  componentDidMount() {
    // TrackingUtil.sendPageEvent(this.props.location.pathname, this.props.email);
    //const { mode } = this.props.match.params;

    // init list
    const { stepSize } = this.state;
    let firstLimit = Number(this.props.match.params.offset);
    if (!firstLimit || firstLimit < stepSize) {
      // only if firstly access to this page,
      firstLimit = stepSize;
      window.scrollTo(0, 0);
    }

    this.requestItems(firstLimit, true);
  }

  handleMoreBtn = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.requestItems(this.state.stepSize);
      }
    );
  };

  requestItems = (limit, isFirst = false) => {
    const { criterion, offset } = this.state;
    const newOffset = isFirst ? limit : offset + limit;
    if (criterion === "challengeRank") {
      // return;
    }
    request
      .getAppsBy({ mode: criterion, offset, limit })
      .then(res => res.json())
      .then(json => {
        this.setState(
          state => ({
            items: [...state.items, ...json.rows],
            totalCnt: json.count,
            offset: newOffset,
            isLoading: false
          }),
          () => {
            const { mode } = this.props.match.params;

            if (Number(this.props.match.params.offset) !== this.state.offset) {
              this.props.history.replace(
                `/wizapps/${mode}/${this.state.offset}`
              );
            }
          }
        );
      })
      .catch(err => console.error(err));
  };

  render() {
    const {
      title,
      labelForTitle,
      items,
      //totalCnt,
      //offset,
      isLoading
    } = this.state;
    const { mode } = this.props.match.params;
    let isAll;

    const cand = [
      "pop",
      "new",
      "rnd",
      "recommend",
      "view",
      "challengeRank",
      "challengeNew",
      "ssafyRank",
      "ssafyNew",
      "jjRank",
      "jjNew"
    ];
    if (cand.indexOf(mode) < 0) {
      return <Redirect to="/game" />;
    }

    if (mode === "pop") {
      isAll = true;
    }

    return (
      <div className="Page--WizAppMode">
        <View
          title={title}
          labelForTitle={labelForTitle}
          mode={mode}
          items={items}
          isAll={isAll}
          isLoading={isLoading}
          handleMoreBtn={this.handleMoreBtn}
        />
      </div>
    );
  }
}

export default connect(state => ({ email: state.userinfo.email }))(
  withRouter(Container)
);
