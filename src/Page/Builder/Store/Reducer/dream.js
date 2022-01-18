const ACTION = {
  DREAM_SET_MYPROJECT: "setMyDreamProject",
  DREAM_UPDATE_MYPROJECT: "updateMyDreamProject",
  DREAM_OPEN_MENU: "openDreamMenu",
  DREAM_CLOSE_MENU: "closeDreamMenu",
  DREAM_SET_MISSIONS: "setDreamMissions",
  DREAM_SET_CURRENT_MISSION_INDEX: "setCurrentDreamMissionIndex",
  DREAM_COMPLETE_CURRENT_MISSION: "completeCurrentDreamMission",
  DREAM_SET_IS_CONDITIONS_CLEAR: "setIsConditionsClear",
  DREAM_SET_IS_CODE_CONDITIONS_CLEAR: "setIsCodeConditionsClear",
};

export const setMyDreamProject = myProject => ({
  type: ACTION.DREAM_SET_MYPROJECT,
  payload: { myProject }
});

export const updateMyDreamProject = values => ({
  type: ACTION.DREAM_UPDATE_MYPROJECT,
  payload: { values }
});

export const openDreamMenu = () => ({
  type: ACTION.DREAM_OPEN_MENU
});

export const closeDreamMenu = () => ({
  type: ACTION.DREAM_CLOSE_MENU
});

export const setDreamMissions = missions => ({
  type: ACTION.DREAM_SET_MISSIONS,
  payload: { missions }
});

export const setCurrentDreamMissionIndex = index => ({
  type: ACTION.DREAM_SET_CURRENT_MISSION_INDEX,
  payload: { index }
});

export const completeCurrentDreamMission = () => ({
  type: ACTION.DREAM_COMPLETE_CURRENT_MISSION
});

export const setIsConditionsClear = isConditionsClear => ({
  type: ACTION.DREAM_SET_IS_CONDITIONS_CLEAR,
  payload: { isConditionsClear }
});

export const setIsCodeConditionsClear = isCodeConditionsClear => ({
  type: ACTION.DREAM_SET_IS_CODE_CONDITIONS_CLEAR,
  payload: { isCodeConditionsClear }
});

const initialState = {
  myProject: null,
  isMenuOpen: false,
  isReplaying: false,
  missions: [],
  currentMissionIndex: -1,
  currentMission: null,
  isConditionsClear: false,
  isCodeConditionsClear: false
};

const dream = (state = initialState, action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case ACTION.DREAM_SET_MYPROJECT:
      return { ...state, myProject: payload.myProject, isReplaying: !!payload.myProject.completedAt };
    case ACTION.DREAM_UPDATE_MYPROJECT:
      return { ...state, myProject: { ...state.myProject, ...(payload.values || {}) } };
    case ACTION.DREAM_OPEN_MENU:
      return { ...state, isMenuOpen: true };
    case ACTION.DREAM_CLOSE_MENU:
      return { ...state, isMenuOpen: false };
    case ACTION.DREAM_SET_MISSIONS:
      return { 
        ...state,
        missions: Array.isArray(payload.missions)
          ? payload.missions
          : []
      };
    case ACTION.DREAM_SET_CURRENT_MISSION_INDEX:
      if(state.missions[payload.index]) {
        return { 
          ...state,
          currentMissionIndex: payload.index,
          currentMission: state.missions[payload.index]
        };
      } else {
        return { ...state };
      }
    case ACTION.DREAM_COMPLETE_CURRENT_MISSION:
      state.currentMission.isCompleted = true;
      return { ...state };
    case ACTION.DREAM_SET_IS_CONDITIONS_CLEAR:
      return { ...state, isConditionsClear: payload.isConditionsClear};
    case ACTION.DREAM_SET_IS_CODE_CONDITIONS_CLEAR:
      return { ...state, isCodeConditionsClear: payload.isCodeConditionsClear};
    default:
      return state;
  }
};

export default dream;
