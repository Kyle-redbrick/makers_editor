const ACTION = {
  SUBSCRIBE_SET_EMAILS: "setSubscribeEmails",
  SUBSCRIBE_ADD_EMAIL: "addSubscribeEmail",
  SUBSCRIBE_DELETE_EMAIL: "deleteSubscribeEmail"
}

export const setEmails = emails => ({
  type: ACTION.SUBSCRIBE_SET_EMAILS,
  payload: { emails }
});

export const addEmail = email => ({
  type: ACTION.SUBSCRIBE_ADD_EMAIL,
  payload: { email }
});

export const deleteEmail = email => ({
  type: ACTION.SUBSCRIBE_DELETE_EMAIL,
  payload: { email }
});

const initialState = {
  emails: []
};

const subscribe = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.SUBSCRIBE_SET_EMAILS:
      return { ...state, emails: payload.emails };
    case ACTION.SUBSCRIBE_ADD_EMAIL:
      if(state.emails.includes(payload.email)) {
        return state;
      } else {
        return { ...state, emails: [].concat(state.emails, payload.email) };
      }
    case ACTION.SUBSCRIBE_DELETE_EMAIL:
      return {
        ...state,
        emails: state.emails.filter(email => email !== payload.email)
      };
    default:
      return state;
  }
};

export default subscribe;
