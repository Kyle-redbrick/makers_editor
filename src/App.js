import React, { lazy, Suspense, Component, Fragment, useEffect } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import QueryString from "query-string";
import { ToastContainer } from "react-toastify";

import { PAGE } from "./Page/LMS/Constants";

import Learn from "./Page/Course";
import Intro from "./Page/Intro";
import WizAppDetail from "./Common/Component/WizAppDetail";
import { SubscribeManager } from "./Common/Util/Subscribe";
import AOS from "aos";
import "aos/dist/aos.css";

// python test
const PythonPage = lazy(() => import("./Page/Python"));
const Builder = lazy(() => import("./Page/Builder"));
const Builder3D = lazy(() => import("./Page/Builder3D"));
const Tutorial = lazy(() => import("./Page/Tutorial"));
const About = lazy(() => import("./Page/About"));
const Game = lazy(() => import("./Page/Game"));
// const GameMore = lazy(() => import("./Page/GameViewMore"));
const EditorRecommand = lazy(() => import("./Page/EditorRecommand"));
const Social = lazy(() => import("./Page/Social"));
const SocialWrite = lazy(() => import("./Page/Social/ArticleWrite"));
const Event = lazy(() => import("./Page/Event"));
const EventDetail = lazy(() => import("./Page/Event/EventDetail"));
const Support = lazy(() => import("./Page/Support"));
const Mypage = lazy(() => import("./Page/Mypage"));
// const Subscribe = lazy(() => import("./Page/Mypage/Components/Subscribe"));
// const Userpage = lazy(() => import("./Page/Userpage"));
const History = lazy(() => import("./Page/History"));
const IconSetting = lazy(() => import("./Page/Mypage/Components/IconSetting"));
const Notification = lazy(() =>
  import("./Common/Component/Layout/Notification")
);
const WizAppMode = lazy(() => import("./Common/Component/WizAppMode"));
const GamePlayer = lazy(() => import("./Page/GamePlayer"));
const OCP = lazy(() => import("./Page/OCP"));
const OCPSub = lazy(() => import("./Page/OCP/Subpage"));
const SSAFY = lazy(() => import("./Page/SSAFY"));
const JJ = lazy(() => import("./Page/JJ"));
const OCP2 = lazy(() => import("./Page/OCP2"));
const OCP2Event = lazy(() => import("./Page/Event/OCP2"));
const OCP2EventChallenge = lazy(() => import("./Page/Event/OCP2/ChallengeEnd"));
const OCP2Sub = lazy(() => import("./Page/OCP2/Subpage"));
const Payment = lazy(() => import("./Page/Payment"));
const PaymentResult = lazy(() => import("./Page/PaymentResult"));
const News = lazy(() => import("./Page/News"));
const NewsDetail = lazy(() => import("./Page/NewsDetail"));
const CourseDetail = lazy(() => import("./Page/CourseDetail"));
const Courses = lazy(() => import("./Page/Courses"));
const LMS = lazy(() => import("./Page/LMS"));
const Ranking = lazy(() => import("./Page/Ranking"));
const DreamEditor = lazy(() => import("./Page/DreamEditor"));

const SplashView = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#202531" }}
    />
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({
      mirror: true,
    });
    AOS.refresh();
  }, []);

  const token = localStorage.getItem("wizToken");
  const lang = localStorage.getItem("lang");
  return (
    <Router>
      <Suspense fallback={<SplashView />}>
        <div className={`${lang}`} style={{ backgroundColor: "#282c36" }} lang={lang}>
          {token ?
            <Route
              exact
              path="/"
              render={() => <HandleQueryString Component={Learn} />}
            />
            :
            <Route
              exact
              path="/"
              render={() => <HandleQueryString Component={Intro} />}
            />
          }

          <Route exact path="/tutorial" component={Tutorial} />
          <Route
            exact
            path={[
              "/builder",
              "/builder/:pId",
              "/builder_edit/:pId",
              "/builder_readonly/:pId",
              "/qna_readonly/:questionId",
              "/builder/:pId/:templateId",
              "/videoclass",
              "/ocp/:grade/:step",
              "/ocp2/:grade/:step",
              "/ocp2js/:grade/:step",
              "/sef/:grade/:step",
              "/tutorial/:level",
              "/recordPlayer/:reservationId",
              "/ocp2/block/:grade/:step",
              "/ocp2/js/:type/:grade/:step",
              "/dreamclass/:id",
              "/dreamclass/:id/:email"
            ]}
            render={() => <HandleQueryString Component={Builder} />}
          />
          <Route
            exact
            path={[
              "/builder3d",
              "/builder3d/:pId",
              "/builder3d/:pId/:templateId"
            ]}
            component={Builder3D}
          />
          <Route exact path="/dreamEditor" component={DreamEditor} />
          {/* Editor Recommend Game */}
          <Route
            exact
            path="/editorRecommend"
            render={() => <HandleQueryString Component={EditorRecommand} />}
          />
          {/* About */}
          <Route
            exact
            path="/about"
            render={() => <HandleQueryString Component={About} />}
          />
          {/* intro */}
          <Route
            exact
            path="/intro"
            render={() => <HandleQueryString Component={Intro} />}
          />
          {/* Learn */}
          <Route
            exact
            path="/learn"
            render={() => <HandleQueryString Component={Learn} />}
          />
          {/* game */}
          <Route
            exact
            path="/game"
            render={() => <HandleQueryString Component={Game} />}
          />
          <Route
            path={["/wizapp/:pId", "/liveTest/:pId"]}
            component={GamePlayer}
          />
          <Route
            exact
            path={["/wizapps/:mode", "/wizapps/:mode/:offset"]}
            render={() => <HandleQueryString Component={WizAppMode} />}
          />
          <Route exact path="/detail/:pId">
            <Redirect
              to={`/game?pId=${window.location.pathname.split("/")[2]}`}
            />
          </Route>
          <Route
            exact
            path="/game/:type"
            render={() => <HandleQueryString Component={Game} />}
          />
          {/* mypage & userpage */}
          <Route
            exact
            path="/mypage"
            render={() => <HandleQueryString Component={Mypage} />}
          />
          {/* <Route
            exact
            path={["/mypage/:mode", "/userpage/:id/:mode"]}
            render={() => <HandleQueryString Component={Subscribe} />}
          /> */}
          <Route
            exact
            path="/userpage/:id"
            render={() => <HandleQueryString Component={Mypage} />}
          />
          <Route exact path="/point" component={History} />
          <Route exact path="/iconsetting" component={IconSetting} />
          <Route
            path="/notification"
            render={() => <HandleQueryString Component={Notification} />}
          />
          {/* social */}
          <Route
            exact
            path={["/social", "/social/:category"]}
            render={() => <HandleQueryString Component={Social} />}
          />
          <Route
            exact
            path={["/socialwrite/", "/socialwrite/:id"]}
            component={SocialWrite}
          />
          {/* codingparty */}
          {/* <Route exact path="/codingparty" component={OCP} />
        <Route exact path="/codingparty/:grade" component={OCPSub} /> */}
          {/* account setting */}
          <Route exact path="/settings" component={Event} />

          {/* event */}
          <Route exact path="/event" component={Event} />
          <Route exact path="/event/:id" component={EventDetail} />
          {/* etc */}
          <Route path="/support/:page" component={Support} />
          <Route exact path="/learn/:grade" component={OCPSub} />
          <Route
            exact
            path="/ssafy"
            render={() => <HandleQueryString Component={SSAFY} />}
          />
          <Route exact path="/jj" component={JJ} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/payment/result" component={PaymentResult} />
          {/* codingparty season 1  */}
          <Route
            exact
            path="/codingparty1"
            render={() => <HandleQueryString Component={OCP} />}
          />
          {/* codingparty season 2  */}
          {/* <Route
            exact
            path="/codingparty"
            render={() => <HandleQueryString Component={Home} />}
          /> */}
          <Route
            exact
            path="/codingparty/:gameKey"
            render={() => <HandleQueryString Component={OCP2} />}
          />
          <Route
            exact
            path="/codingparty/:gametype/:grade"
            component={OCP2Sub}
          />
          <Route
            exact
            path="/event/codingparty/:type"
            render={() => <HandleQueryString Component={OCP2Event} />}
          />
          <Route
            exact
            path="/challenge"
            render={() => <HandleQueryString Component={OCP2EventChallenge} />}
          />

          <Route exact path="/news" component={News} />
          <Route exact path="/news/detail/:id" component={NewsDetail} />
          <Route
            exact
            path="/lms/mission"
            render={() => <LMS path={PAGE.MISSION} />}
          />
          <Route
            exact
            path="/lms/attendance"
            render={() => <LMS path={PAGE.ATTENDANCE} />}
          />
          <Route
            exact
            path="/lms/questions"
            render={() => <LMS path={PAGE.QNA} />}
          />
          <Route
            exact
            path="/lms/questions/new"
            render={() => <LMS path={PAGE.QNA_NEW} />}
          />
          <Route
            exact
            path="/lms/questions/update/:id"
            render={props => <LMS path={PAGE.QNA_UPDATE} item={props.location.state} />}
          />
          <Route
            exact
            path="/lms/questions/detail/:id"
            render={() => <LMS path={PAGE.QNA_BY_ID} />}
          />
          <Route
            exact
            path="/course/:id"
            render={() => <HandleQueryString Component={CourseDetail} />}
          />
          <Route exact path="/courses" component={Courses} />
          <Route exact path="/pythonPage/:myDreamProjectId" component={PythonPage} />
          <Route exact path="/ranking" component={Ranking} />
        </div>
        <ToastContainer />
        <SubscribeManager />
      </Suspense>
    </Router>
  );
};
export default App;

const HandleQueryString = withRouter(
  class HandleQueryString extends Component {
    render() {
      const { Component } = this.props;
      const parsed = QueryString.parse(window.location.search);
      return (
        <Fragment>
          <Component {...this.props} />
          {parsed.pId && <WizAppDetail pId={parsed.pId} />}
        </Fragment>
      );
    }
  }
);