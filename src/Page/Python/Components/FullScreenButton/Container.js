import React, { Component } from "react";
import View from "./View";
import { playButtonEffect } from "../../Util/PlaySound";

export default class Container extends Component {
  handleClickFullScreen = event => {
    playButtonEffect();
    
    let element = document.body;

    if (event instanceof HTMLElement) {
      element = event;
    }

    let isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function() {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function() {
        return false;
      };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  render() {
    const { handleClickFullScreen } = this;
    return (
      <View handleClickFullScreen={handleClickFullScreen} />
    );
  }
}