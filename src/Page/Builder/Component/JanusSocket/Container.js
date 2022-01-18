import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { URL } from "../../../../Common/Util/Constant";
import stringify from "json-stringify-safe";

class Container extends Component {
  socketTimer = undefined;
  lastSentState = undefined;
  SOCKET_INTERVAL = 2000;
  EVENT_CONNECT = "connect";
  EVENT_STATE = "state";

  componentDidMount() {
    this.setSocket();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  setSocket = () => {
    const options = {}; //options reference : https://socket.io/docs/client-api/#new-Manager-url-options
    this.socket = io(URL.JANUS_SOCKET_SERVER, options);
    this.socket.on(this.EVENT_CONNECT, () => {});
    this.socketTimer = setInterval(() => {
      const { reservationId, scene, interaction, preview } = this.props;
      const data = stringify({
        scene,
        interaction,
        preview: { ...preview, isPlaying: false }
      });
      if (this.lastSentState !== data) {
        this.lastSentState = data;
        this.socket.emit(this.EVENT_STATE, {
          reservationId,
          scene,
          interaction,
          preview: { ...preview, isPlaying: false }
        });
      } else {
      }
    }, this.SOCKET_INTERVAL);
  };

  render() {
    return <div style={{ display: "none" }} />;
  }
}

export default connect(
  state => {
    return {
      scene: state.scene,
      interaction: { ...state.interaction, addSoundsTimeStamp: undefined },
      preview: state.preview
    };
  },
  {}
)(Container);
