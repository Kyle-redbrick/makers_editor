import { ActionType } from "../../../../Common/Util/Constant";

export const setProject = (project, disableTimestamp) => ({
  type: ActionType.SET_PROJECT,
  project: project,
  video: project.video,
  disableTimestamp: disableTimestamp
});

export const setTemplate = project => ({
  type: ActionType.SET_TEMPLATE,
  project: project,
  video: project.video
});

export const setProjectName = name => ({
  type: ActionType.SET_PROJECT_NAME,
  name: name
});

export const resetProject = () => ({
  type: ActionType.RESET_PROJECT
});

export const publishProject = () => ({
  type: ActionType.PUBLISH_PROJECT
});

export const setScreenshotURL = (url, useCustomIcon) => ({
  type: ActionType.SET_SCREENSHOT_URL,
  url: url,
  useCustomIcon: useCustomIcon
});

// {
//     email: ...,
//     icon: ...,
//     name: ...,
//     pId: ...,
// }
const initialState = {};

const project = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.RESET_PROJECT:
      return initialState;
    case ActionType.SET_PROJECT:
    case ActionType.SET_TEMPLATE:
      return {
        ...state,
        ...action.project,
        timeStamp: action.project.basicClass
          ? new Date().getTime()
          : action.disableTimestamp
          ? ""
          : new Date().getTime()
      };
    case ActionType.SET_PROJECT_NAME:
      return {
        ...state,
        name: action.name
      };
    case ActionType.SET_SCREENSHOT_URL:
      return {
        ...state,
        screenshotURL: action.url,
        useCustomIcon: action.useCustomIcon
      };
    default:
      return state;
  }
};

export default project;
