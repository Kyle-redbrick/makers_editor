import React, { Component } from "react";
import { Rnd } from "react-rnd";

export default class RndWrapper extends Component {
  constructor(props) {
    super(props);
    const frame = JSON.parse(localStorage.getItem(props.id + "Frame"));
    if (frame) {
      if (props.screenMode) {
        const screenModeChanged = props.screenMode !== frame.screenMode;
        this.state = {
          ...frame,
          width: screenModeChanged ? props.defaultWidth : frame.width,
          height: screenModeChanged ? props.defaultHeight : frame.height
        };
      } else {
        this.state = { ...frame };
      }
    } else {
      this.state = {
        width: props.defaultWidth,
        height: props.defaultHeight,
        x: props.defaultX,
        y: props.defaultY
      };
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.defaultWidth !== this.props.defaultWidth) {
      this.setState({ width: this.props.defaultWidth });
    }
    if (prevProps.defaultHeight !== this.props.defaultHeight) {
      this.setState({ height: this.props.defaultHeight });
    }
    this.saveFrame();
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeView);
    this.resizeView();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeView);
  }

  saveFrame = () => {
    const { id, screenMode } = this.props;
    if (id) {
      const { width, height, x, y } = this.state;
      const frame = { width, height, x, y, screenMode };
      localStorage.setItem(id + "Frame", JSON.stringify(frame));
    }
  };
  resizeView = () => {
    const container = document.getElementsByClassName("Content")[0];
    const {
      x,
      y,
      width = this.rnd.resizable.size.width,
      height = this.rnd.resizable.size.height
    } = this.state;
    let newX = x;
    let newY = y;
    if (x + width > container.offsetWidth) {
      newX = container.offsetWidth - width;
      if (newX < 0) newX = 0;
    }
    if (y + height > container.offsetHeight) {
      newY = container.offsetHeight - height;
      if (newY < 0) newY = 0;
    }
    this.setState({ x: newX, y: newY });
  };

  setRndRef = ref => {
    this.rnd = ref;
  };
  onDragStop = (e, d) => {
    this.setState({ x: d.x, y: d.y });
  };
  onResize = (e, direction, ref, delta, position) => {
    this.setState(
      prev => ({
        width: ref.offsetWidth,
        height: ref.offsetHeight,
        ...position
      }),
      () => {
        const { onResize } = this.props;
        if (onResize) onResize(e);
      }
    );
  };

  render() {
    const { width, height, x, y } = this.state;
    const {
      children,
      style,
      minWidth,
      minHeight,
      lockAspectRatio,
      lockAspectRatioExtraHeight,
      enableResizing
    } = this.props;
    return (
      <Rnd
        ref={this.setRndRef}
        size={{ width, height }}
        position={{ x, y }}
        style={style}
        minWidth={minWidth}
        minHeight={minHeight}
        lockAspectRatio={lockAspectRatio}
        lockAspectRatioExtraHeight={lockAspectRatioExtraHeight}
        enableResizing={enableResizing}
        onDragStop={this.onDragStop}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
        dragHandleClassName="handle"
        bounds=".Content"
      >
        {children}
      </Rnd>
    );
  }
}
