import React from "react";
import { FormattedMessage } from "react-intl";
import { ActionType, ChatbotMsgType } from "../../../../Common/Util/Constant";

const {
  ADD_NEW_MSG,
  SET_TUTOR,
  SET_CHATBOT_ERRORS,
  REMOVE_CHATBOT_MESSAGES,
  INIT_CHATBOT,
  SET_PROJECT
} = ActionType;

const BOT_CONFIRM = ChatbotMsgType.BOT_CONFIRM;
const BOT_SELECT = ChatbotMsgType.BOT_SELECT;

export const addNewMsg = (msgArr, startIndex) => ({
  type: ADD_NEW_MSG,
  msgArr,
  startIndex
});

export const setChatbotErrors = errors => ({
  type: SET_CHATBOT_ERRORS,
  errors
});

export const removeChatbotMessages = condition => ({
  type: REMOVE_CHATBOT_MESSAGES,
  condition
});

export const setTutor = tutor => ({
  type: SET_TUTOR,
  tutor
});

export const initChatbot = chatbot => ({
  type: INIT_CHATBOT,
  chatbot
});

const initialState = {
  messages: [
    {
      sender: "WIZBOT",
      type: BOT_SELECT,
      text: <FormattedMessage id="ID_STORE_REDUCER_CHATBOT_INIT_WIZBOT" />,
      options: []
    }
  ],
  errors: [],
  tutor: {
    name: {
      ko: "오카",
      en: "OCA"
    },
    icon:
      "https://s3.ap-northeast-2.amazonaws.com/wizschool-basic/running-tutor-oca.png"
  }
};

const chatbot = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      if (action.chatbot) {
        return action.chatbot;
      } else {
        return state;
      }
    case INIT_CHATBOT:
      if (action.chatbot) {
        return action.chatbot;
      } else {
        return initialState;
      }

    case ADD_NEW_MSG:
      const { msgArr, startIndex = 0 } = action;
      const lastMsg = state.messages[state.messages.length - 1];

      if (lastMsg && lastMsg.type === BOT_CONFIRM) {
        return {
          ...state,
          messages: [
            ...state.messages.slice(0, state.messages.length - 1 + startIndex),
            ...msgArr
          ]
        };
      } else {
        return {
          ...state,
          messages: [
            ...state.messages.slice(0, state.messages.length + startIndex),
            ...msgArr
          ]
        };
      }
    case SET_CHATBOT_ERRORS:
      return {
        ...state,
        errors: action.errors
      };

    case REMOVE_CHATBOT_MESSAGES:
      const { condition } = action;
      return {
        ...state,
        messages: state.messages.filter(item => {
          let keys = Object.keys(condition);
          for (let i in keys) {
            let key = keys[i];
            if (item[key] === condition[key]) {
              return false;
            }
          }
          return true;
        })
      };

    case SET_TUTOR:
      const { name, icon } = action.tutor;
      let nameObj = {};
      if (/OCA/i.test(name)) {
        nameObj.ko = "오카";
        nameObj.en = "OCA";
      } else if (/HOI/i.test(name)) {
        nameObj.ko = "호이";
        nameObj.en = "HOI";
      } else if (/LOGURI/i.test(name)) {
        nameObj.ko = "로구리";
        nameObj.en = "LOGURI";
      } else if (/DOT/i.test(name)) {
        nameObj.ko = "도트";
        nameObj.en = "DOT";
      } else if (/EGO/i.test(name)) {
        nameObj.ko = "에고";
        nameObj.en = "EGO";
      } else {
        nameObj.ko = "오카";
        nameObj.en = "OCA";
      }
      return {
        ...state,
        tutor: {
          name: nameObj,
          icon
        }
      };
    default:
      return state;
  }
};

export default chatbot;
