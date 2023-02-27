import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./Common/Extension";
import "./index.scss";
import App from "./App";
import locale from "./locale";
import { IntlProvider } from "react-intl";
import ReactGA from "react-ga";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const getNavigatorLanguage = () => {
  let lang;
  switch (window.location.hostname) {
    case "astroboy-dev-jp.wizclass.com":
    case "jp.astro-coding-go.com":
      lang = "ja";
      break;
    case "astroboy-dev-en.wizclass.com":
    case "en.astro-coding-go.com":
      lang = "en";
      break;
    default:
      lang = "ja";
      break;
  }

  localStorage.setItem("lang", lang);
  return lang;
};

const defaultLang = getNavigatorLanguage();

//initialize GA
ReactGA.initialize("UA-168395916-1");

ReactDOM.render(
  <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
