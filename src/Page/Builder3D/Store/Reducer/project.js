import { ACTION } from "../../Util/Constant";

export const setProject = (project, disableTimestamp) => ({
  type: ACTION.PROJECT_SET,
  payload: { project, disableTimestamp }
});

export const setTemplateProject = project => ({
  type: ACTION.PROJECT_SET_TEMPLATE,
  payload: { project }
});

const initialState = {};

const project = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.PROJECT_SET:
    case ACTION.PROJECT_SET_TEMPLATE:
      return projectSet(state, payload);
    default:
      return state;
  }
};

function projectSet(prevState, payload) {
  const { project, disableTimestamp } = payload;
  const nextState = {
    ...prevState,
    ...project
  };
  const nextTimeStamp = disableTimestamp ? "" : new Date().getTime();
  nextState.timeStamp = nextTimeStamp;
  return nextState;
}

export default project;
