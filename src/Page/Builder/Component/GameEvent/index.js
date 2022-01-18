import React, { Component } from "react";
import { connect } from "react-redux";
import * as gameActions from "../../Store/Reducer/game";
// import { URL } from "../../../../Common/Util/Constant";

class GameEvent extends Component {
  componentDidMount() {
    window.addEventListener("message", this.onGameEvent, false);
  }
  componentWillUnmount() {
    window.removeEventListener("message", this.onGameEvent);
  }

  onGameEvent = e => {
    // if (e.origin === URL.ORIGIN) {
    if (e.data.type === "gameEvent") {
      const gameEvent = e.data.event;
      this.props.setLastGameEvent(gameEvent);
    }
    // }
  };
  render() {
    return <div className="gameEventListener" hidden />;
  }
}

export default connect(
  undefined,
  {
    setLastGameEvent: gameActions.setLastGameEvent
  }
)(GameEvent);
