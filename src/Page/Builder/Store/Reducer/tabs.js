import { ActionType } from "../../../../Common/Util/Constant";

const { SET_STUDENTS, SET_TUTOR, GET_CURRENT_USER } = ActionType;

export const setStudents = students => {
  return {
    type: SET_STUDENTS,
    students
  };
};

export const setTutor = tutor => {
  return {
    type: SET_TUTOR,
    tutor
  };
};

export const setCurrentUser = currentUser => {
  return {
    type: GET_CURRENT_USER,
    currentUser
  };
};

const initialState = {
  students: [],
  tutor: [],
  currentUser: null
};

const tabs = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return { ...state, students: action.students };
    case SET_TUTOR:
      return { ...state, tutor: action.tutor };
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser };
    default:
      return state;
  }
};

export default tabs;
