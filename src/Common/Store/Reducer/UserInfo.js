import { ActionType } from "../../Util/Constant";

// create actions
export const updateUserInfo = userinfo => ({
  type: ActionType.UPDATE_USERINFO,
  payload: userinfo
});

const initialState = {};

const userinfo = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_USERINFO:
      if (!action.payload) {
        return {};
      } else {
        return {
          ...state,
          ...action.payload
        };
      }
    default:
      return state;
  }
};

export default userinfo;
