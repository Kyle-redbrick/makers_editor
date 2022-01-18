import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import { URL } from "../../../../Common/Util/Constant";

function Container(props) {
  const EVENT_STATE = "state";
  const SOCKET_INTERVAL = 2000;

  const socket = useRef(null);
  let socketTimer = undefined;

  useEffect(() => {
    setSocket();

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (props.email) {
      socketTimer = setTimeout(() => {
        const { pId, game, interaction } = props;
        const state = JSON.stringify({
          game,
          interaction: { ...interaction, isPublished: undefined }
        });
        const data = { pId, state };
        if (socket.current && socket.current.connected) {
          socket.current.emit(EVENT_STATE, data);
        }
      }, SOCKET_INTERVAL);
    }

    return () => {
      if (socketTimer) {
        clearTimeout(socketTimer);
      }
    };
  }, [props]);

  const setSocket = () => {
    const options = {};
    socket.current = io(URL.SOCKET_SERVER, options);
  };

  return <div style={{ display: "none" }} />;
}

export default connect(state => {
  const { currentSceneId, currentGameObjectIds } = state.interaction;
  const currentObject = currentGameObjectIds[currentSceneId];
  return {
    currentSceneId,
    currentObject,
    pId: state.project.pId,
    game: state.game,
    interaction: {
      ...state.interaction
    },
    email: state.userinfo.email
  };
})(Container);
