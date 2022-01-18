import { ACTION } from "../../Util/Constant";

export const showContextMenu = (menus, position) => ({
  type: ACTION.SHOW_CONTEXTMENU,
  payload: { menus, position }
});

export const hideContextMenu = () => ({
  type: ACTION.HIDE_CONTEXTMENU
});

const initialState = { menus: [], position: { x: 0, y: 0 } };

const interaction = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.SHOW_CONTEXTMENU:
      return {
        ...state,
        menus: payload.menus,
        position: payload.position
      };
    case ACTION.HIDE_CONTEXTMENU:
      return { ...state, ...initialState };
    default:
      return state;
  }
};

export default interaction;
