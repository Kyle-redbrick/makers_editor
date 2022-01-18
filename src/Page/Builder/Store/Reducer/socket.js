import { ActionType } from "../../../../Common/Util/Constant";

// create actions
export const setInstantRunURL = url => ({
  type: ActionType.SET_INSTANTRUN_URL,
  url: url
});

export const setRequestImage = requestImage => ({
  type: ActionType.SET_REQUEST_IMAGE,
  requestImage: requestImage
});

export const setResponseImage = responseImage => ({
  type: ActionType.SET_RESPONSE_IMAGE,
  responseImage: responseImage
});

const initialState = {
  url: undefined,
  requestImage: false,
  responseImage: undefined
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_INSTANTRUN_URL:
      return {
        ...state,
        url: action.url
      };
    case ActionType.SET_REQUEST_IMAGE:
      return {
        ...state,
        requestImage: action.requestImage
      };
    case ActionType.SET_RESPONSE_IMAGE:
      return {
        ...state,
        responseImage: action.responseImage
      };
    default:
      return state;
  }
};

export default modal;
