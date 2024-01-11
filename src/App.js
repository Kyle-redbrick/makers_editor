import React, { lazy, Suspense, Component, Fragment, useEffect } from "react";
import { withRouter, BrowserRouter as Router, Route } from "react-router-dom";
import QueryString from "query-string";
import { ToastContainer } from "react-toastify";

import WizAppDetail from "./Common/Component/WizAppDetail";
import { SubscribeManager } from "./Common/Util/Subscribe";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const lang = localStorage.getItem("lang");

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  return (
    <Router>
      <Suspense fallback={<SplashView />}>
        <div
          className={`${lang}`}
          style={{ backgroundColor: "#282c36" }}
          lang={lang}
        >
          <Route
            exact
            path="/"
            render={() => <HandleQueryString Component={DreamEditor} />}
          />
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
