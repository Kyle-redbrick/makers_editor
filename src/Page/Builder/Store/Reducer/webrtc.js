import { ActionType } from "../../../../Common/Util/Constant";

const {
  WEBRTC_SET_PROJECT,
  ADD_DRAWING,
  SET_DRAWING_BOARD,
  SET_EDITOR_RANGE,
  SET_LOG
} = ActionType;

export const webrtcSetProject = project => ({
  type: WEBRTC_SET_PROJECT,
  project
});

export const addDrawing = drawing => ({
  type: ADD_DRAWING,
  drawing: drawing
});

export const setDrawingBoard = isOn => ({
  type: SET_DRAWING_BOARD,
  isOn: isOn
});

export const setEditorRange = editorRange => ({
  type: SET_EDITOR_RANGE,
  editorRange: editorRange
});

export const setLog = log => ({
  type: SET_LOG,
  log: log
});

const initialState = {
  project: {},
  drawing: [],
  isDrawingBoardOn: false,
  editorRange: undefined,
  log: {
    api: false,
    animation: false,
    sound: false,
    soundBox: false,
    chatbot: false,
    game: false,
    spriteBox: false,
    spriteCatagory: "",
    selectedSprite: "신규",
    gameFullScreen: false,
    publish: false,
    property: false,
    selectedApi: "ID_ALL"
  }
};

const webrtc = (state = initialState, action) => {
  switch (action.type) {
    case WEBRTC_SET_PROJECT:
      return {
        ...state,
        project: action.project
      };
    case ADD_DRAWING:
      return {
        ...state,
        drawing: [...state.drawing, action.drawing]
      };

    case SET_DRAWING_BOARD:
      return {
        ...state,
        isDrawingBoardOn: action.isOn
      };
    case SET_EDITOR_RANGE:
      return {
        ...state,
        editorRange: action.editorRange
      };
    case SET_LOG:
      return {
        ...state,
        log: { ...state.log, ...action.log }
      };
    default:
      return state;
  }
};

export default webrtc;
