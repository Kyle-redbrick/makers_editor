const ActionType = {
  SET_PROTOTYPE_BLOCKS: "SET_PROTOTYPE_BLOCKS",
  SET_PROTOTYPE_FILTER: "SET_PROTOTYPE_FILTER",
  SET_FOCUSED_BLOCK: "SET_FOCUSED_BLOCK",
  SET_CUSTOM_STRINGS: "SET_CUSTOM_STRINGS",
  SET_POPUP_CONSTANT_VALUE: "SET_POPUP_CONSTANT_VALUE",
  SET_POPUP_CONSTANT_OPEN: "SET_POPUP_CONSTANT_OPEN"
};

export const setPrototypeBlocks = prototypeBlocks => ({
  type: ActionType.SET_PROTOTYPE_BLOCKS,
  prototypeBlocks
});

export const setPrototypeFilter = prototypeFilter => ({
  type: ActionType.SET_PROTOTYPE_FILTER,
  prototypeFilter
  // prototypeFilter : {
  //   sprite: ["screen"],
  //   action: ["onFrame"],
  //   constant: ["direction", "number", "string"]
  // }
});

export const setFocusedBlockId = focusedBlockId => ({
  type: ActionType.SET_FOCUSED_BLOCK,
  focusedBlockId
});

export const setCustomStrings = customStrings => ({
  type: ActionType.SET_CUSTOM_STRINGS,
  customStrings
});

export const setPopupConstantValue = value => ({
  type: ActionType.SET_POPUP_CONSTANT_VALUE,
  value
});

export const setPopupConstantOpen = open => ({
  type: ActionType.SET_POPUP_CONSTANT_OPEN,
  open
});

const initialState = {
  prototypeBlocks: undefined,
  prototypeFilter: undefined,
  focusedBlockId: undefined,
  customStrings: [],
  popupConstantValue: undefined,
  popupConstantOpen: false
};

const block = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_PROTOTYPE_BLOCKS:
      return { ...state, prototypeBlocks: action.prototypeBlocks };
    case ActionType.SET_PROTOTYPE_FILTER:
      return { ...state, prototypeFilter: action.prototypeFilter };
    case ActionType.SET_FOCUSED_BLOCK:
      return { ...state, focusedBlockId: action.focusedBlockId };
    case ActionType.SET_CUSTOM_STRINGS:
      return {
        ...state,
        customStrings: action.customStrings || []
      };
    case ActionType.SET_POPUP_CONSTANT_VALUE:
      return { ...state, popupConstantValue: action.value };
    case ActionType.SET_POPUP_CONSTANT_OPEN:
      return { ...state, popupConstantOpen: action.open };
    default:
      return state;
  }
};

export default block;
