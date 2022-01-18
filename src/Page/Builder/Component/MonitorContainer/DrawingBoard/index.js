import React, { Component } from "react";
import { connect } from "react-redux";
import * as webrtcActions from "../../../Store/Reducer/webrtc";
import { fabric } from "fabric";

class DrawingBoard extends Component {
  presetColors = [
    "#20a1ec",
    "#ffd185",
    "#77d354",
    "#ffba5c",
    "#23d8af",
    "#f96063",
    "#916cc5",
    "#3e4852",
    "#969fa9",
    "#ffffff"
  ];

  componentDidMount() {
    this.initFabric();
  }

  initFabric() {
    this.canvas = new fabric.Canvas("drawCanvas");
    this.canvas.setWidth(1280);
    this.canvas.setHeight(720);
    this.canvas.setDimensions(
      { width: "100%", height: "100%" },
      { cssOnly: true }
    );
    this.canvas.selection = false;
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = "#FFFFFF";
    this.canvas.freeDrawingBrush.width = 3;

    this.canvas.on("mouse:up", this.onMouseUp);
  }

  onMouseUp = () => {
    const objects = this.canvas.getObjects();
    const object = objects[objects.length - 1];
    this.props.addDrawing(object.toObject());
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.webrtcDrawing.length !== this.canvas.getObjects().length) {
      const obj = nextProps.webrtcDrawing[nextProps.webrtcDrawing.length - 1];
      new fabric.Path.fromObject(obj, (path, callback) => {
        this.canvas.add(path);
      });
    }
    return true;
  }

  handleChangeColor = color => {
    this.canvas.freeDrawingBrush.color = color;
  };

  render() {
    return (
      <div className="DrawingBoard">
        <canvas id="drawCanvas" />
        <ul className="CanvasContainer__colorlist">
          {this.presetColors.map((color, index) => {
            return (
              <li
                key={index}
                onClick={e => {
                  this.handleChangeColor(color);
                }}
                style={{ backgroundColor: color }}
                className="CanvasContainer__colors"
              />
            );
          })}
        </ul>
        <p className="closeBtn" onClick={() => this.props.handleClose(false)} />
      </div>
    );
  }
}

export default connect(
  state => ({
    webrtcDrawing: state.webrtc.drawing
  }),
  { addDrawing: webrtcActions.addDrawing }
)(DrawingBoard);
