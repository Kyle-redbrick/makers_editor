import { ActionType } from "../../Util/Constant";

export const setMainPopup = mainPopup => ({
  type: ActionType.SET_MAIN_POPUP,
  mainPopup
});

const initialState = {
  mainPopup: null
};

const popup = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_MAIN_POPUP:
      return { ...state, mainPopup: action.mainPopup };
    default:
      return state;
  }
};

export default popup;
