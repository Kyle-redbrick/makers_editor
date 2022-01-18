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
import locale from "./locale";

import { IntlProvider, addLocaleData } from "react-intl";
import ReactGA from "react-ga";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

addLocaleData([...en, ...ko, ...zh]);

const getNavigatorLanguage = () => {
  let lang;
  lang = localStorage.getItem("wizLang");
  if (lang && ["ko", "en", "zh"].includes(lang)) return lang;

  var str;
  if (navigator.languages && navigator.languages.length) {
    str = navigator.languages[0];
  } else {
    str =
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      "en";
  }
  lang = str.replace(/-[A-Z]*/, "");
  if (!["ko", "en", "zh"].includes(lang)) {
    lang = "en";
  }
  // localStorage.setItem("wizLang", lang);
  // return lang;
  localStorage.setItem("wizLang", "en");
  return "en";
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
