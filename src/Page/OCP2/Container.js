import React, { Component } from "react";
import View from "./View";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { OCPv2, OCPGame } from "../../Common/Util/Constant";
import * as request from "../../Common/Util/HTTPRequest";
import signupImg from "../../Image/new_singup.png";
import signupImg_m from "../../Image/250-169_signup.png";
import reviewImg from "../../Image/review_banner@2x.png";
import reviewImg_m from "../../Image/250-169_review.png";
import campImg from "../../Image/ocp-banner-pc-345-345@2x.png";
import campImg_m from "../../Image/ocp-banner-mobile-250-169@2x.png";
import challengeImg from "../../Image/onine_codingparty_event_banner.png";
import challengeImg_m from "../../Image/onine_coding_party_event_banner_M.png";

class Container extends Component {
  constructor(props) {
    super(props);
    const gameKey = this.props.match.params.gameKey;
    const localSelectedGame = localStorage.getItem("OCPSelectedGame");
    if (!localSelectedGame && !gameKey) {
      localStorage.setItem("OCPSelectedGame", OCPv2.GAMETYPE.ESCAPE);
    }

    this.state = {
      myData: {},
      beginner: undefined,
      intermediate: undefined,
      advanced: undefined,
      count: undefined,
      rank: [],
      rankLimit: 10,
      projects: [],
      projectsLimit: 8,
      selectedGame: gameKey ? gameKey : localStorage.getItem("OCPSelectedGame"),
      selectedMission: undefined,
      gameInfo: OCPGame,
      isShowGameDetail: false
    };
    this.events = [
      {
        path: "/event/codingparty/challenge",
        img: challengeImg,
        mobileImg: challengeImg_m,
        title: "위즈랩 크리에이터 챌린지 시즌 2",
        date: "2020년 10월 19일 ~ 11월 29일(종료)"
      },
      {
        path: "/event/codingparty/signup",
        img: signupImg,
        mobileImg: signupImg_m,
        title: "회원가입하면 선물 팡팡",
        date: "2020년 10월 19일 ~ 11월 29일(종료)"
      },
      {
        path: "/event/codingparty/review",
        img: reviewImg,
        mobileImg: reviewImg_m,
        title: "미션 후기 이벤트",
        date: "2020년 10월 19일 ~ 11월 29일(종료)"
      },
      {
        path: "/event/codingparty/onlinecamp",
        img: campImg,
        mobileImg: campImg_m,
        title: "위즈랩 온라인 캠프",
        date: "2020년 10월 19일 ~ 11월 29일(종료)"
      }
    ];
  }

  componentDidMount = async () => {
    this.setFocusListener();
    this.getOcpSuccessUser();
    this.getMyOcp();
    this.scrollToWizLiveEventIfNeed();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.props.userinfo.email !== prevProps.userinfo.email) this.getMyOcp();
  };

  /** Network  */
  getOcpSuccessUser = () => {
    request
      .getOcpSuccessUser2()
      .then(res => res.json())
      .then(json => this.setState({ count: json }));
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

  /** Setting Methods */
  setGameInfo = (myOcpInfo, callback) => {
    // OCPGame 데이터를 보존하기 위해
    const gameInfo = JSON.parse(JSON.stringify(OCPGame));
    myOcpInfo.forEach(myOcp => {
      const game = gameInfo[myOcp.type];
      if (game) {
        const mission = game.itemInfo[myOcp.grade];
        mission["level"] = myOcp.level;
      }
    });
    this.setState(
      {
        gameInfo
      },
      () => {
        if (callback) callback();
        this.showDetailPageByEvent();
      }
    );
  };

  setFocusListener = () => {
    window.addEventListener("focus", this.onFocusForRefreshGameDetail);
  };

  /** Event Handler */

  onFocusForRefreshGameDetail = () => {
    if (this.state.isShowGameDetail && this.state.selectedMission)
      this.getMyOcp(this.gameInfoCallback);
  };

  gameInfoCallback = () => {
    const { selectedMission, gameInfo, selectedGame } = this.state;
    if (!selectedMission || !gameInfo || !selectedGame) return;
    this.setState({
      selectedMission: {
        gameType: selectedMission.gameType,
        grade: selectedMission.grade,
        ...gameInfo[selectedGame].itemInfo[selectedMission.grade]
      }
    });
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
  handleGameType = gameName => {
    localStorage.setItem("OCPSelectedGame", gameName);
    this.setState({ selectedGame: gameName });
  };

  onClickTry = (mission, grade) => {
    const selectedMission = {
      ...mission,
      grade,
      gameType: this.state.selectedGame
    };

    this.setState(
      {
        isShowGameDetail: true,
        selectedMission
      },
      () => {
        document.body.classList.add("body-unsrollable");
        this.moveLayoutContentsLayerBy(true);
      }
    );
  };

  handleGameDetailBack = () => {
    document.body.classList.remove("body-unsrollable");

    this.setState(
      {
        isShowGameDetail: false,
        selectedMission: null
      },
      () => {
        this.moveLayoutContentsLayerBy(false);
      }
    );
  };

  onClickEvent = event => {
    this.props.history.push(event.path);
    window.scrollTo(0, 0);
  };

  /** Methods */
  moveLayoutContentsLayerBy = flag => {
    const layoutContents = document.getElementsByClassName("layout_contents")
      ? document.getElementsByClassName("layout_contents")[0]
      : null;

    if (!layoutContents) return;
    if (flag) {
      layoutContents.style.zIndex = 11;
    } else {
      layoutContents.style.zIndex = 5;
    }
  };

  getGuestInfo = () => {
    return (
      localStorage.getItem("ocpId") && JSON.parse(localStorage.getItem("ocpId"))
    );
  };

  parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === "?"
      ? queryString.substr(1)
      : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }

  showDetailPageByEvent = () => {
    if (this.isShowDetailPageByEvent) return;
    this.isShowDetailPageByEvent = true;
    if (this.props.location.search && this.props.location.search !== "") {
      const queryInfo = this.parseQuery(this.props.location.search);
      this.setState(
        {
          selectedGame: queryInfo.type
        },
        () => {
          this.eleCheckInterval = setInterval(() => {
            const ele = document.getElementById(
              `main_bottom_item-${queryInfo.type}-${queryInfo.grade}`
            );
            if (ele) {
              ele.click();
              clearInterval(this.eleCheckInterval);
            }
          }, 100);
        }
      );
    }
  };

  scrollToWizLiveEventIfNeed() {
    const { search } = this.props.location;
    const query = this.parseQuery(search);
    const { myCodingStyleId } = query;
    if (!myCodingStyleId) return;
    const wizLiveEventElement = document.getElementById("wizliveEvent");
    if (!wizLiveEventElement) return;
    window.scroll({
      top: wizLiveEventElement.offsetTop,
      behavior: "smooth"
    });
  }

  render() {
    const { intl } = this.props;
    const {
      count,
      rank,
      rankLimit,
      projects,
      projectsLimit,
      selectedGame,
      gameInfo,
      selectedMission,
      isShowGameDetail
    } = this.state;
    const {
      handleMore,
      handleGameType,
      onClickTry,
      handleGameDetailBack,
      events
    } = this;
    return (
      <View
        intl={intl}
        count={count}
        rank={rank}
        rankLimit={rankLimit}
        handleMore={handleMore}
        projects={projects}
        projectsLimit={projectsLimit}
        userId={this.props.userinfo.id}
        selectedGame={selectedGame}
        handleGameType={handleGameType}
        gameInfo={gameInfo}
        onClickTry={onClickTry}
        selectedMission={selectedMission}
        isShowGameDetail={isShowGameDetail}
        handleGameDetailBack={handleGameDetailBack}
        events={events}
        onClickEvent={this.onClickEvent}
        onFocusForRefreshGameDetail={this.onFocusForRefreshGameDetail}
      />
    );
  }
}
export default connect(
  state => ({ userinfo: state.userinfo }),
  {}
)(injectIntl(Container));
