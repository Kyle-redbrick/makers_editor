import { ActionType } from "../../../../Common/Util/Constant";

// create actions
export const setIsAppModalOn = (toggle, modalType) => ({
  type: ActionType.SET_IS_APP_MODAL_ON,
  toggle,
  modalType
});

const initialState = {
  isAppModalOn: false,
  appModalType: null
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_IS_APP_MODAL_ON:
      return {
        ...state,
        isAppModalOn: action.toggle,
        appModalType: action.modalType
      };
    default:
      return state;
  }
};

export default modal;
