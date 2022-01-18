import React, { Component } from "react";
import View from "./View";

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // rnd
      x: document.body.clientWidth - 365,
      y: 500
    };
  }

  //for rnd
  rnd = {
    onDragStop: (e, d) => {
      this.setState({ x: d.x, y: d.y });
    }
  };

  render() {
    //for rnd
    const { log } = this.props;
    const { x, y } = this.state;
    const { onDragStop } = this.rnd;
    const rnd = { x, y, onDragStop };

    return <View rnd={rnd} log={log} />;
  }
}
