import { createStore, applyMiddleware } from "redux";
import Reducer from "./Reducer";
import { createLogger } from "redux-logger";
import webtrcMiddleware from "./Middleware/webrtcMiddleware";

const configure = () => {
  const isLive =
    window.location.pathname &&
    (window.location.pathname.startsWith("/live") ||
      window.location.pathname.startsWith("/wizlive"));
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    if (isLive) {
      return createStore(
        Reducer,
        applyMiddleware(createLogger(), webtrcMiddleware)
      );
    } else {
      return createStore(Reducer);
      // return createStore(
      //   Reducer,
      //   applyMiddleware(createLogger(), webtrcMiddleware)
      // );
    }
  } else {
    if (isLive) {
      return createStore(Reducer, applyMiddleware(webtrcMiddleware));
    } else {
      return createStore(Reducer);
    }
  }
};

export default configure();
