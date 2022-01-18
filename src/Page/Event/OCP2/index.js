import React from "react";
import { withRouter } from "react-router-dom";
import Challenge from "./Challenge";
import ChallengeEnd from "./ChallengeEnd";
import Signup from "./Signup";
import SignupEnd from "./SignupEnd";
import Review from "./Review";
import ReviewEnd from "./ReviewEnd";
import OnlineCamp from "./OnlineCamp";

export default withRouter(function(props) {
  switch (props.match.params.type) {
    case "challenge":
      return <Challenge />;
    case "challengeEnd":
      return <ChallengeEnd />;
    case "signup":
      return <Signup />;
    case "signupEnd":
      return <SignupEnd />;
    case "review":
      return <Review />;
    case "reviewEnd":
      return <ReviewEnd />;
    case "onlinecamp":
      return <OnlineCamp />;
    default:
      props.history.replace("/");
      break;
  }
});
