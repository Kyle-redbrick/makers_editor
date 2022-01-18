const ActionType = {
  GAME_EVENT_SET_LAST: "GAME_EVENT_SET_LAST"
};

export const setLastGameEvent = lastEvent => ({
  type: ActionType.GAME_EVENT_SET_LAST,
  lastEvent
});

const initialState = {
  lastEvent: null
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GAME_EVENT_SET_LAST:
      return {
        ...state,
        lastEvent: action.lastEvent
      };
    default:
      return state;
  }
};

export default game;
