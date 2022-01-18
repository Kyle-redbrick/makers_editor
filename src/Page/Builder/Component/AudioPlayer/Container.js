import React, { Component } from "react";
import { connect } from "react-redux";
import * as interactionActions from "../../Store/Reducer/interaction";

class Container extends Component {
  render() {
    const { jukebox, stopSound } = this.props;
    if (jukebox.isPlaying) {
      return (
        <div style={{ display: "none" }}>
          <audio
            onEnded={() => {
              if (jukebox.isPlaying) {
                stopSound();
              }
            }}
            preload="none"
            src={jukebox.path}
            autoPlay
          />
        </div>
      );
    } else {
      return <div style={{ display: "none" }} />;
    }
  }
}

export default connect(
  state => ({ jukebox: state.interaction.jukebox }),
  { stopSound: interactionActions.stopSound }
)(Container);
