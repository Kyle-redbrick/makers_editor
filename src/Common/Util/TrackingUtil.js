// import ReactGA from "react-ga";
// import * as request from "./HTTPRequest";

// const sendStatistics = params => {
//   // request.sendToStatistics(params).catch(err => console.error(err));
// };

// const checkHost = () => {
//   return window.location.hostname === "dream.wizlab.net";
// };

export const sendPageEvent = (data, email) => {
  // if (!checkHost()) return;
  // try {
  //   const params = { data, email };
  //   ReactGA.pageview(data);
  //   sendStatistics(params);
  //   kakaoPixelPageView();
  // } catch (e) {}
};

export const sendGTMEvent = (event, category, action) => {
  // if (!checkHost()) return;
  // window.dataLayer = window.dataLayer || [];
  // window.dataLayer.push({
  //   event,
  //   eventCategory: category,
  //   eventAction: action
  // });
};

/**
 *
 * @param {string} category (required) The main category of Event
 * @param {string} action (required) The actions of each category
 * @param {string} label (optional) The labels of each action
 * @param {number} value (optional) The numeric value of Event ex) video play time or worth event
 */
export const sendGAEvent = params => {
  // if (!checkHost()) return;
  // const { category, action, /*label,*/ value } = params;
  // if (!category || !action) {
  //   return;
  // }
  // if (value && typeof value !== "number") {
  //   return;
  // }
  // try {
  //   ReactGA.event(params);
  // } catch (e) {}
};

//kakao
export const kakaoPixelPageView = type => {
  // if (window.kakaoPixel) {
  //   const kakaoPixel = window.kakaoPixel("9175849215000034364");
  //   kakaoPixel.pageView();
  //   if (!type) {
  //     return;
  //   } else if (type === "signUp") {
  //     kakaoPixel.signUp();
  //   } else {
  //     kakaoPixel.completeRegistration();
  //   }
  // } else {
  //   console.error("Failed to load kakaoPixel");
  // }
};
// export const kakaoPixelEvent = type => {
//   if (!checkHost()) return;

//   kakaoPixelPageView();
//   if (window.kakaoPixel) {
//     if (type === "signup") {
//       window.kakaoPixel("9175849215000034364").completeRegistration();
//     } else {
//       window.kakaoPixel("9175849215000034364").viewCart();
//     }
//   }
// };
