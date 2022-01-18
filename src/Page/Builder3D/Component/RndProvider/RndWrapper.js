import React, { Component } from "react";
import { Rnd } from "react-rnd";

export default class RndWrapper extends Component {
  constructor(props) {
    super(props);
    const { defaultX, defaultY, defaultWidth, defaultHeight } = this.props;
    this.state = {
      x: defaultX || 0,
      y: defaultY || 0,
      width: defaultWidth || 0,
      height: defaultHeight || 0
    };
  }
  componentDidMount() {
    this.loadCurrentRndPreference();
    window.addEventListener("resize", this.onWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  loadCurrentRndPreference() {
    const { rndId } = this.props;
    const rndPref = this.loadRndPreference();
    const currentRndPref = rndPref[rndId];
    if (currentRndPref) {
      const validRndPref = this.convertToValidRndPrefIfNeed(currentRndPref);
      const { x, y, width, height } = validRndPref;
      this.setState({ x, y, width, height });
    } else {
      this.saveCurrentRndPreference();
    }
  }
  convertToValidRndPrefIfNeed(rndPreference) {
    let { x, y, width, height } = rndPreference;

    const rndProvider = document.getElementById("rndProvider");
    const providerWidth = rndProvider.offsetWidth;
    const providerHeight = rndProvider.offsetHeight;

    const minX = 0;
    const minY = 0;
    const maxX = providerWidth - width;
    const maxY = providerHeight - height;
    if (x > maxX) x = maxX;
    if (x < minX) x = minX;
    if (y > maxY) y = maxY;
    if (y < minY) y = minY;

    const maxWidth = providerWidth;
    const maxHeight = providerHeight;
    if (width > maxWidth) width = maxWidth;
    if (height > maxHeight) height = maxHeight;

    return { x, y, width, height };
  }
  saveCurrentRndPreference() {
    const { rndId } = this.props;
    const { x, y, width, height } = this.state;
    const rndPreference = this.loadRndPreference();
    rndPreference[rndId] = { x, y, width, height };
    this.saveRndPreference(rndPreference);
  }
  loadRndPreference() {
    let rndPreference = localStorage.getItem("rndPreference");
    if (rndPreference) {
      try {
        return JSON.parse(rndPreference);
      } catch {
        this.saveRndPreference({});
        return {};
      }
    } else {
      this.saveRndPreference({});
      return {};
    }
  }
  saveRndPreference(rndPreference) {
    localStorage.setItem("rndPreference", JSON.stringify(rndPreference));
  }

  onResize = (e, direction, ref, delta, position) => {
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position
    });
  };
  onWindowResize = () => {
    const { x, y, width, height } = this.state;
    const currentRndPref = { x, y, width, height };
    const validRndPref = this.convertToValidRndPrefIfNeed(currentRndPref);
    this.setState({ ...validRndPref });
  };
  onDragStop = (e, d) => {
    this.setState({ x: d.x, y: d.y }, () => {
      this.saveCurrentRndPreference();
    });
  };

  render() {
    const { x, y, width, height } = this.state;
    const {
      rndId,
      rndOrder,
      bringRndToTop,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      lockAspectRatio,
      lockAspectRatioExtraWidth,
      lockAspectRatioExtraHeight,
      enableResizing,
      children
    } = this.props;
    return (
      <Rnd
        id={rndId}
        style={{ zIndex: rndOrder }}
        position={{ x, y }}
        size={{ width, height }}
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        lockAspectRatio={lockAspectRatio}
        lockAspectRatioExtraWidth={lockAspectRatioExtraWidth}
        lockAspectRatioExtraHeight={lockAspectRatioExtraHeight}
        enableResizing={enableResizing}
        onResize={this.onResize}
        onDragStop={this.onDragStop}
        onMouseDown={bringRndToTop}
        dragHandleClassName="rndDragHandler"
        resizeHandleWrapperClass="rndResizeHandler"
        bounds=".rndProvider"
      >
        {children}
      </Rnd>
    );
  }
}
