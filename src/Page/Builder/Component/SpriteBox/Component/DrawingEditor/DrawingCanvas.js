import { fabric } from "fabric";

export default class DrawingCanvas {
  selectedColor = "rgba(0,0,0,1)";
  selectedTool = "pen";
  brushWidth = 10;
  canvas = undefined;
  history = [];
  historyIndex = -1;
  historyStatusChanged = undefined;
  onChanged = undefined;

  constructor(canvasId, historyStatusChanged, onChanged) {
    this.historyStatusChanged = historyStatusChanged;
    this.onChanged = onChanged;
    this.initFabric(canvasId);
  }

  initFabric(canvasId) {
    this.canvas = new fabric.Canvas(canvasId);
    this.canvas.isDrawingMode = true;
    this.canvas.selection = false;
    this.canvas.preserveObjectStacking = true;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    this.canvas.freeDrawingBrush.width = this.brushWidth;
    this.canvas.on("mouse:down", this.onMouseDown);
    this.canvas.on("mouse:up", this.onMouseUp);
    this.canvas.on("mouse:move", this.onMouseMove);
    this.canvas.on("object:modified", this.onUpdated);
    this.canvas.on("text:changed", this.onTextChanged);
    this.onUpdated();
  }

  onUpdated = () => {
    const json = this.canvas.toJSON();
    while (this.history.length !== this.historyIndex + 1) {
      this.history.pop();
    }
    this.history.push(json);
    this.historyIndex++;
    if (this.historyStatusChanged) {
      this.historyStatusChanged(this.canUndo(), this.canRedo());
    }

    if (this.onChanged) {
      this.toBlob(this.onChanged);
    }
  };

  onTextChanged = () => {
    if (this.onChanged) {
      this.toBlob(this.onChanged);
    }
  };

  setCanvasSize = (width, height) => {
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
  };

  setColor = color => {
    this.selectedColor = color;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    if (this.getActiveObject()) {
      if (this.getActiveObject().stroke) {
        this.getActiveObject().set({ stroke: color });
      } else {
        this.getActiveObject().set({ fill: color });
      }
      this.canvas.renderAll();
      this.onUpdated();
    }
  };

  setBrushWidth = width => {
    this.canvas.freeDrawingBrush.width = width;
  };

  clearAll = () => {
    this.canvas.clear();
    this.onUpdated();
  };

  getCoords = obj => {
    const { tl, tr, bl, br } = obj.oCoords;
    return { tl, tr, bl, br };
  };

  toBlob = callback => {
    const objs = this.canvas.getObjects();
    if (objs.length < 1) {
      return undefined;
    }

    let coords = this.getCoords(objs[0]);

    for (let i = 1; i < objs.length; i++) {
      const { tl, tr, br, bl } = this.getCoords(objs[i]);
      if (coords.tl.x > tl.x) {
        coords.tl.x = tl.x;
      }
      if (coords.tl.y > tl.y) {
        coords.tl.y = tl.y;
      }
      if (coords.tr.x < tr.x) {
        coords.tr.x = tr.x;
      }
      if (coords.tr.y > tr.y) {
        coords.tr.y = tr.y;
      }
      if (coords.bl.x > bl.x) {
        coords.bl.x = bl.x;
      }
      if (coords.bl.y < bl.y) {
        coords.bl.y = bl.y;
      }
      if (coords.br.x < br.x) {
        coords.br.x = br.x;
      }
      if (coords.br.y < br.y) {
        coords.br.y = br.y;
      }
    }

    //cropping
    // const cw = this.canvas.width;
    // const ch = this.canvas.height;
    // coords.tl.x = coords.tl.x < 0 ? 0 : coords.tl.x;
    // coords.tl.y = coords.tl.y < 0 ? 0 : coords.tl.y;
    // coords.tr.x = coords.tr.x > cw ? cw : coords.tr.x;
    // coords.tr.y = coords.tr.y < 0 ? 0 : coords.tr.y;
    // coords.bl.x = coords.bl.x < 0 ? 0 : coords.bl.x;
    // coords.bl.y = coords.bl.y > ch ? ch : coords.bl.y;
    // coords.br.x = coords.br.x > cw ? cw : coords.br.x;
    // coords.br.y = coords.br.y > ch ? ch : coords.br.y;

    let width = coords.tr.x - coords.tl.x;
    let height = coords.bl.y - coords.tl.y;
    let startX = coords.tl.x;
    let startY = coords.tl.y;

    let screenshotData = this.canvas.toDataURL({
      format: "png",
      left: startX,
      top: startY,
      width: width,
      height: height
    });

    let byteString;
    if (screenshotData.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(screenshotData.split(",")[1]);
    } else {
      byteString = unescape(screenshotData.split(",")[1]);
    }
    // separate out the mime component
    const mimeString = screenshotData
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);
    callback(blobUrl, blob);
  };

  addImageFromURL = url => {
    fabric.Image.fromURL(
      url,
      img => {
        this.canvas.add(img);
        this.canvas.renderAll();
        this.selectTool("select");
        this.onUpdated();
      },
      { crossOrigin: "anonymous" }
    );
  };

  onMouseDown = e => {
    if (
      this.selectedTool === "rectangle" ||
      this.selectedTool === "circle" ||
      this.selectedTool === "triangle" ||
      this.selectedTool === "line"
    ) {
      this.canvas.isMouseDown = true;
      const pointer = this.canvas.getPointer(e.e);
      this.canvas.mousDownX = pointer.x;
      this.canvas.mousDownY = pointer.y;
      let className;
      switch (this.selectedTool) {
        case "rectangle":
          className = "Rect";
          break;
        case "circle":
          className = "Ellipse";
          break;
        case "triangle":
          className = "Triangle";
          break;
        default:
          break;
      }
      let obj;
      if (this.selectedTool === "line") {
        const coords = [pointer.x, pointer.y, pointer.x, pointer.y];
        obj = new fabric.Line(coords, {
          originX: "left",
          originY: "top",
          selectable: false,
          stroke: this.selectedColor,
          strokeWidth: this.brushWidth,
          fill: this.selectedColor
        });
      } else {
        obj = new fabric[className]({
          left: this.canvas.mousDownX,
          top: this.canvas.mousDownY,
          originX: "left",
          originY: "top",
          width: 0,
          height: 0,
          selectable: false,
          fill: this.selectedColor
        });
      }

      this.canvas.add(obj);
      this.canvas.renderAll();
    } else if (this.selectedTool === "text") {
      const pointer = this.canvas.getPointer(e.e);
      var obj = new fabric.IText("", {
        left: pointer.x,
        top: pointer.y,
        originX: "left",
        originY: "top",
        fontFamily: "Arial",
        fontSize: 28,
        fontWeight: "normal",
        fontStyle: "normal",
        fill: this.selectedColor
      });
      this.canvas.add(obj);
      this.canvas.renderAll();
      obj.enterEditing();
      this.canvas.setActiveObject(obj);
      this.selectTool("select");
    }
  };

  onMouseUp = e => {
    if (
      this.selectedTool === "rectangle" ||
      this.selectedTool === "circle" ||
      this.selectedTool === "triangle" ||
      this.selectedTool === "line"
    ) {
      this.canvas.isMouseDown = false;
      const lastObj = this.canvas.getObjects()[
        this.canvas.getObjects().length - 1
      ];
      lastObj.setCoords();
      this.canvas.renderAll();
      this.onUpdated();
    } else if (
      this.selectedTool === "pen" ||
      this.selectedTool === "brush_circle" ||
      this.selectedTool === "brush_spray"
    ) {
      this.canvas.renderAll();
      this.onUpdated();
    }
  };

  onMouseMove = e => {
    if (
      this.selectedTool === "rectangle" ||
      this.selectedTool === "circle" ||
      this.selectedTool === "triangle" ||
      this.selectedTool === "line"
    ) {
      if (!this.canvas.isMouseDown) return;
      const obj = this.canvas.getObjects()[this.canvas.getObjects().length - 1];
      let pointer = this.canvas.getPointer(e.e);

      if (this.canvas.mousDownX > pointer.x) {
        obj.set({ left: Math.abs(pointer.x) });
      }
      if (this.canvas.mousDownY > pointer.y) {
        obj.set({ top: Math.abs(pointer.y) });
      }

      if (this.selectedTool === "circle") {
        obj.set({ rx: Math.abs(this.canvas.mousDownX - pointer.x) / 2 });
        obj.set({ ry: Math.abs(this.canvas.mousDownY - pointer.y) / 2 });
      } else if (this.selectedTool === "line") {
        obj.set({ x2: pointer.x, y2: pointer.y });
      } else {
        obj.set({ width: Math.abs(this.canvas.mousDownX - pointer.x) });
        obj.set({ height: Math.abs(this.canvas.mousDownY - pointer.y) });
      }

      this.canvas.renderAll();
    }
  };

  getActiveObject = () => {
    return this.canvas.getActiveObject();
  };

  getObjects = () => {
    return this.canvas.getObjects();
  };

  canUndo = () => {
    return this.historyIndex > 0;
  };

  canRedo = () => {
    return this.historyIndex < this.history.length - 1;
  };

  undo = () => {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const json = this.history[this.historyIndex];
      this.canvas.loadFromJSON(json);
      this.canvas.renderAll();
      if (this.historyStatusChanged) {
        this.historyStatusChanged(this.canUndo(), this.canRedo());
      }
      if (this.onChanged) {
        this.toBlob(this.onChanged);
      }
    }
  };

  redo = () => {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const json = this.history[this.historyIndex];
      this.canvas.loadFromJSON(json);
      this.canvas.renderAll();
      if (this.historyStatusChanged) {
        this.historyStatusChanged(this.canUndo(), this.canRedo());
      }
      if (this.onChanged) {
        this.toBlob(this.onChanged);
      }
    }
  };

  delete = () => {
    if (this.getActiveObject()) {
      this.canvas.remove(this.getActiveObject());
      this.canvas.renderAll();
      this.onUpdated();
    }
  };

  forward = () => {
    if (this.getActiveObject()) {
      this.canvas.bringForward(this.getActiveObject());
      this.onUpdated();
    }
  };

  backward = () => {
    if (this.getActiveObject()) {
      this.canvas.sendBackwards(this.getActiveObject());
      this.onUpdated();
    }
  };

  front = () => {
    const obj = this.getActiveObject();
    if (obj) {
      while (this.getObjects().indexOf(obj) < this.getObjects().length - 1) {
        this.forward();
      }
      this.onUpdated();
    }
  };

  back = () => {
    const obj = this.getActiveObject();
    if (obj) {
      while (this.getObjects().indexOf(obj) > 0) {
        this.backward();
      }
      this.onUpdated();
    }
  };

  paste = () => {
    if (this.getActiveObject()) {
      this.getActiveObject().clone(cloned => {
        this.canvas.discardActiveObject();
        cloned.set({
          left: cloned.left + 10,
          top: cloned.top + 10
        });
        this.canvas.add(cloned);
        this.canvas.setActiveObject(cloned);
        this.onUpdated();
      });
    }
  };

  setSelectionMode = enabled => {
    const objs = this.canvas.getObjects();
    for (let i = 0; i < objs.length; i++) {
      objs[i].selectable = enabled;
    }
  };

  selectTool = tool => {
    this.canvas.isDrawingMode = false;
    this.setSelectionMode(false);
    switch (tool) {
      case "select":
        this.setSelectionMode(true);
        break;
      case "pen":
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric["PencilBrush"](this.canvas);
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.canvas.freeDrawingBrush.width = this.brushWidth;
        break;
      case "brush_circle":
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric["CircleBrush"](this.canvas);
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.canvas.freeDrawingBrush.width = this.brushWidth;
        break;
      case "brush_spray":
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric["SprayBrush"](this.canvas);
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.canvas.freeDrawingBrush.width = this.brushWidth;
        break;
      case "rectangle":
      case "triangle":
      case "circle":
      case "line":
      case "text":
        break;
      default:
        break;
    }

    this.selectedTool = tool;
  };
}
