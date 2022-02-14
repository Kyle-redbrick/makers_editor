import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./Common/Extension";
import "./index.scss";
import App from "./App";

import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import zh from "react-intl/locale-data/zh";
import ja from "react-intl/locale-data/ja";

import locale from "./locale";

import { IntlProvider, addLocaleData } from "react-intl";
import ReactGA from "react-ga";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

addLocaleData([...en, ...ko, ...zh, ...ja]);

const getNavigatorLanguage = () => {

  let lang;
  switch (window.location.hostname) {
    case "astroboy-dev.wizclass.com":
      lang = "ja"
      break;
    case "astroboy-dev-en.wizclass.com":
      lang = "en"
      break;
    default:
      lang = "en"
      break;
  }

  localStorage.setItem("lang", lang);
  return lang;
};

const defaultLang = getNavigatorLanguage();

//initialize GA
// ReactGA.initialize("UA-132407065-3");
ReactGA.initialize("UA-168395916-1");

ReactDOM.render(
  <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
